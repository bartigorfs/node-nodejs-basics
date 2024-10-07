import {parentPort, workerData} from "node:worker_threads";

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    const {fibonacci} = workerData;

    try {
        parentPort.postMessage({result: nthFibonacci(fibonacci), status: 'resolved'})
    } catch (e) {
        parentPort.postMessage({result: null, status: 'error'})
    }
};

sendResult();
