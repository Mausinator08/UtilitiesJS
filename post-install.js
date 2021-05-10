"use-strict";

const os = require("os");
const { exec } = require("child_process");

switch (os.platform()) {
    case "win32":
        exec("pkg . --output=%CD%\\.bin\\mgk-utilities-js.exe && setx PATH \"%PATH%;%CD%\\.bin\"");
        break;
    
    case "darwin":
        exec("pkg . --output=$PWD/.bin/mgk-utilities-js && export PATH=$PATH;$PWD'/.bin'");
        break;
    
    case "linux":
        exec("pkg . --output=$PWD/.bin/mgk-utilities-js && export PATH=$PATH;$PWD'/.bin'");
        break;
}
