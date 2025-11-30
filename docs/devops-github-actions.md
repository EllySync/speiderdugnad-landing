# DevOps: GitHub Actions -> Dev server (automatic deploy per branch)

This document describes how to set up a CI/CD pipeline that builds your app/container and deploys automatically to your dev server whenever any branch is pushed to GitHub. It assumes you already expose the final Docker container on the server; the pipeline's responsibility is to build, push and instruct the server to pull and run the correct image.

Goal
- Push any branch -> GitHub Actions builds image -> pushes to GHCR -> SSH to dev server -> update `.env`/compose and restart containers using the branch-specific image tag.

High-level design
- Build image using `docker/build-push-action` and push to GitHub Container Registry (GHCR).
- Tag images with a sanitized branch name: `ghcr.io/<owner>/<repo>:<branch>-latest` and with the commit SHA.
- Run an SSH step from the Action that writes the image tag into a `.env` (or updates a file) in the server `DEPLOY_PATH` and runs `docker-compose pull && docker-compose up -d --force-recreate`.

Why this approach
- Keeps the server logic minimal (it just reads the `IMAGE` variable and restarts).
- Allows deploying any branch automatically (branch name maps to an image tag).
- Keeps images in GHCR so you can inspect and roll back to older tags if needed.

Security requirements
- Store these repository secrets (Settings → Secrets → Actions):
  - `SSH_HOST` — server IP/hostname
  - `SSH_USER` — deploy user (e.g. `deploy`)
  - `SSH_KEY` — private key PEM (no passphrase recommended for automation)
  - `SSH_PORT` — optional (default `22`)
  - `DEPLOY_PATH` — absolute path to deployed app on server (e.g. `/srv/landing`)
  - `GITHUB_TOKEN` — built-in, used by workflow to push to GHCR (no manual secret necessary). If your organization requires a PAT with package permissions, create `GHCR_PAT` instead and use it.

Server pre-requisites (once per server)
- `docker` and `docker-compose` installed and accessible by `SSH_USER` (or enable `sudo` without password for that user and use `sudo docker-compose ...`).
- A deploy directory (the `DEPLOY_PATH`) with a `docker-compose.yml` that references an image environment variable (see example below).
- Add `SSH_USER` public key to `~/.ssh/authorized_keys`.
- Ensure `DEPLOY_PATH` is writable by `SSH_USER`.

Recommended `docker-compose.yml` (snippet)
Use environment variable substitution so the workflow can update `.env` with a new `IMAGE` value.

```yaml
version: '3.8'
services:
  landing:
    image: ${IMAGE}
    restart: unless-stopped
    ports:
      - "80:80"
    environment:
      - SOME_ENV=foo
    volumes:
      - ./data:/data

# .env file in the same folder should define IMAGE=ghcr.io/owner/repo:branch-latest
```

Server deploy script (recommended)
Place a small script on the server as `DEPLOY_PATH/deploy-update.sh` owned by `SSH_USER` and executable. A template of this script is included in the repo at `docs/templates/deploy-update.sh.template`. The Action can call this script instead of running long commands inline.

Example `deploy-update.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
# $1 should be the image tag, e.g. ghcr.io/owner/repo:feature-xyz-latest
IMAGE_TAG="$1"
echo "IMAGE=${IMAGE_TAG}" > .env
docker-compose pull || true
docker-compose up -d --force-recreate
```

Make it executable:

```bash
chmod +x /srv/landing/deploy-update.sh
```

Tip: If you prefer not to store credentials in `.env`, the Action can run the `docker pull` and `docker run` commands directly over SSH.

Sample GitHub Actions workflow (place in `.github/workflows/deploy-any-branch.yml`)
This workflow runs on any branch push and does the full build -> push -> deploy (SSH) flow.

```yaml
name: Build & Deploy (any branch)

on:
  push: {}

permissions:
  contents: read
  packages: write

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    outputs:
      image-tag: ${{ steps.build.outputs.image }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to GHCR
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push image
        id: build
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository_owner }}/${{ github.repository }}:${{ replace(github.ref_name, '/', '-') }}-latest
            ghcr.io/${{ github.repository_owner }}/${{ github.repository }}:${{ github.sha }}
        outputs:
          image: ghcr.io/${{ github.repository_owner }}/${{ github.repository }}:${{ replace(github.ref_name, '/', '-') }}-latest

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server over SSH
        uses: appleboy/ssh-action@v0.1.7
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          port: ${{ secrets.SSH_PORT }}
          script: |
            set -euo pipefail
            cd "${{ secrets.DEPLOY_PATH }}"
            IMAGE_TAG=ghcr.io/${{ github.repository_owner }}/${{ github.repository }}:${{ replace(github.ref_name, '/', '-') }}-latest
            echo "Deploying $IMAGE_TAG"
            # Option A: Call server script
            if [ -x ./deploy-update.sh ]; then
              ./deploy-update.sh "$IMAGE_TAG"
            else
              # Option B: inline actions
              echo "IMAGE=${IMAGE_TAG}" > .env
              docker-compose pull || true
              docker-compose up -d --force-recreate
            fi

```

Notes about the workflow
- `on: push: {}` triggers on pushes to any branch. If you prefer to limit to certain branches (e.g. `dev/*`), use `push: branches: ['dev/**']`.
- We sanitize branch names with `replace(github.ref_name, '/', '-')` to avoid slashes in tags.
- The `build` job pushes two tags: `<branch>-latest` and the commit SHA. That gives you both an easily-referenced branch image and a stable immutable tag.
- The `deploy` job computes the same branch tag and instructs the server to use it.

Optional: Testing, smoke check and healthcheck
- After `docker-compose up`, you can add a small curl-based healthcheck in the SSH script to ensure the service responds.

Example healthcheck snippet (append to `deploy-update.sh`):

```bash
for i in {1..12}; do
  if curl -fsS --max-time 3 http://localhost/ >/dev/null; then
    echo "Service responded"
    exit 0
  fi
  sleep 5
done
echo "Healthcheck failed" >&2
exit 2
```

Rollback strategy
- If a deploy fails, you can immediately run `docker-compose pull` with a previous SHA tag or update `.env` to point to a previous known-good tag and `docker-compose up -d`.
- Since images are pushed with commit SHAs, you can always pick a previous SHA from the GHCR UI.

CI checks to add before deploy
- `npm install/build` or `python -m unittest` or other unit tests
- Linting (eslint, stylelint)
- Minimal build step to ensure the image will build successfully

Best practices
- Don't commit secrets. Use GitHub Actions secrets.
- Limit which users can push to branches that auto-deploy if needed.
- For production, require PRs and protected branches; do not auto-deploy on every branch.
- Use a small deploy script on the server to keep the Action's SSH step simple.

Troubleshooting
- SSH failures: check `authorized_keys`, key format and that GitHub Actions IPs are allowed to reach the server (most setups allow outbound SSH from Actions).
- Permission issues running `docker-compose`: ensure your deploy user can run docker or use `sudo` in the server script.
- Image not found: verify the tag in GHCR and that your server can access GHCR (internet access and no private firewall preventing pull).

Questions for you
- Do you want every branch pushed to deploy, or only branches matching a prefix (e.g. `dev/*`)?
- Do you want the workflow file committed now (I can create it), or do you prefer just the documentation and you will add the workflow yourself?
- Does your server require `sudo` for docker commands (should the deploy script use `sudo`)?

A template `deploy-update.sh` is included at `docs/templates/deploy-update.sh.template` — copy it to the server `DEPLOY_PATH` and make it executable (`chmod +x /srv/landing/deploy-update.sh`).
