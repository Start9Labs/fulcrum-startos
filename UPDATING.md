# Updating the upstream version

Fulcrum is shipped as a prebuilt Docker image; the upstream project and the published image share the same version tag.

## Determining the upstream version

[cculianu/Fulcrum](https://github.com/cculianu/Fulcrum) — latest GitHub release:

```sh
gh release view -R cculianu/Fulcrum --json tagName -q .tagName
```

Cross-check against the [`cculianu/fulcrum`](https://hub.docker.com/r/cculianu/fulcrum/tags) Docker Hub tags (the image must be published before the bump can land):

```sh
curl -fsSL "https://hub.docker.com/v2/repositories/cculianu/fulcrum/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
```

The pinned tag lives in `startos/manifest/index.ts` at `images.main.source.dockerTag`.

## Applying the bump

In `startos/manifest/index.ts`, set `images.main.source.dockerTag` to `cculianu/fulcrum:v<new version>`.
