import { config } from '@config/app'
import pino from 'pino'

export const logger = pino(
  config.isDevelopment
    ? {
        level: config.LOG_LEVEL,
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true },
        },
      }
    : {
        base: null, // remove default base properties like pid and hostname
        level: config.LOG_LEVEL,
        formatters: {
          level: (label) => {
            return { level: label.toLowerCase() }
          },
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      }
)
