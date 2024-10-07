import {env} from 'node:process';

const parseEnv = () => {
    const PARSED_ENV = [];
    const PREFIX = 'RSS_';
    let STDOUT_STR = '';

    for (const key in env) {
        if (key.includes(PREFIX)) { // or startsWith
            PARSED_ENV.push(env[key]);
        }
    }

    PARSED_ENV.forEach((item, index) => STDOUT_STR += `RSS_name${index}=${item}${PARSED_ENV.length === index + 1 ? '' : '; '}`);
    console.log(STDOUT_STR);
};

parseEnv();
