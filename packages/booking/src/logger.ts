/**
 * Structured Logger Service
 * 
 * Purpose: Provides consistent, structured logging across the application.
 * Supports log levels, context, and JSON output for production log aggregation.
 * 
 * In production, logs can be shipped to services like Datadog, Splunk, or CloudWatch.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  requestId?: string;
  userId?: string;
  propertyId?: string;
  bookingId?: string;
  action?: string;
  duration?: number;
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

interface LoggerConfig {
  /** Minimum log level to output */
  minLevel: LogLevel;
  /** Output logs as JSON (for production) */
  jsonOutput: boolean;
  /** Include stack traces in error logs */
  includeStackTrace: boolean;
  /** Application name for log identification */
  appName: string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  jsonOutput: process.env.NODE_ENV === 'production',
  includeStackTrace: process.env.NODE_ENV !== 'production',
  appName: 'sylt-hub',
};

class Logger {
  private config: LoggerConfig;
  private defaultContext: LogContext;

  constructor(config: Partial<LoggerConfig> = {}, defaultContext: LogContext = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.defaultContext = defaultContext;
  }

  /**
   * Creates a child logger with additional default context.
   * Useful for request-scoped logging.
   */
  child(context: LogContext): Logger {
    return new Logger(this.config, { ...this.defaultContext, ...context });
  }

  /**
   * Logs a debug message. Use for detailed debugging information.
   */
  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  /**
   * Logs an info message. Use for general operational information.
   */
  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  /**
   * Logs a warning message. Use for potentially problematic situations.
   */
  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  /**
   * Logs an error message. Use for errors that need attention.
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorInfo = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: this.config.includeStackTrace ? error.stack : undefined,
    } : error ? {
      name: 'UnknownError',
      message: String(error),
    } : undefined;

    this.log('error', message, context, errorInfo);
  }

  /**
   * Measures and logs the duration of an async operation.
   */
  async measureAsync<T>(
    label: string,
    fn: () => Promise<T>,
    context?: LogContext
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = Math.round(performance.now() - start);
      this.info(`${label} completed`, { ...context, duration });
      return result;
    } catch (error) {
      const duration = Math.round(performance.now() - start);
      this.error(`${label} failed`, error, { ...context, duration });
      throw error;
    }
  }

  /**
   * Core logging method.
   */
  private log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    errorInfo?: LogEntry['error']
  ): void {
    // Check if this level should be logged
    if (LOG_LEVELS[level] < LOG_LEVELS[this.config.minLevel]) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: { ...this.defaultContext, ...context },
    };

    if (errorInfo) {
      entry.error = errorInfo;
    }

    this.output(entry);
  }

  /**
   * Outputs the log entry to the appropriate destination.
   */
  private output(entry: LogEntry): void {
    if (this.config.jsonOutput) {
      // JSON output for production log aggregation
      const output = JSON.stringify({
        ...entry,
        app: this.config.appName,
      });

      switch (entry.level) {
        case 'error':
          console.error(output);
          break;
        case 'warn':
          console.warn(output);
          break;
        default:
          console.log(output);
      }
    } else {
      // Human-readable output for development
      const contextStr = Object.keys(entry.context).length > 0
        ? ` ${JSON.stringify(entry.context)}`
        : '';
      const errorStr = entry.error
        ? `\n  Error: ${entry.error.name}: ${entry.error.message}${entry.error.stack ? `\n${entry.error.stack}` : ''}`
        : '';

      const color = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[32m',  // Green
        warn: '\x1b[33m',  // Yellow
        error: '\x1b[31m', // Red
      }[entry.level];
      const reset = '\x1b[0m';

      const output = `${color}[${entry.level.toUpperCase()}]${reset} ${entry.timestamp} ${entry.message}${contextStr}${errorStr}`;

      switch (entry.level) {
        case 'error':
          console.error(output);
          break;
        case 'warn':
          console.warn(output);
          break;
        default:
          console.log(output);
      }
    }
  }
}

// Global logger instance
export const logger = new Logger();

/**
 * Creates a request-scoped logger with a unique request ID.
 */
export function createRequestLogger(requestId?: string): Logger {
  return logger.child({
    requestId: requestId || generateRequestId(),
  });
}

/**
 * Generates a unique request ID for tracing.
 * Uses timestamp + counter for uniqueness (crypto.randomUUID not available in all runtimes).
 */
let requestIdCounter = 0;
export function generateRequestId(): string {
  // Increment counter and wrap at Number.MAX_SAFE_INTEGER
  requestIdCounter = (requestIdCounter + 1) % Number.MAX_SAFE_INTEGER;
  // Combine timestamp, counter, and a short random suffix for uniqueness
  return `req_${Date.now().toString(36)}_${requestIdCounter.toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
}
