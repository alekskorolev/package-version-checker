const path = require('path');
const jsonfile = require('jsonfile');
const fs = require('fs');
const getDepVersions = require('./get_dep_versions');
const chalk = require('chalk');
const argv = require('yargs').argv;

const debugMode = process.env.NODE_ENV === 'development' || argv.debug;

function versionsNotMatch(saved, actual, packageName) {
    if (!saved) {
        return false;
    } else if (!actual) {
        console.error(chalk.red('Not exist package'));
        return true;
    } else if ((saved.shaSum || actual.shaSum) && saved.shaSum !== actual.shaSum) {
        console.error(chalk.red('Version of packages not match'));
        console.error(chalk.red(`Package name: ${packageName}`));
        return true;
    }
    const keys = Object.keys(saved.dependencies).concat(Object.keys(actual.dependencies));

    return keys.some(key => {
        const savedDep = saved.dependencies[key];
        const actualDep = actual.dependencies[key];
        if (versionsNotMatch(savedDep, actualDep, key)) {
            return true;
        }
        return false;
    });
}
function errorLog(msg) {
    if (debugMode) {
        console.warn('Error:', chalk.red(msg));
    } else {
        process.exitCode = 1;
        throw new Error(chalk.red(msg));
    }
}

function checkVersions() {
    const shrinkPath = path.resolve(__dirname, '../../npmshrink.json');
    if (fs.existsSync(shrinkPath)) {
        const saveVersions = jsonfile.readFileSync(shrinkPath);
        const actualVersions = getDepVersions(path.join(__dirname, '/../../'));
        if (versionsNotMatch(saveVersions, actualVersions)) {
            errorLog('Packages not matches');
        }
    } else {
        errorLog('Versions of packages not fixed');
    }
}

module.exports = checkVersions;
