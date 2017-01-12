# Package version checker

Package version checker - tools for fix and check versions of installed node packages

## Install

```
npm install package-version-checker --save-dev
```

## Usage

### from command line

for fix packages versions
```
#> pvc --fix
```

for check packages versions
```
#> pvc --check
```

### from js scripts

for fix packages versions
```
var fixVersions = require('package-version-checker').fixVersions;
fixVersions();
```

for check packages versions
```
var checkVersions = require('package-version-checker').checkVersions;
checkVersions();
```

### Debug mode

if you don't want brake script if check failure, set enviroment variable DEBUG_MODE=true
```
#> NODE_ENV=development pvc --check
```
or
```
#> pvc --check --debug
```
