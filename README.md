# Export Dotenv into AWS Secrets Manager

## Export .env into AWS Secrets Manager

Export .env keys and values into AWS Secrets Manager with a single command. This assumes you have an AWS account with your credentials stored locally in your root directory i.e. ~/.aws

## Quick Setup

Create an 'index.js' file and paste the starter code as shown below.

```
import('./lib/convertDotenvToJson.js');
```

## Commands

Before running the following command, please ensure you've in this directory a '.env' file that you would like to export into AWS Secrets Manager.

Run the following command from the root directory:

```
npm run exportenvintosm -- -n YourSecretName -d "Secret Description" -f envVariables.json
```

**Note**: 'envVariables.json' filename should not be changed as code relies on this filename.

## Example of .env file

```
API_KEY=MadeUPapikEY
API_SECRET=madeUPaPisEcRet
```
