import { IUser } from "../interfaces/IUser"
import logger from "../utils/logger"
import crypto from "../utils/crypto"
import userRepository from "../repositories/userRepository"
import * as errors from '../utils/errors'


async function login(input: IUser) {

  logger.info('login started')

  const data = {
    email: input.email.toLowerCase(),
    password: input.password
  }

  const user = await userRepository.findByEmail(data.email)

  if (!user) {
      logger.info('Unauthorized')
      throw new errors.UnauthorizedError('Invalid email or password')
  }

  const verified = await crypto.comparePasswords(data.password, user.password)

  if (!verified) {
    logger.info('Unauthorized')
    throw new errors.UnauthorizedError('Invalid email or password')
  }

  const token = await crypto.generateAccessToken(user.id)
  
  logger.info({email: user.email, token: token}, 'login finished')

  return {
      email: user.email,
      token
  }
}

async function create(input: IUser) {
    
  logger.info('create user started')

  const data = {
    email: input.email,
    name: input.name,
    password: await crypto.hashPassword(input.password),
  }

  const user = await userRepository.findByEmail(data.email)
      
  if (user) {
    logger.info('Resource already exists')
    throw new errors.ResourceAlreadyExists('User already registered')
  }

  let createdUser: any
  createdUser = await userRepository.saveUser(data)

  const token = await crypto.generateAccessToken(createdUser.id)
     
  logger.info({email: createdUser.email, token: token}, 'create user finished')

  return {
      email: createdUser.email,
      token
  }
  
}

async function verifyTokenPayload(token:string) {
  logger.info({ token }, 'verifyTokenPayload started')

  let jwtPayload:any
  jwtPayload = await crypto.verifyToken(token)

  const now = Date.now()
  if (!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) {
    throw new errors.Unauthorized('Invalid token')
  }

  const userId = jwtPayload.userId
  
  const user = await userRepository.findById(userId)
  if (!user) {
    throw new errors.Unauthorized('Invalid user')
  }

    
  logger.info('verifyTokenPayload finished')

  return {
    user,
    loginTimeout: jwtPayload.exp * 1000,
  }
}

export default { 
    create, login, verifyTokenPayload
}
