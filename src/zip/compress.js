import fs from "node:fs/promises";
import {join} from "path";
import {promisify} from "node:util";
import {pipeline} from "node:stream";
import {createGzip} from "node:zlib";
import {createReadStream, createWriteStream} from "node:fs";

const FILE_PATH = join(import.meta.dirname, 'files', 'fileToCompress.txt');
const SAVE_COMPRESSED = join(import.meta.dirname, 'files', 'archive.gz');

const compress = async () => {
    try {
        await fs.access(FILE_PATH, fs.constants.F_OK).then(async () => {
            const pipe = promisify(pipeline);
            const gzip = createGzip();

            const readStream = createReadStream(FILE_PATH);
            const writeStream = createWriteStream(SAVE_COMPRESSED);

            await pipe(readStream, gzip, writeStream)
                .then(() => console.log(`File location: ${SAVE_COMPRESSED}`));
        })
    } catch (e) {
        throw new Error(`Error during compression: ${e.message}`);
    }
};

await compress();
