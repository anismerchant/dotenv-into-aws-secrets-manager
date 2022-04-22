const { promises: fs } = require('fs');
const path = require('path');
const shell = require('shelljs');

/**
 * Expose `dotenvToAwsSecretsManager`
 * Expose `updateDotenvInAwsSecretsManager`
 * Expose 'getDotenvInAwsSecretsManager'
 * Expose 'deleteDotenvInAwsSecretsManager'
 * Expose 'deleteRecWinDotenvInAwsSecretsManager'
 */
module.exports = {
  exportEnvIntoSm: dotenvInToAwsSecretsManager,
  updateEnvInsideSm: updateDotenvInAwsSecretsManager,
  getEnvFromSm: getDotenvInAwsSecretsManager,
  deleteEnvFromSm: deleteDotenvInAwsSecretsManager,
  deleteEnvWithRecoveryWindowFromSm: deleteRecWinDotenvInAwsSecretsManager,
};

/**
 * Create keys/values from .env inside AWS Secrets Manager 
 */
async function dotenvInToAwsSecretsManager(smname, smdesc) {
  await convertDotenvToJson();

  shell.exec(`${path.join(__dirname, 'envIntoSm.sh')} -n "${smname}" -d "${smdesc}" -f envVariables.json`);
  console.info('Confirmation: Your .env keys and values have been created inside AWS Secrets Manager.\n');
}

/**
 * Update keys/values inside AWS Secrets Manager 
 */
async function updateDotenvInAwsSecretsManager(smname) {
  await convertDotenvToJson();

  shell.exec(`${path.join(__dirname, 'updateEnvInsideSm.sh')} -n "${smname}" -f envVariables.json`);
  console.info('Confirmation: Your .env keys and values in your AWS Secrets Manager have been updated.\n'); 
}

/**
 * Get keys/values inside AWS Secrets Manager 
 */
async function getDotenvInAwsSecretsManager(smname) {
  await convertDotenvToJson();

  shell.exec(`${path.join(__dirname, 'getEnvFromSm.sh')} -n "${smname}"`);
  console.info('Confirmation: These are your .env keys and values inside your AWS Secrets Manager.\n'); 
}

/**
 * Delete keys/values with recovery window inside AWS Secrets Manager
 * Mininum 7 days 
 */
async function deleteRecWinDotenvInAwsSecretsManager(smname, days) {
  await convertDotenvToJson();

  shell.exec(`${path.join(__dirname, 'deleteEnvWithRecWinFromSm.sh')} -n "${smname}" -d ${days}`);
  console.info(`Confirmation: Your .env keys and values inside your AWS Secrets Manager have been deleted with a recovery window of ${days} days.\n`); 
}

/**
 * Delete keys/values inside AWS Secrets Manager 
 * No Recovery Window
 */
async function deleteDotenvInAwsSecretsManager(smname) {
  await convertDotenvToJson();

  shell.exec(`${path.join(__dirname, 'deleteEnvFromSm.sh')} -n "${smname}"`);
  console.info('Confirmation: Your .env keys and values inside your AWS Secrets Manager have been deleted.\n'); 
}

async function convertDotenvToJson() {
  try {
    const buffer = await fs.readFile(path.join(__dirname, '..', '..', '..', '.env'), 'binary');
    const data = new Buffer.from(buffer);
  
    // convert key/value pair into an array
    const arr = data.toString().replace(/\r\n/g, '=').split('\n');
    let obj = {};
  
    for (keyValue of arr) {
      const replaceEqualWithColon = keyValue.toString().replace('=', ':').split('\n');
  
      // split each each key/value pair into its own array
      const convertEachKeyValuePairIntoArr = replaceEqualWithColon.toString().split(':');
      
      // update object with each key/value pair
      obj[convertEachKeyValuePairIntoArr[0]] = convertEachKeyValuePairIntoArr[1];
    }
  
    // convert object into json
    let evalData = eval(obj);
  
    // save json in a file 
    await fs.writeFile('envVariables.json', `${JSON.stringify(evalData)}`, function (err) {
      if (err) throw err;
    });
  } catch (error) {
    console.log(error);
  }
};
