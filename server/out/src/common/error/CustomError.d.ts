export default class CustomError extends Error {
    code: string;
    constructor(message: string, code: string);
}
