import {Plugin, Transformer} from 'unified';
import {VFile} from 'vfile';

/**
 * Creates a single error message from an array of errors.
 * @param errors An array of errors
 * @class
 */
export class MultiError extends Error {
  errors: Error[];
  constructor(errors: Error[]) {
    super(
      `Multiple Errors Occured:`
    );
    this.name = 'MultiError';
    this.errors = errors;
  }
}
/** Options object passed to the remark-validate plugin. */
export type Options = {
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
export type Assertion = (file: VFile) => unknown;

/**
 * Validates the current vFile against a set of user-defined assertions.
 * If no assertions are configured, does nothing.
 * @param settings The settings object passed to the remark-validate plugin
 */
const remarkValidateVFile: Plugin<[Options|null]> = function (
  this,
  settings
) {
  type ThisProcessor = typeof this;
  const {failOnError = true, assertions = []} = settings ?? {};
  const errors: Error[] = [];

  const transformer: Transformer = function (this: ThisProcessor, _node, file) {
    for (const assertion of assertions) {
      try {
        assertion.call(this, file);
      } catch (error) {
        failOnError ? errors.push(error as Error) : file.message(error as Error);
      }
    }
    if (errors.length > 0) return new MultiError(errors);
  }
  return transformer.bind(this);
};

export default remarkValidateVFile;
