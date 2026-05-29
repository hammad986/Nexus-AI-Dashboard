// Minimal structured logger for production observability

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogPayload {
  message: string
  context?: Record<string, unknown>
  error?: Error | unknown
}

class Logger {
  private log(level: LogLevel, { message, context, error }: LogPayload) {
    const timestamp = new Date().toISOString()
    const payload = {
      timestamp,
      level,
      message,
      ...context,
      ...(error ? { error: error instanceof Error ? error.message : String(error) } : {}),
      ...(error instanceof Error && error.stack ? { stack: error.stack } : {})
    }

    if (process.env.NODE_ENV !== 'production') {
      // Pretty print in development
      const formattedContext = context ? JSON.stringify(context) : ''
      switch (level) {
        case 'info': console.log(`\x1b[36m[INFO]\x1b[0m ${message}`, formattedContext); break;
        case 'warn': console.warn(`\x1b[33m[WARN]\x1b[0m ${message}`, formattedContext); break;
        case 'error': console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`, formattedContext, error); break;
        case 'debug': console.debug(`\x1b[90m[DEBUG]\x1b[0m ${message}`, formattedContext); break;
      }
    } else {
      // JSON structured logging for production (Datadog/Sentry/Axiom compatible)
      console[level](JSON.stringify(payload))
    }
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', { message, context })
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', { message, context })
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    this.log('error', { message, error, context })
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', { message, context })
  }
}

export const logger = new Logger()
