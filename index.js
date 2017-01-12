#!/usr/bin/env node
const argv = require('yargs').argv;
const checkVersions = require('./check_versions');
const fixVersions = require('./fix_versions');

const task = argv.task || process.env.NPM_VER_TASK;

if (task === 'check') {
    checkVersions();
} else if (task === 'fix') {
    fixVersions();
}

module.exports = {
    checkVersions,
    fixVersions
};
