import * as os from "os";
import {Worker} from 'worker_threads';
import {join} from "path";

const WORKER_PATH = join(import.meta.dirname, 'worker.js');

const performCalculations = async () => {
    const CPU_THREADS = os.availableParallelism();
    const WORKER_THREADS = [];

    const createWorker = (n) => {
        return new Promise((resolve, reject) => {
            const worker = new Worker(WORKER_PATH, {
                workerData: {fibonacci: 10 + n},
            });
            worker.on("message", (data) => {
                resolve(data);
            });
        });
    }

    for (let i = 0; i < CPU_THREADS; i++) {
        WORKER_THREADS.push(createWorker(i));
    }

    const WORKER_RESULTS = await Promise.all(WORKER_THREADS);
    console.log(WORKER_RESULTS);
};

await performCalculations();
