let AWS = require('aws-sdk');
let argv = require('minimist')(process.argv.slice(2));

function isParametersOkay(params) {
    let success = true;
    Object.keys(params).map((key) => {
        if (!params[key]) {
            console.log(`Is missing parameters --${key}`);
            success = false;
        }
    });
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

function setEnvParams({accessKeyId, secretAccessKey, region}) {
    process.env.AWS_ACCESS_KEY_ID = accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = secretAccessKey;
    process.env.AWS_REGION = region;
}

function main() {
    const params = {
        cellphone: argv['cellphone'] ? argv['cellphone'].toString() : undefined,
        message: argv['message'] ? argv['message'].toString() : undefined,
        subject: argv['subject'] ? argv['subject'].toString() : undefined,
        accessKeyId: argv['accessKeyId'] ? argv['accessKeyId'].toString() : undefined,
        secretAccessKey: argv['secretAccessKey'] ? argv['secretAccessKey'].toString() : undefined,
        region: argv['region'] ? argv['region'].toString() : undefined,
    };
    if (isParametersOkay(params)) {
        setEnvParams(params);
        sendSMS(params);
    }
}

main();