import {
  Box,
  ForgotPasswordContainer,
} from '@/src/styles/pages/signin/forgotPassword'
import { CloseButton } from '@/src/styles/pages/signin/signUp'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from '@mui/material/Modal'
import Slide from '@mui/material/Slide'
import Zoom from '@mui/material/Zoom'
import { useContext, useRef, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import forgotPasswordIllustration from '@/src/assets/illustrations/forgot-password.png'
import emailSentIllustration from '@/src/assets/illustrations/email-sent.gif'
import { AuthContext } from '@/src/contexts/AuthContext'

const forgotPasswordFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordFormSchema),
  })
  const { forgotPassword } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false)
  const [countEmailResubmitted, setCountEmailResubmitted] = useState(0)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setCountEmailResubmitted(0)
    setOpen(false)
    setIsEmailSubmitted(false)
  }

  const boxRef = useRef(null)

  function onSubmit(data?: ForgotPasswordFormType) {
    if (data) {
      forgotPassword(data)
    } else {
      const data = getValues()
      forgotPassword(data)
      setCountEmailResubmitted((state) => state + 1)
    }
  }

  function handleSlideChange() {
    Object.keys(errors).length === 0 && setIsEmailSubmitted((state) => !state)
  }

  function renderEmailSmall(count: number) {
    return Array.from({ length: count }, (_, k) => (
      <small key={k}>E-mail reenviado</small>
    ))
  }

  return (
    <ForgotPasswordContainer>
      <span onClick={handleOpen}>Esqueceu a senha?</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Zoom in={open}>
          <Box ref={boxRef} email={errors.email}>
            <CloseButton onClick={handleClose}>
              <span></span>
            </CloseButton>
            <Slide
              direction="right"
              container={boxRef.current}
              in={!isEmailSubmitted}
            >
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <h3 id="modal-modal-title">Esqueci a senha</h3>
                <p id="modal-modal-description">
                  Esqueceu a senha da sua conta? Não se preocupe! Siga as
                  instruções abaixo para redefinir a sua senha e recuperar o
                  acesso
                </p>
                <Image
                  src={forgotPasswordIllustration}
                  alt="Ilustração de um usuário recuperando a senha"
                />
                <label htmlFor="email">
                  <span>E-mail</span>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    placeholder="Digite seu e-mail"
                  />
                </label>
                <button
                  type="submit"
                  disabled={!!errors.email}
                  onClick={() => handleSlideChange()}
                >
                  Recuperar senha
                </button>
                {errors.email && <small>Informe seu e-mail</small>}
              </form>
            </Slide>
            <Slide
              direction="left"
              container={boxRef.current}
              in={isEmailSubmitted}
            >
              <div className="submitted-email-container">
                <div>
                  <Image
                    src={emailSentIllustration}
                    width={150}
                    alt="Ilustração de um email sendo enviado."
                  />
                  <h3>Verifique seu e-mail</h3>
                  <p>
                    Se sua conta existir, então um e-mail será enviado para o
                    seu endereço de e-mail com as instruções para recuperar sua
                    senha. Por favor, verifique sua caixa de entrada principal
                    ou a pasta de spam para mais detalhes.
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
    </ForgotPasswordContainer>
  )
}
