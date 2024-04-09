import supertest from 'supertest'
import os from 'os'
import {app} from '../src/utils/app'
import pkg from '../package.json'

const server = app.listen()

afterAll(async () => {
    await server.close()
})


describe('GET /', () => {
      it('<200> should always return with the API server information', async () => {
        const request = supertest(server)
        const res = await request
          .get('/')
          .expect('Content-Type', /json/)
          .expect(200)
        const info = res.body
        const status = res.status

        expect(status).toBe(200)
        expect(info.name).toBe(pkg.name)
        expect(info.version).toBe(pkg.version)
        expect(info.description).toBe(pkg.description)
        expect(info.environments).toBeInstanceOf(Object)

        const environments = info.environments
        expect(environments.hostname).toBe(os.hostname())
        expect(environments.nodeVersion).toBe(process.versions['node'])
        expect(environments.platform).toBe(`${process.platform}/${process.arch}`)
      })

      it('<404> should return 404 with an unknown endpoint', async () => {
        const request = supertest(server)
        const res = await request
          .get('/unknown')
          .expect('Content-Type', /json/)
          .expect(404)
        const info = res.body
        const status = res.status

        expect(status).toBe(404)
        expect(info.status).toBe(404)
        expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
        expect(info.type).toMatch('NOT_FOUND')
        expect(info.message).toMatch('Route not found!')
        expect(info.stack).toMatch(/NotFound: Route not found!/i)
        
      })
})
