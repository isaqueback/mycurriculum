import express from 'express'
import { routes } from './routes.js'
import './database/index.js'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class App {
  constructor() {
    this.server = express()
    this.middlewares()
    this.route()
  }

  middlewares() {
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(express.json())
    this.server.use(cors())
    // Não esquecer de fazer tratamento dos restantes dos erros aqui
    // por exemplo: se eu passar um number ao invés de json em algum post, vai dar erro
    // Obs.: assistir curso dev samurai na parte de Tratamentos de erros
  }

  route() {
    this.server.use(routes)
    this.server.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')))
  }
}

export const app = new App().server
