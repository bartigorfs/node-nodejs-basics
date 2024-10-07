import {promisify} from "node:util";
import {pipeline} from "node:stream";
import {createUnzip} from "node:zlib";
import {createReadStream, createWriteStream} from "node:fs";
import fs from "node:fs/promises";

import {join} from "path";

const FILE_PATH = join(import.meta.dirname, 'files', 'archive.gz');
const SAVE_COMPRESSED = join(import.meta.dirname,'files', 'fileToCompress_unzipped.txt');

const decompress = async () => {
    try {
        await fs.access(FILE_PATH, fs.constants.F_OK);

        const pipe = promisify(pipeline);
        const GZIP = createUnzip();

        const STREAM_FROM = createReadStream(FILE_PATH);
        const STREAM_TO = createWriteStream(SAVE_COMPRESSED);

        await pipe(STREAM_FROM, GZIP, STREAM_TO);

        console.log(`File location: ${SAVE_COMPRESSED}`);
    } catch (e) {
        throw new Error(`Error during decompression: ${e.message}`);
    }
};

await decompress();
