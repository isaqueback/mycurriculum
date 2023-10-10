import Image from 'next/image'
import { TemplatesInputContainer } from '@/src/styles/pages/curriculums/sections/templates/templatesInput'
import ShowMoreButton from '@/src/pages/curriculums/ShowMoreButton'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  CurriculumContext,
  TemplateType,
} from '@/src/contexts/CurriculumContext'
import { UseFormRegister } from 'react-hook-form'
import { CurriculumFormType, ProgressLine, progressItems } from './InputsForm'
import Skeleton from '@mui/material/Skeleton'
import ProgressButtons from './ProgressButtons'

interface TemplatesInputProps {
  tokenUserId: number | Number
  token: string
  register: UseFormRegister<CurriculumFormType>
  progressItems: typeof progressItems
  setProgress: Dispatch<SetStateAction<ProgressLine>>
  currentStep: number
}

const templateAmountPerBlock = 15

export default function TemplatesInput({
  tokenUserId,
  token,
  register,
  progressItems,
  setProgress,
  currentStep,
}: TemplatesInputProps) {
  const [templates, setTemplates] = useState<TemplateType[]>([])
  const [templateBlocksLeft, setTemplateBlocksLeft] = useState(0)
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(true)

  const { getTemplate, countTemplates } = useContext(CurriculumContext)
  const templateAmountRef = useRef(0)
  const currentTemplateBlockRef = useRef(1)

  const showMoreTemplates = async () => {
    if (templateBlocksLeft > 0) {
      try {
        setIsSkeletonVisible(true)
        const gettedTemplates = await getTemplate({
          tokenUserId,
          token,
          page: currentTemplateBlockRef.current + 1,
          amount: templateAmountPerBlock,
        })

        setTemplates((state) => state.concat(gettedTemplates))
        setIsSkeletonVisible(false)
        currentTemplateBlockRef.current += 1

        setTemplateBlocksLeft((state) => state - 1)
      } catch (err) {
        setIsSkeletonVisible(false)
        // Não esquecer de ajeitar esse catch, mostrar um alert ao dar erro ao clicar no botão mostrar mais
        console.log('Error fetching more templates.')
      }
    }
  }

  const renderTemplates = () => {
    const renderedTemplates = templates.map((template, key) => {
      return (
        <div className="template" key={template.id}>
          <input
            type="radio"
            id={`template-${template.id}`}
            {...register('template')}
            value={template.id}
            defaultChecked={key === 0}
          />
          <label htmlFor={`template-${template.id}`}>
            <Image
              width={10000}
              height={450}
              src={template.url}
              alt={`Currículo modelo ${template.id}`}
              loading="eager"
              priority
            />
          </label>
        </div>
      )
    })

    const renderedSkeletons = isSkeletonVisible
      ? Array.from({ length: templateAmountPerBlock }).map((_, idx) => {
          return <Skeleton className="skeleton" key={idx} variant="rounded" />
        })
      : []

    return [renderedTemplates, renderedSkeletons]
  }

  useEffect(() => {
    async function fetchTemplates() {
      const fetchedTemplates = await getTemplate({
        tokenUserId,
        token,
        amount: templateAmountPerBlock,
        page: 1,
      })

      setTemplates(fetchedTemplates)
      setIsSkeletonVisible(false)

      const length = await countTemplates({
        userId: tokenUserId,
        token,
      })
      templateAmountRef.current = length

      const remainingTemplateBlocks = Math.ceil(
        (length - templateAmountPerBlock) / templateAmountPerBlock,
      )

      setTemplateBlocksLeft(
        remainingTemplateBlocks <= 0 ? 0 : remainingTemplateBlocks,
      )
    }

    if (templateAmountRef.current === 0) {
      fetchTemplates()
    }
  }, [countTemplates, getTemplate, token, tokenUserId])

  return (
    <TemplatesInputContainer>
      <div className="templates">{renderTemplates()}</div>
      {!!templateBlocksLeft && (
        <ShowMoreButton showMoreTemplates={showMoreTemplates} />
      )}
      <ProgressButtons
        currentStep={currentStep}
        progressItems={progressItems}
        setProgress={setProgress}
      />
    </TemplatesInputContainer>
  )
}
