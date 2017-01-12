/* eslint no-underscore-dangle: ["error", { "allow": ["_shasum"] }] */
const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');

function getPackageInfo(directory, name) {
    const file = path.resolve(directory, './package.json');
    if (fs.existsSync(file)) {
        const info = jsonfile.readFileSync(file);
        return info;
    }
    if (name && directory.indexOf('node_modules') > 0) {
        return getPackageInfo(path.resolve(directory, '../../../', name), name);
    }
    return undefined;
}

function scanDependencies(rootPath, name) {
    const packageInfo = getPackageInfo(rootPath, name);

    if (!packageInfo) {
        return null;
    }
    const moduleNames = Object.keys(packageInfo.dependencies);
    const tree = {
        dependencies: {},
        shaSum: packageInfo._shasum,
        version: packageInfo.version
    };
    moduleNames.forEach(moduleName => {
        const depInfo = scanDependencies(path.resolve(rootPath, './node_modules', moduleName), moduleName);
        tree.dependencies[moduleName] = depInfo;
    });
    return tree;
}

function getDepVersions() {
    const dependenciesTree = scanDependencies(path.join(__dirname, '/../../'));
    return dependenciesTree;
}

module.exports = getDepVersions;
