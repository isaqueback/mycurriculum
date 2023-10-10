import { AbilitiesContainer } from '@/src/styles/pages/curriculums/sections/abilities/abilitiesInput'
import ProgressButtons from '../ProgressButtons'
import { CurriculumFormType, ProgressLine, progressItems } from '../InputsForm'
import { UseFormSetValue } from 'react-hook-form'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import DragDropAbilities from './DragDropAbilities'
import { Star, Warning } from '@phosphor-icons/react/dist/ssr'

interface AbilitiesProps {
  setProgress: Dispatch<SetStateAction<ProgressLine>>
  currentStep: number
  progressItems: typeof progressItems
  setAbilitiesValue: UseFormSetValue<CurriculumFormType>
}

export interface Ability {
  id: string
  content: string
}

export default function AbilitiesInput({
  progressItems,
  currentStep,
  setProgress,
  setAbilitiesValue,
}: AbilitiesProps) {
  const [abilities, setAbilities] = useState([] as Ability[])
  const [isEmptyInputWarning, setIsEmptyInputWarning] = useState(false)

  const abilityInputRef = useRef<HTMLInputElement>(null)

  const handleAddAbility = () => {
    if (abilityInputRef.current) {
      const inputValue = abilityInputRef.current.value
      const newId = new Date().getMilliseconds().toString()

      if (inputValue.length > 0) {
        const newAbility = {
          id: `ability-${newId}`,
          content: inputValue,
        }

        setAbilities((state) => {
          return [...state, newAbility]
        })

        setIsEmptyInputWarning(false)

        const abilitiesContents = abilities.map((ability) => ability.content)
        setAbilitiesValue('abilities', abilitiesContents)

        abilityInputRef.current.value = ''
      } else {
        setIsEmptyInputWarning(true)
      }
    }
  }

  return (
    <AbilitiesContainer>
      <div>
        <label htmlFor="name">
          <span>Habilidade</span>
          <div>
            <input
              id="ability"
              type="text"
              placeholder="Por exemplo: Trabalho em equipe"
              ref={abilityInputRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddAbility()
                }
              }}
            />
            <Star weight="thin" />
          </div>
        </label>
        <button type="button" onClick={handleAddAbility}>
          Adicionar
        </button>
      </div>
      <DragDropAbilities
        abilities={abilities}
        setAbilities={setAbilities}
        setAbilitiesValue={setAbilitiesValue}
      />
      <div className="warnings">
        {isEmptyInputWarning && (
          <div>
            <Warning />
            <p>Não tente adicionar uma habilidade sem texto.</p>
          </div>
        )}
        {abilities.length > 10 && (
          <div>
            <Warning />
            <p>Nós recomendamos adicionar no máximo 10 habilidades.</p>
          </div>
        )}
      </div>
      <ProgressButtons
        progressItems={progressItems}
        setProgress={setProgress}
        currentStep={currentStep}
      />
    </AbilitiesContainer>
  )
}
