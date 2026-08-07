# TODO

## Clear the abandoned `bitcoind:other-config` task replay key

Fold this into the next version that ships — it does not warrant a release of its own.

A task's replay key defaults to `[package-id]:[action-id]`, so when bitcoind renamed its
config action `other-config` → `autoconfig`, the switch in this package wrote a **new** key
rather than updating the old one. Nothing rewrites or reaps an abandoned key: it stays in
the database still demanding whatever it last asked for. Keys this package has written:

| Key                     | Written while                    |
| ----------------------- | -------------------------------- |
| `bitcoind:other-config` | 2026-02-07 → 2026-03-04          |
| `bitcoind:autoconfig`   | 2026-03-04 → now — live, keep it |

Only one key was abandoned: Fulcrum's first bitcoind task (`5a09cb4`) already imported
`otherConfig`, and bitcoind's earlier `config` → `other-config` rename (2025-12-12) predates
it — so unlike its sibling packages there is no `bitcoind:config` to clear as well.

The abandoned key is harmless _today_ only because it demands the same values the live one
does (`prune: 0, txindex: true, zmqEnabled: true`), so satisfying one satisfies both. That
is a coincidence, not a guarantee — change what Fulcrum asks bitcoind for and the two become
mutually exclusive, leaving the user ping-ponging between tasks with no way to settle. That
is exactly what happened to datum-gateway, whose stale `bitcoind:other-config` fought its
live `bitcoind:autoconfig` and stopped the service until the key was cleared by hand over
SSH.

In the next version's migration:

```ts
migrations: {
  up: async ({ effects }) => {
    await sdk.action.clearTask(effects, 'bitcoind:other-config')
  },
},
```

Needs `import { sdk } from '../sdk'` in the version file. `clearTask` is a no-op for a key
that is not present, so ship it unconditionally — there is no need to establish which
servers ever ran an affected build, and doing so is not possible anyway (the GitHub
releases, workflow runs, and S3 objects for that era have all been swept).

Background: the packaging guide, `tasks.md` → "Retiring a replay key".
