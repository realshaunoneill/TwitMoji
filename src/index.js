const chalk = require('chalk');
const Twitter = require('twitter');

const config = require('../config');

const info = `${chalk.blue('[')}${chalk.green('!!')}${chalk.blue(']')}`;
const warning = `${chalk.green('[')}${chalk.red(`!${chalk.green('**')}!`)}${chalk.green(']')}`;

function run() {
    try {
        if (!config.USERNAME || !config.UPDATE_TIME_SECONDS || !config.CONSUMER_KEY || !config.CONSUMER_SECRET || !config.ACCESS_KEY || !config.ACCESS_SECRET) {
            return console.log(`${warning} You must supply all six config variables: [${chalk.green('USERNAME')}, ${chalk.green('TIME')}, ${chalk.green('CONSUMER_KEY')},${chalk.green('CONSUMER_SECRET')},${chalk.green('ACCESS_KEY')}, ${chalk.green('ACCESS_SECRET')}]
            \n${chalk.red('\tExiting...')}`);
        }

        if (config.UPDATE_TIME_SECONDS * 2000 < 2) {
            console.log(`${warning} You must select a time which is above ${chalk.red('two')} seconds! Defaulting back to two!`);
            config.UPDATE_TIME_SECONDS = 2;
        } else config.UPDATE_TIME_SECONDS = config.UPDATE_TIME_SECONDS * 1000;

        const client = new Twitter({
            consumer_key: config.CONSUMER_KEY,
            consumer_secret: config.CONSUMER_SECRET,
            access_token_key: config.ACCESS_KEY,
            access_token_secret: config.ACCESS_SECRET
        });

        setInterval(() => {
            let randomEmoji = config.EMOJI_TYPES[Math.floor(Math.random() * config.EMOJI_TYPES.length)];

            client.post('account/update_profile', {name: `${config.USERNAME} ${randomEmoji}`}).then(res => {
                console.log(`${info} Changed name to: ${chalk.green(`${config.USERNAME} ${randomEmoji}`)}`);
            }).catch(err => {
                console.error(`${warning} Error updating status, Error: ${err.stack}`)
            });

        }, config.UPDATE_TIME_SECONDS);

    } catch (err) {
        console.error(`${warning} - Error running program, Error: ${err.stack}`);
    }
}

run();

