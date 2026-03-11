import {
    appendFileSync,
    existsSync,
    mkdirSync,
    readdirSync,
    statSync,
    unlinkSync,
    renameSync,
} from 'fs';
import { join } from 'path';
import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: any;
    context?: string;
}

interface AdvancedLoggerConfig {
    enableFileLogging?: boolean;
    enableConsoleLogging?: boolean;
    logDir?: string;
    separateFiles?: boolean;
    rotateDaily?: boolean;
    maxFileSize?: number; // in MB
    maxFiles?: number; // maximum number of log files to keep
    compress?: boolean; // compress old log files
}

class AdvancedLogger {
    private logDir: string;
    private enableFileLogging: boolean;
    private enableConsoleLogging: boolean;
    private separateFiles: boolean;
    private rotateDaily: boolean;
    private maxFileSize: number;
    private maxFiles: number;
    private compress: boolean;
    private isServer: boolean;

    constructor(config: AdvancedLoggerConfig = {}) {
        this.logDir = config.logDir || join(process.cwd(), 'logs');
        this.enableFileLogging =
            config.enableFileLogging ??
            process.env.ENABLE_FILE_LOGGING === 'true';
        this.enableConsoleLogging = config.enableConsoleLogging ?? true;
        this.separateFiles = config.separateFiles ?? true;
        this.rotateDaily = config.rotateDaily ?? true;
        this.maxFileSize = (config.maxFileSize || 10) * 1024 * 1024; // Convert MB to bytes
        this.maxFiles = config.maxFiles || 30; // Keep last 30 log files
        this.compress = config.compress ?? true;
        this.isServer = typeof window === 'undefined';

        if (this.isServer && this.enableFileLogging) {
            this.initializeLogDirectories();
        }
    }

    private initializeLogDirectories() {
        try {
            if (!existsSync(this.logDir)) {
                mkdirSync(this.logDir, { recursive: true });
            }

            if (this.separateFiles) {
                const levels: LogLevel[] = ['info', 'warn', 'error', 'debug'];
                levels.forEach(level => {
                    const levelDir = join(this.logDir, level);
                    if (!existsSync(levelDir)) {
                        mkdirSync(levelDir, { recursive: true });
                    }

                    // Create archive directory for compressed logs
                    if (this.compress) {
                        const archiveDir = join(levelDir, 'archive');
                        if (!existsSync(archiveDir)) {
                            mkdirSync(archiveDir, { recursive: true });
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Failed to create logs directory:', error);
        }
    }

    private formatMessage(
        level: LogLevel,
        message: string,
        data?: any,
        context?: string,
    ): string {
        const timestamp = new Date().toISOString();
        const logEntry: LogEntry = {
            timestamp,
            level,
            message,
            ...(context && { context }),
            ...(data && { data }),
        };

        return JSON.stringify(logEntry);
    }

    private getLogFilePath(level: LogLevel): string {
        const date = new Date().toISOString().split('T')[0];

        if (this.separateFiles) {
            const filename = this.rotateDaily ? `${date}.log` : `${level}.log`;
            return join(this.logDir, level, filename);
        } else {
            const filename = this.rotateDaily ? `${date}.log` : 'app.log';
            return join(this.logDir, filename);
        }
    }

    private shouldRotateFile(filepath: string): boolean {
        if (!existsSync(filepath)) return false;

        try {
            const stats = statSync(filepath);
            return stats.size >= this.maxFileSize;
        } catch {
            return false;
        }
    }

    private rotateLogFile(level: LogLevel, filepath: string) {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const dir = this.separateFiles
                ? join(this.logDir, level)
                : this.logDir;
            const filename = `${timestamp}.log`;
            const newPath = join(dir, filename);

            // Rename current log file
            renameSync(filepath, newPath);

            // Compress if enabled
            if (this.compress) {
                this.compressLogFile(level, newPath);
            }

            // Clean old log files
            this.cleanOldLogs(level);
        } catch (error) {
            console.error('Failed to rotate log file:', error);
        }
    }

    private compressLogFile(level: LogLevel, filepath: string) {
        try {
            const archiveDir = this.separateFiles
                ? join(this.logDir, level, 'archive')
                : join(this.logDir, 'archive');

            if (!existsSync(archiveDir)) {
                mkdirSync(archiveDir, { recursive: true });
            }

            const filename = filepath.split('/').pop() || 'log.log';
            const gzipPath = join(archiveDir, `${filename}.gz`);

            const gzip = createGzip();
            const source = createReadStream(filepath);
            const destination = createWriteStream(gzipPath);

            source.pipe(gzip).pipe(destination);

            destination.on('finish', () => {
                // Delete original file after compression
                unlinkSync(filepath);
            });
        } catch (error) {
            console.error('Failed to compress log file:', error);
        }
    }

    private cleanOldLogs(level: LogLevel) {
        try {
            const dir = this.separateFiles
                ? join(this.logDir, level)
                : this.logDir;
            const archiveDir = join(dir, 'archive');

            if (!existsSync(archiveDir)) return;

            const files = readdirSync(archiveDir)
                .filter(file => file.endsWith('.gz'))
                .map(file => ({
                    name: file,
                    path: join(archiveDir, file),
                    time: statSync(join(archiveDir, file)).mtime.getTime(),
                }))
                .sort((a, b) => b.time - a.time);

            // Delete files beyond maxFiles limit
            if (files.length > this.maxFiles) {
                files.slice(this.maxFiles).forEach(file => {
                    unlinkSync(file.path);
                });
            }
        } catch (error) {
            console.error('Failed to clean old logs:', error);
        }
    }

    private writeToFile(level: LogLevel, logMessage: string) {
        if (!this.isServer || !this.enableFileLogging) return;

        try {
            const filepath = this.getLogFilePath(level);

            // Rotate if file is too large
            if (this.shouldRotateFile(filepath)) {
                this.rotateLogFile(level, filepath);
            }

            appendFileSync(filepath, logMessage + '\n', 'utf8');
        } catch (error) {
            console.error(`Failed to write ${level} log to file:`, error);
        }
    }

    private log(
        level: LogLevel,
        message: string,
        data?: any,
        context?: string,
    ) {
        const logMessage = this.formatMessage(level, message, data, context);

        if (this.enableConsoleLogging) {
            const emoji = { info: 'ℹ️', warn: '⚠️', error: '❌', debug: '🐛' }[
                level
            ];
            const consoleMethod = {
                info: console.log,
                warn: console.warn,
                error: console.error,
                debug: console.debug,
            }[level];
            const contextStr = context ? `[${context}]` : '';
            consoleMethod(
                `${emoji} ${contextStr} [${level.toUpperCase()}]`,
                message,
                data || '',
            );
        }

        this.writeToFile(level, logMessage);
    }

    info(message: string, data?: any, context?: string) {
        this.log('info', message, data, context);
    }

    warn(message: string, data?: any, context?: string) {
        this.log('warn', message, data, context);
    }

    error(message: string, error?: any, context?: string) {
        const errorData =
            error instanceof Error
                ? {
                      message: error.message,
                      stack: error.stack,
                      name: error.name,
                  }
                : { error };
        this.log('error', message, errorData, context);
    }

    debug(message: string, data?: any, context?: string) {
        if (process.env.NODE_ENV === 'development') {
            this.log('debug', message, data, context);
        }
    }
}

const logger = new AdvancedLogger({
    enableFileLogging: process.env.ENABLE_FILE_LOGGING === 'true',
    enableConsoleLogging: true,
    separateFiles: true,
    rotateDaily: true,
    maxFileSize: 10, // 10 MB
    maxFiles: 30, // Keep 30 days of logs
    compress: true,
});

export { AdvancedLogger, logger };
