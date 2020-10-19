#!/usr/bin/env node

"use strict";

/** @module cli */

//#region Required
var yargs = require("yargs");
const configGen = require("./jsdoc-config-generator/generate-config.js");
//#endregion

//#region command line arguments
/** @type {Object} - Object - command line arguments */
const argv = yargs.command(
    "generate_jsdoc_config",
    "Generates the jsdoc configuration for a project.",
    {
        root: {
            description: "The root directory to recurse through files.",
            alias: "r",
            type: "string"
        },
        type: {
            description: "The file type to include. (js [by default] or ts).",
            alias: "t",
            type: "string"
        },
        config_file: {
            description: "The path to write the resulting config file to.",
            alias: "c",
            type: "string"
        }
    }
).help().alias("help", "h").argv;
//#endregion

//#region Check which command is passed from command line
/** jsdoc-config-generator */
if (argv._.includes("generate_jsdoc_config") === true) {
    configGen(argv.root, argv.root, argv.type, argv.config_file).then(val => {
        console.log(val);
        process.exit();
    }).catch(err => {
        console.error(err);
        process.exit(1);
    });
}
//#endregion