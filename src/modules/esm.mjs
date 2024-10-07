import * as path from 'path';
import {release, version} from "node:os";
import {dirname} from "path";
import {fileURLToPath} from "url";

import a from "./files/a.json" with { type: "json" };
import b from "./files/b.json" with { type: "json" };

import {createServer as createServerHttp} from "node:http";
import './files/c.js';

const random = Math.random();

export let unknownObject;

if (random > 0.5) {
    unknownObject = a
} else {
    unknownObject = b
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${fileURLToPath(import.meta.url)}`);
console.log(`Path to current directory is ${dirname(fileURLToPath(import.meta.url))}`);

export const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});
