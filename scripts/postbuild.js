const fs = require('fs');

const DIST_LIB_PATH = 'dist/payment-request/';
const README_PATH = 'README.md';
const ASSETS_PATH = 'projects/demo/src/assets';
const PATH_TO_README = DIST_LIB_PATH + README_PATH;

copyExtraFiles();

function copyExtraFiles() {
    if (!fs.existsSync(README_PATH)) {
        throw new Error('Requested files do not exit');
    } else {
        copyReadmeIntoDistFolder(README_PATH, PATH_TO_README);
    }
}

function copyReadmeIntoDistFolder(srcPath, toPath) {
    const fileBody = fs.readFileSync(srcPath).toString();
    const withoutLogos = fileBody
        .replace(`![ng-web-apis logo](${ASSETS_PATH}/logo.svg) `, '')
        .replace(`<img src="${ASSETS_PATH}/web-api.svg" align="top"> `, '');

    fs.writeFileSync(toPath, withoutLogos);
}
