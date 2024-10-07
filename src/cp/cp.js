import {spawn} from "child_process";

const spawnChildProcess = async (args) => {

    const cp = spawn('node',
        [import.meta.dirname + '/files/script.js', ...args],
        {
            stdio: ['pipe', 'pipe', 'inherit'],
        });

    cp.stdout.on('data', (data) => {
        console.log(`Received from child process: ${data}`);
    });

    cp.stdin.write(args[0]);

    cp.on('message', (message) => {
        console.log(`Received message from child process: ${message}`);
    });

    cp.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    cp.stdin.on('data', (data) => {
        cp.stdin.write(data);
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['Shrek is life', 'Shrek is love']);
