import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/users', (req: Request, res: Response) => {
    res.send('Todos os usuários cadastrados.')
})

export { routes }