import { Router } from 'express'
import upload from './config/multer.js'

import { users } from './app/controllers/UsersController.js'
import { sessions } from './app/controllers/SessionsController.js'
import { files } from './app/controllers/FilesController.js'
import { curriculums } from './app/controllers/CurriculumsController.js'

import { authUsersIndex } from './app/middlewares/authUsers/index.js'
import { authUsersShow } from './app/middlewares/authUsers/show.js'
import { authUsersUpdate } from './app/middlewares/authUsers/update.js'
import { authUsersResetPassword } from './app/middlewares/authUsers/resetPassword.js'
import { authUsersDestroy } from './app/middlewares/authUsers/destroy.js'
import { authFilesCreate } from './app/middlewares/authFiles/create.js'
import { authFilesIndex } from './app/middlewares/authFiles/index.js'
import { authFilesShow } from './app/middlewares/authFiles/show.js'
import { authFilesDestroy } from './app/middlewares/authFiles/destroy.js'
import { authFilesUpdate } from './app/middlewares/authFiles/update.js'
import { authCurriculumsIndex } from './app/middlewares/authCurriculums/index.js'
import { authCurriculumsShow } from './app/middlewares/authCurriculums/show.js'
import { authCurriculumsCreate } from './app/middlewares/authCurriculums/create.js'
import { authCurriculumsUpdate } from './app/middlewares/authCurriculums/update.js'
import { authCurriculumsDestroy } from './app/middlewares/authCurriculums/destroy.js'

const routes = new Router()

// Sessions
routes.get('/sessions/:token', sessions.show)
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

// Files
routes.get('/users/:userId/files/:id', authFilesIndex, files.index)
routes.get('/users/:userId/files', authFilesShow, files.show)
// Verificar se eu estou enviando um arquivo, posso estar enviando um json no corpo da requisição ao invés de arquivo
routes.post('/users/:userId/files/:folderName', authFilesCreate, upload.single('file'), files.create)
routes.put('/users/:userId/files/:id', authFilesUpdate, files.update)
routes.delete('/users/:userId/files/:id', authFilesDestroy, files.destroy)

// Curriculums
routes.get('/users/:userId/curriculums', authCurriculumsIndex, curriculums.index)
routes.get('/users/:userId/curriculums/:id', authCurriculumsShow, curriculums.show)
routes.post('/users/:userId/curriculums', authCurriculumsCreate, curriculums.create)
routes.put('/users/:userId/curriculums/:id', authCurriculumsUpdate, curriculums.update)
routes.delete('/users/:userId/curriculums/:id', authCurriculumsDestroy, curriculums.destroy)

export { routes }