const fs = require('fs-extra');
const { execSync } = require('child_process');
const minimist = require('minimist');
const { rimrafPromise } = require('./utils');

const appName = minimist(process.argv).app;
if (!appName) {
  return;
}

const appDirectory = `./apps/${appName}`;

(async function deploy() {
  await rimrafPromise(`${appDirectory}/dist`);

  await fs.ensureDir(`${appDirectory}/dist`);
  await fs.copySync(`./dist/apps/${appName}`, `${appDirectory}/dist`, { overwrite: true }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`copy ${appDirectory}. Success!`);
    }
  });
  console.log(appDirectory);
  execSync(`cd ${appDirectory} && firebase deploy`);
})();
