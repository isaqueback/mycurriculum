import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { InputsFormContainer } from '@/src/styles/pages/curriculums/inputsForm'
import Link from 'next/link'
import TemplatesInput from './TemplatesInput'
import PersonalDataInput from './PersonalDataInput'
import AbilitiesInput from './abilitiesInput/AbilitiesInput'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useDraggable } from 'react-use-draggable-scroll'

const dateValidationSchema = {
  entry_date_day: z.coerce
    .number()
    .int()
    .positive('Não existe dia negativo.')
    .min(1, 'O dia começa no 1.')
    .max(31, 'O dia termina no máximo no 31'),
  entry_date_month: z.coerce
    .number()
    .int()
    .positive('Não existe mês negativo.')
    .min(1, 'O mês começa no 1.')
    .max(12, 'O mês acaba no 12.'),
  entry_date_year: z.coerce
    .number()
    .int()
    .positive('Não existe ano negativo.')
    .min(1900, 'Você não começou a trabalhar nesse ano.'),
  exit_date_day: z.coerce
    .number()
    .int()
    .positive('Não existe dia negativo.')
    .min(1, 'O dia começa no 1.')
    .max(31, 'O dia termina no máximo no 31'),
  exit_date_month: z.coerce
    .number()
    .int()
    .positive('Não existe mês negativo.')
    .min(1, 'O mês começa no 1.')
    .max(12, 'O mês acaba no 12.'),
  exit_date_year: z.coerce
    .number()
    .int()
    .positive('Não existe ano negativo.')
    .min(1900, 'Você não terminou de trabalhar nesse ano.'),
}

const curriculumFormSchema = z.object({
  name: z.string().min(1, 'O nome deve ter no mínimo 1 caractere.'),
  role: z
    .string()
    .min(1, 'O cargo deve ter no mínimo 1 caractere.')
    .max(80, 'O cargo deve ter no máximo 80 caracteres.'),
  date_of_birth: z.date().refine(
    (val) => {
      return val <= new Date()
    },
    { message: 'Você não nasceu nesse ano.' },
  ),
  gender: z.union([z.literal('male'), z.literal('female'), z.literal('other')]),
  cell_phone: z.coerce
    .string()
    .min(1, 'O número de celular deve ter no mínimo 1 caractere.')
    .max(20, 'O número de celular deve ter no máximo 20 caracteres.'),
  telephone: z.coerce
    .number()
    .int('O número do telefone deve ser um número inteiro.')
    .positive('O número do telefone não é um número negativo.')
    .min(1, 'O número de telefone deve ter no mínimo 1 caractere.')
    .max(20, 'O número de telefone deve ter no máximo 20 caracteres.'),
  address: z.string().min(1, 'O endereço deve ter pelo menos 1 caractere.'),
  nacionality: z
    .string()
    .min(1, 'A nacionalidade deve ter pelo menos 1 caractere.')
    .max(40, 'A nacionalidade deve ter no máximo 40 caracteres.'),
  email: z.string().min(1, 'O e-mail deve ter pelo menos 1 caractere.'),
  linkedin: z.string().min(1, 'O linkedin deve ter pelo menos 1 caractere.'),
  x: z.string().min(1, 'O x deve ter pelo menos 1 caractere.'),
  facebook: z.string().min(1, 'O Facebook deve ter pelo menos 1 caractere.'),
  github: z.string().min(1, 'O GitHub deve ter pelo menos 1 caractere.'),
  dribbble: z.string().min(1, 'O dribbble deve ter pelo menos 1 caractere.'),
  youtube: z.string().min(1, 'O Youtube deve ter pelo menos 1 caractere.'),
  driver_license: z
    .string()
    .min(1, 'A carteira de motorista deve ter pelo menos 1 caractere.'),
  custom_personal_datum_1: z
    .object({
      field: z
        .string()
        .min(
          1,
          'O dado pessoal customizado deve ter o field com pelo menos 1 caractere.',
        )
        .nonempty(
          'Não pode querer passar um dado pessoal customizado e deixar field vazio.',
        ),
      value: z
        .string()
        .min(
          1,
          'O dado pessoal customizado deve ter o seu valor com pelo menos 1 caractere.',
        )
        .nonempty(
          'Não pode querer passar um dado pessoal customizado e deixar value vazio.',
        ),
    })
    .strict()
    .optional(),
  custom_personal_datum_2: z
    .object({
      field: z
        .string()
        .min(
          1,
          'O dado pessoal customizado deve ter o field com pelo menos 1 caractere.',
        )
        .nonempty(
          'Não pode querer passar um dado pessoal customizado e deixar field vazio.',
        ),
      value: z
        .string()
        .min(
          1,
          'O dado pessoal customizado deve ter o seu valor com pelo menos 1 caractere.',
        )
        .nonempty(
          'Não pode querer passar um dado pessoal customizado e deixar value vazio.',
        ),
    })
    .strict()
    .optional(),
  abilities: z
    .array(
      z.string().max(50, 'Uma habilidade deve ter no máximo 50 caracteres.'),
    )
    .max(15, 'Deve-se ter no máximo 15 habilidades.'),
  languages: z
    .array(
      z
        .object({
          language: z
            .string()
            .min(1, 'O idioma deve ter pelo menos 1 caractere.')
            .nonempty('Não pode querer passar um idioma e deixá-lo vazio.'),
          level: z
            .string()
            .min(1, 'O nível deve ter pelo menos 1 caractere.')
            .nonempty(
              'Não pode querer passar um idioma e deixar seu nível vazio.',
            ),
        })
        .strict(),
    )
    .optional(),
  about_me: z
    .string()
    .max(400, 'O sobre mim deve ter no máximo 400 caracteres.'),
  professional_experiences: z.array(
    z
      .object({
        role: z
          .string()
          .min(1, 'O nome do cargo deve ter no mínimo 1 caractere.')
          .nonempty('Toda experiência profissional deve ter o nome do cargo.'),
        company: z
          .string()
          .min(1, 'O nome da empresa deve ter no mínimo 1 caractere.')
          .nonempty(
            'Toda experiência profissional deve ter o nome da empresa.',
          ),
        address: z
          .string()
          .min(1, 'O endereço da empresa deve ter no mínimo 1 caractere.')
          .optional(),
        description: z
          .string()
          .min(1, 'A descrição sobre o cargo deve ter no mínimo 1 caractere.')
          .optional(),
        ...dateValidationSchema,
      })
      .strict()
      .refine((data) => data.exit_date_year >= data.entry_date_year, {
        message: 'O ano de saída deve ser maior ou igual ao de entrada',
      })
      .refine((data) => data.exit_date_month >= data.entry_date_month, {
        message:
          'Como os anos são iguais, o mês de saída deve ser maior ou igual ao de entrada.',
      })
      .refine((data) => data.exit_date_day >= data.entry_date_day),
  ),
  // educations: Sequelize.JSONB,
  // custom_topic_1: Sequelize.JSONB,
  // custom_topic_2: Sequelize.JSONB,

  template: z.coerce.number(),
})

export type CurriculumFormType = z.infer<typeof curriculumFormSchema>

export type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface ProgressItem {
  step: Step
  hasClickedNext: boolean
  isOpen: boolean
}

export type ProgressLine = Array<ProgressItem>

export const progressItems: Array<{ step: Step; label: string; link: string }> =
  [
    { step: 1, label: 'Modelos', link: 'templates' },
    { step: 2, label: 'Dados Pessoais', link: 'personal-data' },
    { step: 3, label: 'Habilidades', link: 'abilities' },
    { step: 4, label: 'Idiomas', link: 'languages' },
    { step: 5, label: 'Sobre mim', link: 'about-me' },
    {
      step: 6,
      label: 'Experiências profissionais',
      link: 'professional-experiences',
    },
    { step: 7, label: 'Educação', link: 'educations' },
    { step: 8, label: 'Tópicos personalizados', link: 'custom-topics' },
  ]

interface InputsFormProps {
  readonly tokenUserId: number | Number
  readonly token: string
  readonly curriculumId: number
}

export default function InputsForm({
  tokenUserId,
  token,
  curriculumId,
}: InputsFormProps) {
  const route = useRouter()
  const sectionName =
    typeof route.query.sectionName === 'string' ? route.query.sectionName : ''

  const [progress, setProgress] = useState(
    progressItems.map((item) => ({
      step: item.step,
      hasClickedNext: false,
      isOpen: item.link === sectionName,
    })),
  )

  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const progressList =
    useRef<HTMLUListElement>() as MutableRefObject<HTMLUListElement>
  const { events } = useDraggable(progressList, {
    applyRubberBandEffect: true,
    decayRate: 0.99,
  })

  const { register, handleSubmit, control, setValue } =
    useForm<CurriculumFormType>({
      resolver: zodResolver(curriculumFormSchema),
    })

  const onSubmit: SubmitHandler<CurriculumFormType> = (data, e) => {
    e?.preventDefault()
    console.log(data.date_of_birth)
  }

  // Retirar esse onError depois que eu terminar o formulário
  const onError: SubmitErrorHandler<CurriculumFormType> = (errors) => {
    console.log(errors)
  }

  function calculateScrollOffset(sectionId: string) {
    const sectionElement = document.getElementById(sectionId)

    if (sectionElement) {
      const offsetLeft = sectionElement.getBoundingClientRect().left
      const centerOffset =
        offsetLeft - (window.innerWidth - sectionElement.offsetWidth) / 2

      return centerOffset
    }

    return 0
  }

  useEffect(() => {
    setProgress((state) => {
      const updatedProgress = state.map((el, idx) => {
        const isOpen = progressItems[idx].link === sectionName

        const revisedProgress = {
          step: el.step,
          hasClickedNext: el.hasClickedNext,
          isOpen,
        }

        return revisedProgress
      })

      return updatedProgress
    })

    const centerOffset = calculateScrollOffset(sectionName)

    progressList.current.scrollLeft += centerOffset

    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [sectionName, isTouchDevice])

  return (
    <InputsFormContainer
      onSubmit={handleSubmit(onSubmit, onError)}
      progress={progress}
      isTouchDevice={isTouchDevice}
    >
      <nav className="progress">
        <ul className="progress-list" ref={progressList} {...events}>
          {progressItems.map((item) => (
            <li
              className={`progress-${item.step}`}
              key={item.step}
              id={item.link}
            >
              <Link
                href={`/curriculums/${curriculumId}/edit/sections/${item.link}`}
                draggable={false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                </svg>
                <span className="step">{item.step}</span>
                <span>{item.label}</span>
              </Link>
              <hr />
            </li>
          ))}
        </ul>
      </nav>
      <div className="inputs">
        {sectionName === 'templates' && (
          <TemplatesInput
            tokenUserId={tokenUserId}
            token={token}
            register={register}
            progressItems={progressItems}
            setProgress={setProgress}
            currentStep={1}
          />
        )}
        {sectionName === 'personal-data' && (
          <PersonalDataInput
            register={register}
            progressItems={progressItems}
            setProgress={setProgress}
            currentStep={2}
            control={control}
          />
        )}
        {sectionName === 'abilities' && (
          <AbilitiesInput
            progressItems={progressItems}
            currentStep={3}
            setProgress={setProgress}
            setAbilitiesValue={setValue}
          />
        )}
      </div>
    </InputsFormContainer>
  )
}
