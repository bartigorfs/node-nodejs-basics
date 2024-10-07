import fs from "node:fs/promises";
import {join} from "path";
import {createWriteStream} from "node:fs";

const FILE_PATH = join(import.meta.dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    try {
        await fs.access(FILE_PATH, fs.constants.W_OK)

        const writeStream = createWriteStream(FILE_PATH).setDefaultEncoding('utf-8');

        process.stdin.pipe(writeStream);

        writeStream.on('error', (err) => {
            throw new Error(`Stream error: ${err.message}`);
        });

    } catch (e) {
        throw new Error(`Error during write streaming: ${e.message}`);
    }
};

await write();
