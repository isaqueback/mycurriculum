import { PersonalDataContainer } from '@/src/styles/pages/curriculums/sections/personalData/personalDataInput'
import { Controller, UseFormRegister, Control } from 'react-hook-form'
import { CurriculumFormType, ProgressLine, progressItems } from './InputsForm'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  DeviceMobile,
  EnvelopeSimple,
  FacebookLogo,
  Flag,
  GithubLogo,
  IdentificationCard,
  LinkedinLogo,
  MapPin,
  SteeringWheel,
  DribbbleLogo,
  Phone,
  YoutubeLogo,
} from '@phosphor-icons/react'

import DatePicker from 'react-date-picker'

import { Value } from 'react-date-picker/dist/cjs/shared/types'
import ProgressButtons from './ProgressButtons'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

interface PersonalDataInputProps {
  register: UseFormRegister<CurriculumFormType>
  setProgress: Dispatch<SetStateAction<ProgressLine>>
  currentStep: number
  control: Control<CurriculumFormType>
  progressItems: typeof progressItems
}

export default function PersonalDataInput({
  currentStep,
  setProgress,
  register,
  control,
}: PersonalDataInputProps) {
  const [dateOfBirth, setDateOfBirth] = useState<Value | null>(null)

  return (
    <PersonalDataContainer isDateOfBirth={!!dateOfBirth}>
      <input type="checkbox" id="detail-one" defaultChecked={true} />
      <details open>
        <summary>
          <label htmlFor="detail-one">Informações úteis</label>
        </summary>
        <p>Alguns campos você pode deixar vazio, caso queira.</p>
        <div>
          <label htmlFor="name">
            <span>Nome</span>
            <div>
              <input
                id="name"
                {...register('name')}
                type="text"
                placeholder="Por exemplo: Naruto Uzumaki"
              />
              <IdentificationCard weight="thin" />
            </div>
          </label>
          <label htmlFor="email">
            <span>E-mail</span>
            <div>
              <input
                id="email"
                {...register('email')}
                type="text"
                placeholder="Por exemplo: fulano@gmail.com"
              />
              <EnvelopeSimple weight="thin" />
            </div>
          </label>
          <label htmlFor="cellphone">
            <span>Celular</span>
            <div>
              <input
                id="cellphone"
                {...register('cell_phone')}
                type="text"
                placeholder="Por exemplo: +55 69 9 1212-1212"
              />
              <DeviceMobile weight="thin" />
            </div>
          </label>
          <label htmlFor="address">
            <span>Endereço</span>
            <div>
              <input
                id="address"
                {...register('address')}
                type="text"
                placeholder="Por exemplo: Porto Velho/RO, Brasil"
              />
              <MapPin weight="thin" />
            </div>
          </label>
          <label htmlFor="nacionality">
            <span>Nacionalidade</span>
            <div>
              <input
                id="nacionality"
                {...register('nacionality')}
                type="text"
                placeholder="Por exemplo: Brasileira"
              />
              <Flag weight="thin" />
            </div>
          </label>
          <div className="date-of-birth">
            <span>Data de nascimento</span>
            <Controller
              name="date_of_birth"
              control={control}
              render={({ field }) => (
                <DatePicker
                  format="dd-MM-y"
                  locale="pt-BR"
                  onChange={(date) => {
                    field.onChange(date)
                    setDateOfBirth(date)
                  }}
                  value={dateOfBirth}
                />
              )}
            />
          </div>
          <label htmlFor="driver-license">
            <span>Carteira de motorista</span>
            <div>
              <input
                id="driver-license"
                {...register('driver_license')}
                type="text"
                placeholder="Por exemplo: CNH AB"
              />
              <SteeringWheel weight="thin" />
            </div>
          </label>
        </div>
      </details>
      <input type="checkbox" id="detail-two" />
      <details open>
        <summary>
          <label htmlFor="detail-two">
            Informações que podem ser úteis a depender do cargo
          </label>
        </summary>
        <p>Todos os campos você pode deixar vazio, caso queira.</p>
        <div>
          <label htmlFor="telephone">
            <span>Telefone</span>
            <div>
              <input
                id="telephone"
                {...register('telephone')}
                type="text"
                placeholder="Por exemplo: +55 69 3232-3232"
              />
              <Phone weight="thin" />
            </div>
          </label>
          <label htmlFor="github">
            <span>GitHub</span>
            <div>
              <input
                id="github"
                {...register('github')}
                type="text"
                placeholder="Por exemplo: https://github.com/isaqueback"
              />
              <GithubLogo weight="thin" />
            </div>
          </label>
          <label htmlFor="linkedin">
            <span>Linkedin</span>
            <div>
              <input
                id="linkedin"
                {...register('linkedin')}
                type="text"
                placeholder="Por exemplo: https://linkedin.com/in/isaqueback"
              />
              <LinkedinLogo weight="thin" />
            </div>
          </label>
          <label htmlFor="facebook">
            <span>Facebook</span>
            <div>
              <input
                id="facebook"
                {...register('facebook')}
                type="text"
                placeholder="Por exemplo: https://facebook.com/seuFacebook"
              />
              <FacebookLogo weight="thin" />
            </div>
          </label>
          <label htmlFor="dribbble">
            <span>Dribbble</span>
            <div>
              <DribbbleLogo weight="thin" />
              <input
                id="dribbble"
                {...register('dribbble')}
                type="text"
                placeholder="Por exemplo: https://dribbble.com/seuDribbble"
              />
            </div>
          </label>
          <label htmlFor="youtube">
            <span>Youtube</span>
            <div>
              <input
                id="youtube"
                {...register('youtube')}
                type="text"
                placeholder="Por exemplo: https://youtube.com/@seuCanalDoYoutube"
              />
              <YoutubeLogo weight="thin" />
            </div>
          </label>
        </div>
      </details>
      <ProgressButtons
        progressItems={progressItems}
        setProgress={setProgress}
        currentStep={currentStep}
      />
    </PersonalDataContainer>
  )
}
