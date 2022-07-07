/**
 * Creates a single error message from an array of errors.
 * @param errors An array of errors
 * @class
 */
export class MultiError extends Error {
    constructor(errors) {
        super(`Multiple Errors Occured:`);
        Object.defineProperty(this, "errors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'MultiError';
        this.errors = errors;
    }
}
/**
 * Validates the current vFile against a set of user-defined assertions.
 * If no assertions are configured, does nothing.
 * @param settings The settings object passed to the remark-validate plugin
 */
const remarkValidateVFile = function (settings) {
    const { failOnError = true, assertions = [] } = settings !== null && settings !== void 0 ? settings : {};
    const errors = [];
    const transformer = function (_node, file) {
        for (const assertion of assertions) {
            try {
                assertion.call(this, file);
            }
            catch (error) {
                failOnError ? errors.push(error) : file.message(error);
            }
        }
        if (errors.length > 0)
            return new MultiError(errors);
    };
    return transformer.bind(this);
};
export default remarkValidateVFile;
