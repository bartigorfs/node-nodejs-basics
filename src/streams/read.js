import fs from "node:fs/promises";
import {join} from "path";
import {createReadStream} from "node:fs";

const FILE_PATH = join(import.meta.dirname, 'files', 'fileToRead.txt');

const read = async () => {
    try {
        await fs.access(FILE_PATH, fs.constants.R_OK)

        const readStream = createReadStream(FILE_PATH).setEncoding('utf-8');

        readStream.on("data", (data) => console.log(data));

        readStream.on("error", (err) => {
            throw new Error(`Stream error: ${err.message}`);
        });
    } catch (e) {
        throw new Error(`Error during read streaming: ${e.message}`);
    }
};

await read();
