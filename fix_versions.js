const path = require('path');
const jsonfile = require('jsonfile');
const getDepVersions = require('./get_dep_versions');

function fixVersions() {
    const dependenciesTree = getDepVersions();

    jsonfile.writeFileSync(path.join(__dirname, '../../npmshrink.json'), dependenciesTree, { spaces: 2 });
}

module.exports = fixVersions;
