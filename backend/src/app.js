import express from 'express'
import { routes } from './routes.js'
import './database/index.js'
import bodyParser from 'body-parser'

class App {
  constructor() {
    this.server = express()
    this.middlewares()
    this.route()
  }

  middlewares() {
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(express.json())
  }

  route() {
    this.server.use(routes)
  }
}

export const app = new App().server
