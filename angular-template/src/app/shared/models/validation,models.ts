export interface IValidationResult {
    valid: boolean;
    errors: ValidationError[];
}

export class ValidationResult implements IValidationResult {
    valid = true;
    errors: ValidationError[] = [];

    addError(key: string, message: string): any {
        if (!key) {
            throw new Error('Cannot add validation message with empty key');
        }

        this.errors.push({ propertyName: key, message });
        this.valid = false;
    }
}

export interface ValidationError {
    propertyName: string;
    message: string;
}
