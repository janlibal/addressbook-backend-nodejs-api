import userRepository from "../repositories/userRepository"
import crypto from "./crypto"
import { randLastName, randFirstName, randPhoneNumber, randStreetAddress, randEmail } from '@ngneat/falso'

export async function createDummy() {
    
  const firstName = randFirstName()
  const lastName = randLastName()
  const name = firstName + ' ' + lastName
  const email = randEmail()
  const pwd = 'Password123!'
  
  const dummyUser = {
    name: name,
    email: email,
    password: await crypto.hashPassword(pwd),
  }

  const user = await userRepository.saveUser(dummyUser)
  return user
}

