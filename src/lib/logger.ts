type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: unknown;
    context?: string;
}

interface AdvancedLoggerConfig {
    enableConsoleLogging?: boolean;
}

class AdvancedLogger {
    private enableConsoleLogging: boolean;

    constructor(config: AdvancedLoggerConfig = {}) {
        this.enableConsoleLogging = config.enableConsoleLogging ?? true;
    }

    private formatMessage(
        level: LogLevel,
        message: string,
        data?: unknown,
        context?: string,
    ): LogEntry {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            ...(context && { context }),
            ...(data !== undefined && { data }),
        };
    }

    private log(
        level: LogLevel,
        message: string,
        data?: unknown,
        context?: string,
    ) {
        if (!this.enableConsoleLogging) return;

        const emoji = { info: 'ℹ️', warn: '⚠️', error: '❌', debug: '🐛' }[
            level
        ];
        const fn = {
            info: console.log,
            warn: console.warn,
            error: console.error,
            debug: console.debug,
        }[level];

        const contextStr = context ? `[${context}] ` : '';
        fn(
            `${emoji} ${contextStr}[${level.toUpperCase()}]`,
            message,
            data ?? '',
        );
    }

    info(message: string, data?: unknown, context?: string) {
        this.log('info', message, data, context);
    }

    warn(message: string, data?: unknown, context?: string) {
        this.log('warn', message, data, context);
    }

    error(message: string, error?: unknown, context?: string) {
        const errorData =
            error instanceof Error
                ? {
                      message: error.message,
                      stack: error.stack,
                      name: error.name,
                  }
                : error;
        this.log('error', message, errorData, context);
    }

    debug(message: string, data?: unknown, context?: string) {
        if (process.env.NODE_ENV === 'development') {
            this.log('debug', message, data, context);
        }
    }
}

const logger = new AdvancedLogger({
    enableConsoleLogging: true,
});

export { AdvancedLogger, logger };
