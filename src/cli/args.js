const parseArgs = () => {
    const ARGS = process.argv.slice(2);

    const STDOUT_STR = ARGS.reduce((accum, key, index, arr) => {
        if (index % 2 === 0) accum.push(`${key} is ${arr[index+1]}`);
        return accum;
    }, []).join(', ');

    console.log(STDOUT_STR);
};

parseArgs();
