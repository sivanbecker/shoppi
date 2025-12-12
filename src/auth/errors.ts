export class EmailNotFoundError extends Error {
    constructor(message: string) {
        super(message)
    }
}
export class PasswordDontMatchError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class EmailAlreadyExistsError extends Error {
    constructor(message: string) {
        super(message)
    }
}