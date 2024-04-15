# Addressbook

## Introduction

Addressbok API is a simple RESTful API project built using Node.Js, Koa, Swagger, TypeScript and Objection as ORM for a Postres database. As middleware is used JWT, CORS, Pino logger.

### What it contains

* Node.js (version 20.0.0. and higher)
* Npm (version 8.0.0. and higher)
* TypeScript 
* Koa framework
* Postgres (database) with objection
* Swagger (documentation)
* Pino (logger)
* Jest (integration tests)

### Available Endpoints

* GET / – gets API info
* GET /swagger – API Documentation
* POST /api/v1/user – creates new user and logs in  (returns access token to access protected routes)
* POST /api/v1/login – login (returns access token to access protected routes)
* POST /api/v1/address – saves new contact in Forestore database

## Setup

### Requirements

* Node.js – 20 and higher
* Npm – 8 and higher
* Docker and docker-compose in order to launch Postgres and App 

### Docker Controls

* create and start docker containers: npm run infra
* stop docker containers: npm run infra:stop

### Setup And Start

* install dependencies: npm install
* run in development: npm run dev
* run in staging: launch app in docker on 8080

### Test

* npm run test

### Build

* build into /dist: npm run build

### Migrations

* create a new migration: npm run migration:make
* apply migration into DB in dev environment: npm run migrate:db-dev
* apply migration into DB in test environment: npm run migrate:db-test

### Seeding

* create a new seed: npm run seed:make
* dump tables in dev environment: npm run seed:db-dev

### Rollbacks

* rollback DB in development environment: npm run rollback:db-dev
* rollback DB in test environment: npm run rollback:db-test

## Design

### Project Structure

* The project is written in TypeScript. When TS compiles, all subsequently JS files are in /dist
* The entry point for the server is /src/index.ts
* The app flow: server -> routes -> controllers -> operations -> repositories
* Middleware are in /src/middleware folder
* Database connection functions in /src/database
* Schemas for validation are in /src/validations
* Custom interfaces for TS types are in /src/interfaces
* Tests are in /test folder

### API Design

The project structure is scalable following RESTful practices.

* The routes call controllers.
* The controllers choose operations to execute. No business logic runs in controllers.
* The operations handle the business logic and call database access in repositories.
* The repositories contain database access.

### Testing

This project contains API integration tests and those are achieved using Jest as a test runner.
Tests are run against a test database running in docker.

### Authentication

Authentication is implemented using a jwt access token. When a user logs in, they are issued a token to perform authenticated requests.
