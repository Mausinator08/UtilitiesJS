'use strict';

/** @module global/escape-regexp */

/**
 * Variable Regex String Finder.
 *
 * @param {string} stringToGoIntoTheRegex - expects string
 * @return {string} - string returned
 */
module.exports = function (stringToGoIntoTheRegex) {
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
