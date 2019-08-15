let AWS = require('aws-sdk');
let argv = require('minimist')(process.argv.slice(2));
require('dotenv').config();

function isParametersOkay({cellphone, message, subject}) {
    let success = true;
    if (!cellphone) {
        console.error('Is missing parameters --cellphone');
        success = false;
    }
    if (!message) {
        console.error('Is missing parameters --message');
        success = false;
    }
    if (!subject) {
        console.error('Is missing parameters --subject');
        success = false;
    }
    return success;
}

function main() {
    const params = {
        cellphone: argv['cellphone'],
        message: argv['message'],
        subject: argv['subject'],
    };
    if (isParametersOkay(params)) {
        console.log('vai la');
    }
}

main();