export class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConnectionError';
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class DuplicateValueError extends Error {
  constructor(message, duplicateValue) {
    super(message);
    this.name = 'DuplicateValueError';
    this.duplicateValue = duplicateValue;
  }
}

export class MissedFieldsError extends Error {
  constructor(message, missedFields) {
    super(message);
    this.name = 'MissedFieldsError';
    this.missedFields = missedFields;
  }
}
