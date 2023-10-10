import { ShowMoreButtonContainer } from '@/src/styles/pages/curriculums/showMoreButton'

interface ShowMoreButtonProps {
  showMoreCurriculums?: (search?: string | undefined) => Promise<void>
  searchValue?: string
  showMoreTemplates?: () => Promise<void>
}

export default function ShowMoreButton({
  showMoreCurriculums,
  searchValue,
  showMoreTemplates,
}: ShowMoreButtonProps) {
  return (
    <ShowMoreButtonContainer
      onClick={(e) => {
        e.preventDefault()
        showMoreCurriculums?.(searchValue)
        showMoreTemplates?.()
      }}
    >
      Mostrar mais
    </ShowMoreButtonContainer>
  )
}
