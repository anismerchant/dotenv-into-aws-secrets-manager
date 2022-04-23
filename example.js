const {
  exportEnvIntoSm,
  updateEnvInsideSm,
  getEnvFromSm,
  deleteEnvFromSm,
  deleteEnvWithRecoveryWindowFromSm,
} = require('dotenv-into-aws-secrets-manager');

/**
 * Create keys/values from .env inside AWS Secrets Manager
 */
exportEnvIntoSm('YourSecretName', 'Secret Description');

/**
 * Update keys/values inside AWS Secrets Manager
 */
updateEnvInsideSm('YourSecretName');

/**
 * Get keys/values inside AWS Secrets Manager
 */
getEnvFromSm('YourSecretName');

/**
 * Delete keys/values inside AWS Secrets Manager
 * No Recovery Window
 */
deleteEnvFromSm('YourSecretName');

/**
 * Delete keys/values with recovery window inside AWS Secrets Manager
 * Mininum 7 days
 */
deleteEnvWithRecoveryWindowFromSm('YourSecretName', 7);
