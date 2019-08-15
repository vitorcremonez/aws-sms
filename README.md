# AWS-SNS
A simple Node AWS SNS service to send SMS.

## Instalation

Clone repository:
```
git clone git@github.com:vitorcremonez/aws-sms.git
```

Go to directory:
```
cd aws-sms/
```

Install dependencies:
```
npm install
```

Configure **.env** file with Amazon keys:
```
AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=xx-xxxx-0
```

Run your command:
```sh
node index.js --cellphone="+19999999999" --message="Your activation code is 999-999" --subject="Subject"
```