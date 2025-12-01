import { DECODE_MESSAGES } from './constants.js';

export function xmlExtractData(data) {
    if (!data || data.xmlPCO) {
        throw new Error(DECODE_MESSAGES.NOT_FOUND);
    }
    return data.xmlPCO;
}   

export function decodeBase64(data64) {
    try {
        const buffer = Buffer.from(data64, 'base64');
        return buffer.toString('utf-8');
    } catch (error) {
        throw new Error(DECODE_MESSAGES.BASE64_DECODE_ERROR + " " + error.message);
    }
}
