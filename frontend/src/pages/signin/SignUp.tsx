import {
  SignUpContainer,
  Box,
  CloseButton,
} from '@/src/styles/pages/signin/signUp'
import Modal from '@mui/material/Modal'
import Zoom from '@mui/material/Zoom'
import Slide from '@mui/material/Slide'
import { CircularProgress } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import emailSentIllustration from '@/src/assets/illustrations/email-sent.gif'
import { AuthContext } from '@/src/contexts/AuthContext'

const registerFormSchema = z
  .object({
    fullname: z.string().min(1, 'O nome completo deve ser preenchido'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    passwordConfirmation: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não são iguais',
    path: ['passwordConfirmation'],
  })
  .refine((data) => data.fullname.trim().length > 0, {
    message: 'O nome não pode ser compostos apenas por espaços',
    path: ['fullname'],
  })
  .refine((data) => data.fullname.trim() === data.fullname, {
    message: 'Você preencheu espaço na extremidade do nome',
    path: ['fullname'],
  })
  .refine((data) => data.email.trim() === data.email, {
    message: 'Você preencheu espaço na extremidade do email',
    path: ['email'],
  })

type RegisterFormType = z.infer<typeof registerFormSchema>

export default function SignUp() {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  })
  const {
    signUp,
    isNotSuccessfulySubmitted,
    setIsNotSuccessfullySubmitted,
    error,
    setError,
  } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState<string | null>(null)
  const [countEmailResubmitted, setCountEmailResubmitted] = useState(0)
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)

  const boxRef = useRef(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setIsNotSuccessfullySubmitted(true)
    reset()
    setCountEmailResubmitted(0)
  }

  const isError = !!(
    error ||
    errors.fullname ||
    errors.email ||
    errors.password ||
    errors.passwordConfirmation
  )

  const emailInput = watch('email')

  useEffect(() => {
    if (emailInput === emailSubmitted) {
      if (error === 'Este usuário já está em uso') {
        console.log(error)
        setError('Este usuário já está em uso')
      }
    } else {
      if (error === 'Este usuário já está em uso') {
        setError(null)
      }
    }
  }, [emailInput, emailSubmitted, error, setError])

  async function onSubmit(data?: RegisterFormType) {
    if (data) {
      await setIsCreatingAccount(true)
      console.log(isCreatingAccount)
      setEmailSubmitted(data.email)
      await signUp(data)
    } else {
      setCountEmailResubmitted((state) => state + 1)

      const data = getValues()
      signUp(data)
    }

    setIsCreatingAccount(false)
    console.log(isCreatingAccount)
  }

  function renderEmailSmall(count: number) {
    return Array.from({ length: count }, (_, k) => (
      <small key={k}>E-mail reenviado</small>
    ))
  }

  return (
    <SignUpContainer>
      <span onClick={handleOpen}>Não tem uma conta?</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Zoom in={open}>
          <Box
            fullname={errors.fullname}
            email={errors.email}
            password={errors.password}
            passwordConfirmation={errors.passwordConfirmation}
            isError={isError}
            isCreatingAccount={isCreatingAccount}
            ref={boxRef}
          >
            <CloseButton onClick={handleClose}>
              <span></span>
            </CloseButton>
            <Slide
              direction="right"
              container={boxRef.current}
              in={isNotSuccessfulySubmitted}
            >
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <h3>Criar conta</h3>

                <p>Crie sua conta preenchendo os campos abaixo</p>

                <label htmlFor="fullname">
                  <span>Nome completo*</span>
                  <input {...register('fullname')} type="text" id="fullname" />
                  <small>{errors.fullname && errors.fullname.message}</small>
                </label>

                <label htmlFor="email">
                  <span>E-mail*</span>
                  <input {...register('email')} type="email" id="email" />
                  <small>
                    {error === 'Este usuário já está em uso' && error}
                    {errors.email && errors.email.message}
                  </small>
                </label>

                <label htmlFor="password">
                  <span>Senha*</span>
                  <input
                    {...register('password')}
                    type="password"
                    id="password"
                  />
                  <small>{errors.password && errors.password.message}</small>
                </label>

                <label htmlFor="password-confirmation">
                  <span>Confirme sua senha*</span>
                  <input
                    {...register('passwordConfirmation')}
                    type="password"
                    id="password-confirmation"
                  />
                  <small>
                    {errors.passwordConfirmation &&
                      errors.passwordConfirmation.message}
                  </small>
                </label>

                <button type="submit" disabled={isError || isCreatingAccount}>
                  <CircularProgress />
                  {!isCreatingAccount && 'Continuar'}
                </button>
                <small>
                  {error !== 'Este usuário já está em uso' && error}
                </small>
              </form>
            </Slide>
            <Slide
              direction="left"
              container={boxRef.current}
              in={!isNotSuccessfulySubmitted}
              style={{ display: isNotSuccessfulySubmitted ? 'none' : 'flex' }}
            >
              <div className="submitted-email-container">
                <div>
                  <Image
                    src={emailSentIllustration}
                    width={150}
                    alt="Ilustração de um email sendo enviado."
                  />
                  <h3>Confirme seu e-mail</h3>
                  <p>
                    Por favor, verifique o seu e-mail para confirmar a criação
                    da sua conta. Um link de confirmação foi enviado para o seu
                    endereço de e-mail.
                  </p>
                </div>
                <div>
                  <button onClick={() => onSubmit()}>Reenviar Email</button>
                  {renderEmailSmall(countEmailResubmitted)}
                </div>
              </div>
            </Slide>
          </Box>
        </Zoom>
      </Modal>
    </SignUpContainer>
  )
}
