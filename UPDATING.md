# Updating the upstream version

Fulcrum is shipped as a prebuilt Docker image; the upstream project and the published image share the same version tag.

## Determining the upstream version

Read the [cculianu/Fulcrum](https://github.com/cculianu/Fulcrum) tags and select the newest stable version, excluding prereleases rather than relying on GitHub's Latest badge:

```sh
gh api --paginate 'repos/cculianu/Fulcrum/tags?per_page=100' --jq '.[].name'
```

Cross-check against the [`cculianu/fulcrum`](https://hub.docker.com/r/cculianu/fulcrum/tags) Docker Hub tags (the image must be published before the bump can land):

```sh
curl -fsSL "https://hub.docker.com/v2/repositories/cculianu/fulcrum/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
```

The pinned tag lives in `startos/manifest/index.ts` at `images.main.source.dockerTag`.

## Applying the bump

1. In `startos/manifest/index.ts`, set `images.main.source.dockerTag` to `cculianu/fulcrum:v<new version>`.
2. If `startos/versions/current.ts` carries a migration, preserve it as a historical version and register it in `startos/versions/index.ts` as described in the packaging guide. Then set `current.ts`'s `version` to `<new version>:0` and rewrite `releaseNotes` in every locale it carries; do not carry the old migration into the new version.
