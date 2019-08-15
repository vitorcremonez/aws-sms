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

function sendSMS({cellphone, message, subject}) {
    let params = {
        PhoneNumber: cellphone,
        Message: message,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': subject,
            }
        }
    };
    let publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
    publishTextPromise.then((data) => {
        const response = JSON.stringify({
            messageId: data.MessageId
        });
        console.log(response);
    }).catch((error) => {
        const response = JSON.stringify({
            error: error,
        });
        console.log(response);
    });
}

function main() {
    const params = {
        cellphone: argv['cellphone'] ? argv['cellphone'].toString() : undefined,
        message: argv['message'] ? argv['message'].toString() : undefined,
        subject: argv['subject'] ? argv['subject'].toString() : undefined,
    };
    if (isParametersOkay(params)) {
        sendSMS(params);
    }
}

main();