import * as fs from 'node:fs/promises';

import {join} from "path";

const FILE_PATH = join(import.meta.dirname, 'files', 'fresh.txt');

const create = async () => {
    const FILE_CONTENT = 'I am fresh and young';

    try {
        await fs.access(FILE_PATH, fs.constants.F_OK)
        throw new Error('FS operation failed');
    } catch (e) {
        if (e.code === 'ENOENT') {
            try {
                await fs.appendFile(FILE_PATH, FILE_CONTENT)
                    .then(() => console.log(`File ${FILE_PATH} created`));
            } catch (e) {
                throw new Error(`Create operation failed: ${e.message}`);
            }
        } else {
            throw new Error(`Error while creating: ${e.message}`);
        }
    }
};

await create();
