const chalk = require("chalk");
const fs = require('fs');
const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;
const myEnv= process.env.MY_ENV;

useDefaultConfig[env].resolve.alias = {
  "@app/env": path.resolve(environmentPath())
};

function environmentPath() {
  let filePath = './src/environments/environment.' + (myEnv || env) + '.ts';
  console.log(filePath);
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  return useDefaultConfig;
};
