import express, { Application } from 'express'
import { routes } from './routes'

class App {
    server: Application

    constructor() {
        this.server = express()
        this.middlewares()
        this.route()
    }

    middlewares() {
        this.server.use(express.json())
        this.server.use(express.urlencoded({ extended: true }))
    }

    route() {
        this.server.use(routes)
    }
}

export const app = new App().server