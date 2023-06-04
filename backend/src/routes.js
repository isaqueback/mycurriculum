import { Router } from 'express'
import { users } from './app/controllers/UsersController.js'
import { sessions } from './app/controllers/SessionsController.js'
import { addressBooks } from './app/controllers/AddressBooksController.js'
import { authUsersIndex } from './app/middlewares/authUsers/index.js'
import { authUsersShow } from './app/middlewares/authUsers/show.js'
import { authUsersUpdate } from './app/middlewares/authUsers/update.js'
import { authUsersResetPassword } from './app/middlewares/authUsers/resetPassword.js'
import { authUsersDestroy } from './app/middlewares/authUsers/destroy.js'
import { authAddressBooksIndex } from './app/middlewares/authBookAdresses/index.js'
import { authAddressBooksShow } from './app/middlewares/authBookAdresses/show.js'
import { authAddressBooksCreate } from './app/middlewares/authBookAdresses/create.js'
import { authAddressBooksUpdate } from './app/middlewares/authBookAdresses/update.js'
import { authAddressBooksDestroy } from './app/middlewares/authBookAdresses/destroy.js'


const routes = Router()

// Sessions
routes.post('/sessions', sessions.create)

// Users
routes.get('/users', authUsersIndex, users.index)
routes.get('/users/:id', authUsersShow, users.show)
routes.post('/users', users.create)
routes.get('/users/verify/:token', users.verifyCreation)
routes.put('/users/:id', authUsersUpdate, users.update)
routes.post('/users/forgot-password', users.forgotPassword)
routes.post('/users/reset-password/', authUsersResetPassword, users.resetPassword)
routes.delete('/users/:id', authUsersDestroy, users.destroy)

// Address Books
routes.get('/users/:userId/address-books', authAddressBooksIndex, addressBooks.index)
routes.get('/users/:userId/address-books/:id', authAddressBooksShow, addressBooks.show)
routes.post('/users/:userId/address-books', authAddressBooksCreate, addressBooks.create)
routes.put('/users/:userId/address-books/:id', authAddressBooksUpdate, addressBooks.update)
routes.delete('/users/:userId/address-books/:id', authAddressBooksDestroy, addressBooks.destroy)

export { routes }