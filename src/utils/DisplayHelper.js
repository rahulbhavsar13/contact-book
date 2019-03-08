import React from 'react';
import {FormattedMessage} from "../components/common/formatted-message";

/**
 * Helper class to display values in appropriate formate.
 */
const DisplayHelper = {

    /**
     * Helper to convert value to dissplay friendly format
     */
    convertToDisplayFriendlyFormat : (unit, value) => {
        if (unit === "TB") {
            return { unit: 'TB', value: Number(value).toFixed(2), displayUnit: 'storage.unit.tb' };
        } else if (unit === "GB") {
            return { unit: 'GB', value: Number(value).toFixed(2), displayUnit: 'storage.unit.gb' };
        } else if (unit === "MB") {
            return { unit: 'MB', value: Number(value).toFixed(2), displayUnit: 'storage.unit.mb' };
        } else if (unit === "KB") {
            return { unit: 'KB', value: Number(value).toFixed(2), displayUnit: 'storage.unit.kb' };
        } else {
            return { unit: 'Bytes', value: Number(value).toFixed(2), displayUnit: 'storage.unit.byte' };
        }
    },

    /**
     * Helper to convert value to GB format
     */
    convertToGBFormat : (unit, value) => {
        if (unit === "TB") {
            return { unit: 'GB', value: Number(value * 1024).toFixed(2), displayUnit: 'storage.unit.gb' };
        } else if (unit === "GB") {
            return { unit: 'GB', value: Number(value).toFixed(2), displayUnit: 'storage.unit.gb' };
        } else if (unit === "MB") {
            return { unit: 'GB', value: Number(value / 1024).toFixed(2), displayUnit: 'storage.unit.gb' };
        } else if (unit === "KB") {
            return { unit: 'GB', value: Number(value / 1048576).toFixed(2), displayUnit: 'storage.unit.gb' };
        } else {
            return { unit: 'GB', value: Number(value / 1073741824).toFixed(2), displayUnit: 'storage.unit.gb' };
        }
    },

    /**
     * Helper to convert value to MB format
     */
    convertToMBFormat : (unit, value) => {
        if (unit === "TB") {
            return { unit: 'MB', value: Number(value * 1048576).toFixed(2), displayUnit: 'storage.unit.mb' };
        } else if (unit === "GB") {
            return { unit: 'MB', value: Number(value * 1024).toFixed(2), displayUnit: 'storage.unit.mb' };
        } else if (unit === "MB") {
            return { unit: 'MB', value: Number(value).toFixed(2), displayUnit: 'storage.unit.mb' };
        } else if (unit === "KB") {
            return { unit: 'MB', value: Number(value / 1024).toFixed(2), displayUnit: 'storage.unit.mb' };
        } else {
            return { unit: 'MB', value: Number(value / 1048576).toFixed(2), displayUnit: 'storage.unit.mb' };
        }
    },

    /**
     * Helper to convert value to KB format
     */
    convertToKiloByteFormat : (unit, value) => {
        if (unit === "TB") {
            return { unit: 'KB', value: Number(value * 1073741824).toFixed(2), displayUnit: 'storage.unit.kb' };
        } else if (unit === "GB") {
            return { unit: 'KB', value: Number(value * 1048576).toFixed(2), displayUnit: 'storage.unit.kb' };
        } else if (unit === "MB") {
            return { unit: 'KB', value: Number(value * 1024).toFixed(2), displayUnit: 'storage.unit.kb' };
        } else if (unit === "KB") {
            return { unit: 'KB', value: Number(value).toFixed(2), displayUnit: 'storage.unit.kb' };
        } else {
            return { unit: 'KB', value: Number(value / 1024).toFixed(2), displayUnit: 'storage.unit.kb' };
        }
    },

    /**
     * Helper to convert digital storage from kilo bytes to appropriate unit value
     */
    convertKiloBytesToDisplayFriendlyFormat : (kiloBytesValue) => {
        if (kiloBytesValue > 1073741824) {
            return { unit: 'TB', value: Number(kiloBytesValue / 1073741824).toFixed(2), displayUnit: 'storage.unit.tb' };   
        } else if (kiloBytesValue >= 1048576) {
            return { unit: 'GB', value: Number(kiloBytesValue / 1048576).toFixed(2), displayUnit: 'storage.unit.gb' }; 
        } else if (kiloBytesValue >= 1024) {
            return { unit: 'MB', value: Number(kiloBytesValue / 1024).toFixed(2), displayUnit: 'storage.unit.mb' }; 
        } else {
            return { unit: 'KB', value: Number(kiloBytesValue).toFixed(2), displayUnit: 'storage.unit.kb' }; 
        }
    },

    /**
     * Helper to convert digital storage from bytes to appropriate unit value
     */
    convertBytesToDisplayFriendlyFormat : (bytesValue) => {
        if (bytesValue > 1099511627776) {
            return { unit: 'TB', value: Number(bytesValue / 1099511627776).toFixed(2), displayUnit: 'storage.unit.tb' };   
        } else if (bytesValue >= 1073741824) {
            return { unit: 'GB', value: Number(bytesValue / 1073741824).toFixed(2), displayUnit: 'storage.unit.gb' }; 
        } else if (bytesValue >= 1048576) {
            return { unit: 'MB', value: Number(bytesValue / 1048576).toFixed(2), displayUnit: 'storage.unit.mb' }; 
        } else if (bytesValue >= 1024) {
            return { unit: 'KB', value: Number(bytesValue / 1024).toFixed(2), displayUnit: 'storage.unit.kb' }; 
        } else {
            return { unit: 'Bytes', value: Number(bytesValue).toFixed(2), displayUnit: 'storage.unit.byte' }; 
        }
    },

    /**
     * Helper to convert digital storage from MB to appropriate unit value
     */
    convertMBToDisplayFriendlyFormat : (mbValue) => {
        if (mbValue > 1048576) {
            return { unit: 'TB', value: Number(mbValue / 1048576).toFixed(2), displayUnit: 'storage.unit.tb' };   
        } else if (mbValue > 1024) {
            return { unit: 'GB', value: Number(mbValue / 1024).toFixed(2), displayUnit: 'storage.unit.gb' }; 
        } else {
            return { unit: 'MB', value: Number(mbValue).toFixed(2), displayUnit: 'storage.unit.mb' }; 
        }
    },
    
    /* Encode Base64Encoding
    * @see{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_2_%E2%80%93_escaping_the_string_before_encoding_it}
    */
    encodeUnicodeString: (str) => {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    },
    
    /* Decode Base64Encoding 
    ** @see{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_2_%E2%80%93_escaping_the_string_before_encoding_it}
    */
    decodeUnicodeString: (encodedString) => {
        return decodeURIComponent(atob(encodedString).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    },

    /**
     * Helper to convert value to byte format
     */
    convertToBytesFormat : (unit, value) => {
        if (unit === "TB") {
            return { unit: 'Bytes', value: Number(value * 1099511627776).toFixed(2), displayUnit: 'storage.unit.byte' };
        } else if (unit === "GB") {
            return { unit: 'Bytes', value: Number(value * 1073741824).toFixed(2), displayUnit: 'storage.unit.byte' };
        } else if (unit === "MB") {
            return { unit: 'Bytes', value: Number(value * 1048576).toFixed(2), displayUnit: 'storage.unit.byte' };
        } else if (unit === "KB") {
            return { unit: 'Bytes', value: Number(value * 1024).toFixed(2), displayUnit: 'storage.unit.byte' };
        } else {
            return { unit: 'Bytes', value: Number(value).toFixed(2), displayUnit: 'storage.unit.byte' };
        }
    },

    /**
     * Generates a color between red(0) and
     * green(100) based on input percentage with green/100
     * being considered as safe.
     * @param {number} percent
     */
    getDownloadProgressColor : (percent) => {
        if (percent < 30) {
            return '#fa5138';
        } else if (percent < 70) {
            return '#f4a34e';
        } else {
            return '#4ac94e';
        }
    }
}

export default DisplayHelper;