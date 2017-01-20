#!/usr/bin/env node
const yargs = require('yargs');
const checkVersions = require('./check_versions');
const fixVersions = require('./fix_versions');

const argv = yargs
    .alias('c', 'check')
    .describe('c', 'check installed version packages')
    .alias('f', 'fix')
    .describe('f', 'fix installed version packages')
    .alias('d', 'debug')
    .describe('d', 'use warning instead error')
    .help('help')
    .argv;

if (argv.check) {
    checkVersions();
} else if (argv.fix) {
    fixVersions();
}

module.exports = {
    checkVersions,
    fixVersions
};
