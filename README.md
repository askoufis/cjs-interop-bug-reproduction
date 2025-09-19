# `vite-plugin-cjs-interop` bug reproduction

Reproduction for https://github.com/cyco130/vite-plugin-cjs-interop/issues/71.

## Reproduction steps

1. Clone repo: `git clone git@github.com:askoufis/cjs-interop-bug-reproduction.git`
1. Install dependencies: `cd cjs-interop-bug-reproduction && pnpm install`
1. Start dev server: `pnpm dev`
1. Open the URL: `http://localhost:5173` (the page is broken but that's not relevant to the bug)
1. Open network tab in devtools and inspect the `query.ts` response

At this point, the `gql` import is correctly interopped as:

```ts
const { gql } = __cjsInterop1__?.default?.__esModule
  ? __cjsInterop1__.default
  : __cjsInterop1__;
import __cjsInterop1__ from "/node_modules/.vite/deps/@apollo_client.js?v=7648233f";
```

Next:

1. Open `src/query.ts` and uncomment the namespace import
1. Refresh the page and inspect the `query.ts` response again

Notice that the `gql` import and the namespace import are now interopped in the same way:

```ts
const gql = __cjsInterop2__?.default?.__esModule
  ? __cjsInterop2__.default
  : __cjsInterop2__;
const Apollo = __cjsInterop1__?.default?.__esModule
  ? __cjsInterop1__.default
  : __cjsInterop1__;
import __cjsInterop2__ from "/node_modules/.vite/deps/@apollo_client.js?v=7648233f";
import __cjsInterop1__ from "/node_modules/.vite/deps/@apollo_client.js?v=7648233f";
```

This results in both `gql` and `Apollo` referencing the entire default export of the module, instead of `gql` being destructured from the default export.
