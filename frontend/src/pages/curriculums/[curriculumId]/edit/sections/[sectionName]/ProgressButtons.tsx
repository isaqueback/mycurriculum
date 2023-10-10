import { ProgressButtonsContainer } from '@/src/styles/pages/curriculums/sections/progressButtons'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Dispatch, SetStateAction } from 'react'
import { ProgressLine, progressItems } from './InputsForm'
import router from 'next/router'

interface ProgressButtonsProps {
  progressItems: typeof progressItems
  setProgress: Dispatch<SetStateAction<ProgressLine>>
  currentStep: number
}

export default function ProgressButtons({
  progressItems,
  setProgress,
  currentStep,
}: ProgressButtonsProps) {
  const handleClickNext = () => {
    setProgress((state) => {
      const newProgress = state.map((el, idx) => {
        if (el.step === currentStep) {
          return { step: el.step, hasClickedNext: true, isOpen: el.isOpen }
        }
        return el
      })

      return newProgress
    })

    const currentPath = router.asPath
    const nextSection = currentPath.replace(
      `/${progressItems[currentStep - 1].link}`,
      `/${progressItems[currentStep].link}`,
    )
    router.push(nextSection)
  }

  const handleClickPrevious = () => {
    const currentPath = router.asPath
    if (progressItems[currentStep - 2]) {
      const previousSection = currentPath.replace(
        `/${progressItems[currentStep - 1].link}`,
        `/${progressItems[currentStep - 2].link}`,
      )

      router.push(previousSection)
    }
  }

  return (
    <ProgressButtonsContainer currentStep={currentStep}>
      <button type="button" onClick={handleClickPrevious}>
        <CaretLeft />
        <span>Voltar</span>
      </button>
      <button type="button" onClick={handleClickNext}>
        <span>Avançar</span>
        <CaretRight />
      </button>
    </ProgressButtonsContainer>
  )
}
