export class ProfileIdNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ProfileIdNotFoundError';
    }
}