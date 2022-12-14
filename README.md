esbuild-plugin-httpfile
==================================
An esbuild plugin to import [httpfile](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html) for HTTP Request/GraphQL request.

# How to use?

* Create a http file, such as `demo.http`, code as following:

```
### get my ip
//@name my-ip
GET https://httpbin.org/ip
User-Agent: curl/7.47.0

### post test
//@name post-test
POST https://{{host}}/post
User-Agent: curl/7.47.0
Content-Type: application/json

{
  "name": "{{nick}}",
  "age": 42,
  "uuid": "{{$uuid}}"
}
```

* Add `esbuild-plugin-httpfile` to your project's `package.json` or `npm add -D esbuild-plugin-httpfile`.

```
 "devDependencies": {
    "esbuild-plugin-httpfile": "^0.3.0"
  }
```

* In JavaScript/TypeScript file, such as `hello.mjs`, and you can import http file directly. Code as following:

```javascript
import {myip} from "./demo.http";

let response = await myip();
console.log(await response.json());
```

# esbuild example

`build.js` as following:

```javascript
import esbuild from 'esbuild';
import httpfilePlugin from 'esbuild-plugin-httpfile';

esbuild.build({
    bundle: true,
    entryPoints: ['hello.mjs'],
    plugins: [httpfilePlugin(true)],
    platform: 'node',
    format: "esm",
    write: true,
    outfile: "bundle.mjs"
}).then(result => {
    console.log(result.outputFiles[0].text);
}).catch(() => process.exit(1));
```

# Mock Support

You can mock request by adding `//@mock ` tag for request. Code as following:

```
### get my ip
//@name myIp
//@mock {"origin":"127.0.0.1"}
GET https://httpbin.org/ip
```

For multi lines data, please add more `//@mock ` lines.

```
### get csv data
//@name myData
//@mock name,gender
//@mock linux_china,M
GET https://your_service/data
Accept: text/csv
```

**Note**: if `process.env.NODE_ENV` is `production`, then mock data will not be used.

# GraphQ over HTTP support

Create GraphQL request in http file, code as following:

```
### graphql test
//@name graphqlTest
GRAPHQL https://localhost:8787/graphql

query {
   welcome(name : "{{nick}}" )
}
```

Then call `let response = await graphqlTest({nick:'your_nick'})` just like normal HTTP request.

# Framework Integration

* [tsup](https://tsup.egoist.dev/): `tsup.config.ts` code as following:

```typescript
import {defineConfig} from 'tsup'
import httpfilePlugin from "esbuild-plugin-httpfile";

export default defineConfig({
    target: 'node18',
    platform: 'node',
    format: "esm",
    outDir: "dist",
    esbuildPlugins: [httpfilePlugin()]
})
```

# References

* JetBrains HTTP Client: https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html
* servicex: https://servicex.sh/
* esbuild: [https://esbuild.github.io/](https://esbuild.github.io/)
* rollup-plugin-httpfile: Rollup.js plugin for httpfile - https://github.com/servicex-sh/rollup-plugin-httpfile
* vite-plugin-httpfile: https://github.com/servicex-sh/vite-plugin-httpfile
