import fs from "node:fs/promises";
import {createWriteStream} from "node:fs";
import {Transform} from "node:stream";

import {join} from "path";

const FILE_PATH = join(import.meta.dirname, 'files', 'fileToWrite.txt');

const transform = async () => {
    try {
        await fs.access(FILE_PATH, fs.constants.W_OK)

        const writeStream = createWriteStream(FILE_PATH).setDefaultEncoding('utf-8');

        const reverseText = new Transform({
            transform(data, encoding, callback) {
                callback(null, data.toString().split('').reverse().join(''));
            },
        });

        process.stdin.pipe(reverseText).pipe(writeStream);

        writeStream.on('error', (err) => {
            throw new Error(`Stream error: ${err.message}`);
        });
    } catch (e) {
        throw new Error(`Error during streaming: ${e.message}`);
    }
};

await transform();
