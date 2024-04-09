import * as errors from '../utils/errors'

export function handleNotFound() {
    throw new errors.NotFound('Route not found!')
}
  