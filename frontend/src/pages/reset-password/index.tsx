import { ResetPasswordContainer } from '@/src/styles/pages/reset-password'
import forgotPasswordIllustration from '@/src/assets/illustrations/forgot-password.png'
import Image from 'next/image'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next'
import { useContext } from 'react'
import { AuthContext } from '@/src/contexts/AuthContext'

const resetPasswordFormSchema = z
  .object({
    email: z.string().email('E-mail inválido'),
    token: z.string(),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    passwordConfirmation: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não são iguais',
    path: ['passwordConfirmation'],
  })
  .refine((data) => data.email.trim() === data.email, {
    message: 'Você preencheu espaço na extremidade do email',
    path: ['email'],
  })

type ResetPasswordFormType = z.infer<typeof resetPasswordFormSchema>

interface ResetPasswordProps {
  email: string
  token: string
}

export default function ResetPassword({ email, token }: ResetPasswordProps) {
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setError: setError1,
    formState: { errors: errors1 },
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordFormSchema),
  })

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setError: setError2,
    formState: { errors: errors2 },
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordFormSchema),
  })

  const { resetPassword } = useContext(AuthContext)

  async function onSubmit1(data: ResetPasswordFormType) {
    try {
      await resetPassword(data)
    } catch (err) {
      setError1('email', {
        type: 'manual',
        message:
          'Não foi possível resetar senha. Tente novamente mais tarde, se o erro persistir, entre em contato conosco',
      })
    }
  }

  async function onSubmit2(data: ResetPasswordFormType) {
    try {
      await resetPassword(data)
    } catch (err) {
      setError2('email', {
        type: 'manual',
        message:
          'Não foi possível resetar senha. Tente novamente mais tarde, se o erro persistir, entre em contato conosco',
      })
    }
  }

  return (
    <ResetPasswordContainer errors1={errors1} errors2={errors2}>
      <h3>Criar nova senha</h3>
      <p>
        Por favor, insira sua nova senha nos campos abaixo. Certifique-se de
        escolher uma senha única e segura, com no mínimo 8 caracteres.
      </p>
      <Image
        src={forgotPasswordIllustration}
        alt="Uma ilustração de uma pessoa se autenticando."
      />
      <form onSubmit={handleSubmit1(onSubmit1)}>
        <input {...register1('email')} type="hidden" value={email} />
        <input {...register1('token')} type="hidden" value={token} />
        <label htmlFor="password1">
          <span>Nova senha</span>
          <input {...register1('password')} id="password1" type="password" />
          <small>{errors1.password && errors1.password.message}</small>
        </label>
        <label htmlFor="passwordConfirmation1">
          <span>Confirme sua senha</span>
          <input
            {...register1('passwordConfirmation')}
            id="passwordConfirmation1"
            type="password"
          />
          <small>
            {errors1.passwordConfirmation &&
              errors1.passwordConfirmation.message}
          </small>
        </label>

        <button type="submit" disabled={Object.keys(errors1).length > 0}>
          Resetar Senha
        </button>
        <small>{errors1.email && errors1.email.message}</small>
      </form>
      <div>
        <form onSubmit={handleSubmit2(onSubmit2)}>
          <h3>Criar nova senha</h3>
          <p>
            Por favor, insira sua nova senha nos campos abaixo. Certifique-se de
            escolher uma senha única e segura, com no mínimo 8 caracteres.
          </p>
          <input {...register2('email')} type="hidden" value={email} />
          <input {...register2('token')} type="hidden" value={token} />
          <label htmlFor="password2">
            <span>Nova senha</span>
            <input {...register2('password')} id="password2" type="password" />
            <small>{errors2.password && errors2.password.message}</small>
          </label>
          <label htmlFor="passwordConfirmation2">
            <span>Confirme sua senha</span>
            <input
              {...register2('passwordConfirmation')}
              id="passwordConfirmation2"
              type="password"
            />
            <small>
              {errors2.passwordConfirmation &&
                errors2.passwordConfirmation.message}
            </small>
          </label>

          <button
            type="submit"
            disabled={
              !!(
                errors2.email ||
                errors2.password ||
                errors2.passwordConfirmation
              )
            }
          >
            Resetar Senha
          </button>
          <small>{errors2.email && errors2.email.message}</small>
        </form>
        <Image
          src={forgotPasswordIllustration}
          alt="Uma ilustração de uma pessoa se autenticando."
        />
      </div>
    </ResetPasswordContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { email, token } = ctx.query

  if (email && token) {
    return {
      props: {
        email,
        token,
      },
    }
  }

  return {
    redirect: {
      destination: '/signin',
      permanent: false,
    },
  }
}
