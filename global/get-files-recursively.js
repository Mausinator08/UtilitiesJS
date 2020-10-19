"use strict";

/** @module global/get-files-recursively */

//#region Required Scripts
const { readdir } = require("fs").promises;
const escapeRegExp = require("./escape-regexp.js");
//#endregion

//#region Methods
/**
 * get files in directories recursively
 *
 * @param {string} root - string - root dir
 * @param {string} dir - string - current iterrated dir
 * @param {string} [type=null] - string - file type wihout the .
 * @return {Promise<Array>} - Promise<Array> - list of {fullFile, path, fileName}.
 */
async function getFiles(root, dir, type = null) {
    return new Promise(async (resolve, reject) => {
        try {
            var files = [];
            const dirents = await readdir(dir, { encoding: "utf-8", withFileTypes: true });
            for (const dirent of dirents) {
                const res = dir + "\\" + dirent.name;
                if (dirent.isDirectory() === true && dirent.name !== "node_modules") {
                    const obj = await getFiles(root, res, type);
                    for (var o of obj) {
                        files.push({
                            fullFile: o.fullFile,
                            path: o.path,
                            fileName: o.fileName
                        });
                    }
                } else {
                    const regex = new RegExp(escapeRegExp(root), "g");
					if (type) {
						if (dirent.name.split(".")[1] === type) {
							files.push({
								fullFile: res,
								path: dir.replace(regex, ""),
								fileName: dirent.name
							});
						}
					} else {
						files.push({
							fullFile: res,
							path: dir.replace(regex, ""),
							fileName: dirent.name
						});
					}
                }
            }

            resolve(files);
        } catch (error) {
            reject(error);
        }
    });
};
//#endregion

//#region Exports
module.exports = {
    /**
     * Exports the call to the getFiles() function and resolves on success with list of files in specified root directory and its subdirectories.
     *
     * @param {string} root - string - root dir
     * @param {string} dir - string - current iterrated dir
     * @param {string} [type=null] - string - file type wihout the .
     * @return {Promise<array>} - Promise<array> - promise with a list of {fullFile, path, fileName}.
     */
    recurse: async function (root, dir, type = null) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await getFiles(root, dir, type));
            } catch (error) {
                reject(error);
            }
        });
    }
};
//#endregion