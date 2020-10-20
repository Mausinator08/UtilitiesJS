"use strict";

/** @module jsdoc-config-generator/generate-config */

//#region Required
const { writeFileSync } = require("fs");
const getFiles = require("./../global/get-files-recursively.js");
var conf = require("./conf-jsdoc.json");
//#endregion

//#region Fill in conf-jsdoc.json
/**
 * Recursively searches the directory for the specified file type (js or ts) and modifies the conf-jsdoc.json for the given directory of another project.
 *
 * @param {string} root - string - root dir to search.
 * @param {string} dir - string - the current dir being searched.
 * @param {string} [type="js"] - string - the file type to search for.
 * @param {string} confFile - string - the full file path to write conf-jsdoc.json to.
 * @param {string} docsOut - string - the path to the directory the html documentation will live.
 * @return {Promise<string>} - promise<string> - returns whether successfull or error ocurred.
 */
module.exports = async function (root, dir, type = "js", confFile, docsOut) {
    return new Promise(async (resolve, reject) => {
        try {
            conf.source.include = [];
            conf.source.includePattern = conf.source.includePattern.replace(/{{type}}/g, type);
            conf.opts.destination = conf.opts.destination.replace(/{{docsOut}}/g, docsOut);

            var files = [];
            var files = await getFiles.recurse(root, dir, type);

            for (const f of files) {
                try {
                    conf.source.include.push(f.fullFile);
                } catch (error) {
                    reject(error);
                }
            }

            try {
                writeFileSync(confFile, JSON.stringify(conf, null, 4), { encoding: "utf-8" });
            } catch (error) {
                reject(error);
            }

            resolve("Done!");
        } catch (error) {
            reject(error);
        }
    });
};
//#endregion