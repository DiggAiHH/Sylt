/**
 * Custom Error Classes for structured error handling.
 * Follows the principle of fail-fast with meaningful error messages
 * and proper HTTP status code mapping.
 */

export enum ErrorCode {
  // Validation Errors (400)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_DATE_RANGE = 'INVALID_DATE_RANGE',
  INVALID_PROPERTY_ID = 'INVALID_PROPERTY_ID',
  INVALID_EMAIL = 'INVALID_EMAIL',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  
  // Not Found Errors (404)
  PROPERTY_NOT_FOUND = 'PROPERTY_NOT_FOUND',
  BOOKING_NOT_FOUND = 'BOOKING_NOT_FOUND',
  
  // Conflict Errors (409)
  DATES_NOT_AVAILABLE = 'DATES_NOT_AVAILABLE',
  BOOKING_ALREADY_EXISTS = 'BOOKING_ALREADY_EXISTS',
  
  // Rate Limit (429)
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Server Errors (500)
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
}

interface ErrorDetails {
  httpStatus: number;
  userMessage: string;
}

const ERROR_DETAILS: Record<ErrorCode, ErrorDetails> = {
  [ErrorCode.VALIDATION_ERROR]: {
    httpStatus: 400,
    userMessage: 'Die Eingabedaten sind ungültig.',
  },
  [ErrorCode.INVALID_DATE_RANGE]: {
    httpStatus: 400,
    userMessage: 'Der gewählte Zeitraum ist ungültig.',
  },
  [ErrorCode.INVALID_PROPERTY_ID]: {
    httpStatus: 400,
    userMessage: 'Die Unterkunfts-ID ist ungültig.',
  },
  [ErrorCode.INVALID_EMAIL]: {
    httpStatus: 400,
    userMessage: 'Die E-Mail-Adresse ist ungültig.',
  },
  [ErrorCode.MISSING_REQUIRED_FIELD]: {
    httpStatus: 400,
    userMessage: 'Pflichtfelder fehlen.',
  },
  [ErrorCode.PROPERTY_NOT_FOUND]: {
    httpStatus: 404,
    userMessage: 'Die Unterkunft wurde nicht gefunden.',
  },
  [ErrorCode.BOOKING_NOT_FOUND]: {
    httpStatus: 404,
    userMessage: 'Die Buchung wurde nicht gefunden.',
  },
  [ErrorCode.DATES_NOT_AVAILABLE]: {
    httpStatus: 409,
    userMessage: 'Die gewählten Daten sind leider nicht verfügbar.',
  },
  [ErrorCode.BOOKING_ALREADY_EXISTS]: {
    httpStatus: 409,
    userMessage: 'Eine Buchung für diesen Zeitraum existiert bereits.',
  },
  [ErrorCode.RATE_LIMIT_EXCEEDED]: {
    httpStatus: 429,
    userMessage: 'Zu viele Anfragen. Bitte warten Sie einen Moment.',
  },
  [ErrorCode.INTERNAL_ERROR]: {
    httpStatus: 500,
    userMessage: 'Ein interner Fehler ist aufgetreten.',
  },
  [ErrorCode.DATABASE_ERROR]: {
    httpStatus: 500,
    userMessage: 'Datenbankfehler. Bitte versuchen Sie es später erneut.',
  },
  [ErrorCode.EXTERNAL_SERVICE_ERROR]: {
    httpStatus: 500,
    userMessage: 'Ein externer Dienst ist nicht verfügbar.',
  },
};

export class ApiError extends Error {
  public readonly code: ErrorCode;
  public readonly httpStatus: number;
  public readonly userMessage: string;
  public readonly details?: string[];
  public readonly timestamp: string;

  constructor(
    code: ErrorCode,
    details?: string[],
    customMessage?: string
  ) {
    const errorDetails = ERROR_DETAILS[code];
    super(customMessage || errorDetails.userMessage);
    
    this.code = code;
    this.httpStatus = errorDetails.httpStatus;
    this.userMessage = customMessage || errorDetails.userMessage;
    this.details = details;
    this.timestamp = new Date().toISOString();
    
    // Maintains proper stack trace for debugging
    Error.captureStackTrace(this, ApiError);
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Convert to API response format
   */
  toResponse() {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.userMessage,
        details: this.details,
        timestamp: this.timestamp,
      },
    };
  }
}

/**
 * Structured logging for errors with context
 */
export function logError(
  error: Error | ApiError,
  context?: Record<string, unknown>
): void {
  const isApiError = error instanceof ApiError;
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: 'error',
    code: isApiError ? error.code : 'UNKNOWN_ERROR',
    message: error.message,
    stack: error.stack,
    context,
  };
  
  // In production, this would go to a logging service (e.g., Winston, Pino)
  console.error(JSON.stringify(logEntry, null, 2));
}

/**
 * Safe error handler that never exposes internal details to users
 */
export function handleError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  
  // Log unexpected errors with full details
  logError(error instanceof Error ? error : new Error(String(error)));
  
  // Return generic error to user (never expose internal details)
  return new ApiError(ErrorCode.INTERNAL_ERROR);
}
