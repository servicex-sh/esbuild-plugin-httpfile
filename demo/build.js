const esbuild = require('esbuild');

const httpfilePlugin = require('../index');

esbuild.build({
    bundle: true,
    entryPoints: ['hello.mjs'],
    plugins: [httpfilePlugin],
    platform: 'node',
    format: "esm",
    write: true,
    outfile: "bundle.mjs"
}).then(result => {
    console.log(result.outputFiles[0].text);
}).catch(() => process.exit(1));
