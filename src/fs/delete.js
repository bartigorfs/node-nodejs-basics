import fs from "node:fs/promises";

import {join} from "path";

const FILE_TO_DELETE = join(import.meta.dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
    try {
        await fs.access(FILE_TO_DELETE, fs.constants.W_OK);
        await fs.rm(FILE_TO_DELETE)
            .then(() => console.log(`File ${FILE_TO_DELETE} removed`));
    } catch (e) {
        throw new Error('FS operation failed');
    }
};

await remove();
