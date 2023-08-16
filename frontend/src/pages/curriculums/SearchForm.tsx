import Image from 'next/image'
import { SearchFormContainer } from '@/src/styles/pages/curriculums/searchFormContainer'
import magnifyingGlassIllustration from '@/src/assets/illustrations/magnifying-glass.svg'
import { Controller } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Control } from 'react-hook-form/dist/types'

interface SearchFormProps {
  searchValue: string | undefined
  searchHovered: boolean
  setSearchHovered: Dispatch<SetStateAction<boolean>>
  setCurrentCurriculumBlock: Dispatch<SetStateAction<number>>
  control: Control<{ search: string }, any>
}

export default function SearchForm({
  searchValue,
  searchHovered,
  setSearchHovered,
  setCurrentCurriculumBlock,
  control,
}: SearchFormProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearchHoverEnter = () => {
    setSearchHovered(true)
  }
  const handleSearchHoverLeave = () => {
    if (!searchValue && !isSearchFocused) setSearchHovered(false)
  }

  const handleSearchClickEnter = () => {
    setIsSearchFocused(true)
  }

  const handleSearchClickLeave = () => {
    if (!searchValue) {
      setIsSearchFocused(false)
      setSearchHovered(false)
    }
  }

  useEffect(() => {
    setCurrentCurriculumBlock(1)
  }, [searchValue, setCurrentCurriculumBlock])

  return (
    <SearchFormContainer searchHovered={searchHovered}>
      <label htmlFor="search">
        <svg
          onMouseEnter={handleSearchHoverEnter}
          onMouseLeave={handleSearchHoverLeave}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      </label>
      <Image
        src={magnifyingGlassIllustration}
        alt="Ilustração de uma lupa"
        onMouseEnter={handleSearchHoverEnter}
      />
      <Controller
        name="search"
        control={control}
        defaultValue=""
        render={({ field }) => {
          return (
            <input
              id="search"
              type="text"
              {...field}
              placeholder="Procurar currículo"
              onMouseEnter={handleSearchHoverEnter}
              onMouseLeave={handleSearchHoverLeave}
              onClick={handleSearchClickEnter}
              onBlur={handleSearchClickLeave}
            />
          )
        }}
      />
    </SearchFormContainer>
  )
}
