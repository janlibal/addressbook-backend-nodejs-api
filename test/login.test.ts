import supertest from 'supertest'
import {app} from '../src/utils/app'
import { knex } from '../src/database'


const server = app.listen()

afterAll(async () => {
    await server.close()
})

describe('POST /api/v1/login', () => {

    beforeEach(async() => {
      return await knex.migrate.rollback()
      .then(async () => {return await knex.migrate.latest()})
    })
  
    afterEach(async () => {
      return await knex.migrate.rollback()
    })
  
    it('SignIn test', async () => {
      const request = supertest(server)
      const userData = {
        email: 'joe@joedoe.com', 
        password: 'Password123!'
      }
      const res = await request
      .post(`/api/v1/login`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(200)
      const info = res.body
      const status = res.status
      expect(status).toBe(200)
      expect(info.email).toMatch(/^\S+@\S+\.\S+$/)
      expect(info.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    })
})
