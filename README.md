## Export .env into AWS Secrets Manager

Export .env keys and values into AWS Secrets Manager with a single command. This assumes you have an AWS account with your credentials stored locally in your root directory i.e. ~/.aws

## Installation

Before installing, download and install Node.js.

For brand new projects, be sure to create a package.json first with the `npm init -y`

Next, run the following command in your terminal:

```
npm i dotenv-into-aws-secrets-manager
```

## Quick Setup

Create an 'index.js' file and paste the starter code as shown below.

```
const exportDotenvToAwsSecretsManager = require('dotenv-into-aws-secrets-manager');

exportDotenvToAwsSecretsManager('SecretName', 'Secret Description');
```

## Example of .env file

```
API_KEY=MadeUPapikEY
API_SECRET=madeUPaPisEcRet
```

## Commands

Before running the following command, please **place in this directory a '.env' file** that you would like to export into AWS Secrets Manager. See illustration directly above.

Run the following command from the root directory:

```
node index.js
```

Login to your AWS account and check Secrets Manager.


## Caveats

Once you execute the command, two things will happen:

(1) An **envVariables.json** file with your keys and values will be generated.  
(2) Your keys and values will be stored inside AWS Secrets Manager in your AWS account.  

**Note: Please be sure to add your generated envVariables.json file in your .gitignore file.**  

## Illustration

<img width="1250" alt="dotenvtosecretsmanager" src="https://user-images.githubusercontent.com/5770541/164470549-6dd52c56-85a9-4038-958b-591fce776278.png">
