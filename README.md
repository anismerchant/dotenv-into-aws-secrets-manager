## Export .env into AWS Secrets Manager

Export .env keys and values into AWS Secrets Manager with a single command. This assumes you have an AWS account with your credentials stored locally in your root directory i.e. ~/.aws

## Installation

This package requires a local installation of Node.js and AWS CLI. Make sure you configure your AWS account with the CLI. [Link to AWS docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

To install this package in your Node.js project, run the following command:

```
npm i dotenv-into-aws-secrets-manager
```

## Setup
Before using the package, please **place in your project root directory a '.env' file** that you would like to export into AWS Secrets Manager. The following is an exmaple of the contents of `.env`:

```
API_KEY=MadeUPapikEY
API_SECRET=madeUPaPisEcRet
```

Add the following line to `.gitignore`. <b>DO NOT</b> forget this step if you want to keep your environment variables safe.
```
# generated JSON file with environment variables
envVariables.json
```

## User Guide

You can use the package directly in your command line to perform CRUD operations on your Secrets.

### Create
Create a new Secret in your AWS account's Secrets Manager with given secret name and description.
```
npx dotenv-into-aws-secrets-manager create YourSecretName "Secret Description"
```

### Get
Get key-value pairs stored in your Secret with secret name.
```
npx dotenv-into-aws-secrets-manager get YourSecretName
```

### Update
Update key-value pairs in your Secret (with the contents of `.env`) with secret name.
```
npx dotenv-into-aws-secrets-manager update YourSecretName
```

### Delete
Delete a Secret and all of its' contents with secret name.
```
npx dotenv-into-aws-secrets-manager delete YourSecretName
```

## Caveats

Once you execute the command, two things will happen:

(1) An **envVariables.json** file with your keys and values will be generated.  
(2) Your keys and values will be stored inside AWS Secrets Manager in your AWS account.  

**Note: Please be sure to add your generated envVariables.json file in your .gitignore file.**  

## Illustration

<img width="1250" alt="dotenvtosecretsmanager" src="https://user-images.githubusercontent.com/5770541/164470549-6dd52c56-85a9-4038-958b-591fce776278.png">
