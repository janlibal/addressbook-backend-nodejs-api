import logger from "./logger"

export class AppError extends Error {
  public type: string
  public status: Number
  constructor(message:string, type:string, status:Number) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.type = type
    this.message = message
    this.status = status
    const stack = this.stack ? this.stack.split('\n') : this.stack
    logger.error({
      error: {
        status,
        name: this.name,
        message: this.message,
        type,
        stack: stack && stack.length > 2 ? `${stack[0]}  ${stack[1]}` : stack,
      },
    })
  }
}

export class Forbidden extends Error {
  status = 403
  name = 'Forbidden'
  expose = false
}

export class RequestValidationErrors extends Forbidden {
  name = 'InvalidRequestBodyFormat'
  type = 'INVALID_BODY_FORMAT'
  status = 400
  expose = false
}

export class ResourceAlreadyExists extends Forbidden {
  name = 'ResourceAlreadyExists'
  type = 'RESOURCE_ALREADY_EXISTS'
  status = 409
  expose = false
}