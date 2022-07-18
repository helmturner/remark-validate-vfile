import { Plugin } from 'unified';
import { VFile } from 'vfile';
/**
 * Creates a single error message from an array of errors.
 * @param errors An array of errors
 * @class
 */
export declare class MultiError extends Error {
    errors: Error[];
    constructor(errors: Error[]);
}
/** Options object passed to the remark-validate plugin. */
export declare type Options = {
    /**
     * Whether to throw an error if validation fails.
     * @false appends errors to the `messages` property of the VFile
     * @true throws an instance of `MultiError`
     * @default true
     */
    failOnError?: boolean;
    /**
     * An array of assertions to run against the vFile
     * @default []
     */
    assertions?: Array<Assertion>;
};
/**
 * Validates the vFile. Must throw an error if vFile is invalid.
 * Return values are ignored.
 * @param {VFile} file the VFile to validate
 * @throws {Error} if the VFile is invalid
 */
export declare type Assertion = (file: VFile) => unknown;
/**
 * Validates the current vFile against a set of user-defined assertions.
 * If no assertions are configured, does nothing.
 * @param settings The settings object passed to the remark-validate plugin
 */
declare const remarkValidateVFile: Plugin<[(Options | undefined | void)?]>;
export default remarkValidateVFile;
//# sourceMappingURL=index.d.ts.map