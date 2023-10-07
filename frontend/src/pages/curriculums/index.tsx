import { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { CurriculumsContainer } from '@/src/styles/pages/curriculums'
import SearchForm from './SearchForm'
import Curriculum from './Curriculum'
import CreateCurriculumButton from './CreateCurriculumButton'
import {
  CurriculumContext,
  CurriculumType,
} from '@/src/contexts/CurriculumContext'
import ShowMoreButton from './ShowMoreButton'

const searchFormSchema = z.object({
  search: z.string(),
})
type SearchFormType = z.infer<typeof searchFormSchema>

interface CurriculumsProps {
  tokenUserId: Number
  token: string
}

export default function Curriculums({ tokenUserId, token }: CurriculumsProps) {
  const { control, watch } = useForm<SearchFormType>({
    resolver: zodResolver(searchFormSchema),
  })
  const { getCurriculum, countCurriculums } = useContext(CurriculumContext)

  const [curriculumBlocksLeft, setCurriculumBlocksLeft] = useState(0)
  const [currentCurriculumBlock, setCurrentCurriculumBlock] = useState(1)
  const [curriculums, setCurriculums] = useState<CurriculumType[]>([])
  const [searchHovered, setSearchHovered] = useState(false)

  const curriculumAmountRef = useRef(0)
  const curriculumAmontPerBlock = 2
  const searchValue = watch('search')

  const showMoreCurriculums = async (
    search: string | undefined = undefined,
  ) => {
    if (curriculumBlocksLeft > 0) {
      if (search === '') search = undefined
      const nextBlock = currentCurriculumBlock + 1

      try {
        const gettedCurriculums = await getCurriculum({
          userId: tokenUserId,
          token,
          search,
          page: nextBlock,
          amount: curriculumAmontPerBlock,
        })
        setCurriculums((state) => state.concat(gettedCurriculums))
        setCurrentCurriculumBlock(nextBlock)

        setCurriculumBlocksLeft((state) => state - 1)
      } catch (err) {
        // Não esquecer de ajeitar esse catch, mostrar um alert ao dar erro ao clicar no botão mostrar mais
        console.log('Error fetching more curriculums.')
      }
    }
  }

  useEffect(() => {
    async function fetchCurriculums(
      search: string | undefined = undefined,
      currentPage = 1,
    ) {
      if (search === '') search = undefined

      const fetchedCurriculums = await getCurriculum({
        userId: tokenUserId,
        token,
        search,
        amount: curriculumAmontPerBlock,
        page: currentPage,
      })

      if (currentPage === 1) {
        setCurriculums(fetchedCurriculums)

        const length = await countCurriculums({
          userId: tokenUserId,
          token,
          search,
        })
        curriculumAmountRef.current = length

        const remainingCurriculumBlocks = Math.ceil(
          (length - curriculumAmontPerBlock) / curriculumAmontPerBlock,
        )

        setCurriculumBlocksLeft(
          remainingCurriculumBlocks <= 0 ? 0 : remainingCurriculumBlocks,
        )
      }
    }

    fetchCurriculums(searchValue, currentCurriculumBlock)
  }, [
    countCurriculums,
    currentCurriculumBlock,
    getCurriculum,
    token,
    tokenUserId,
    searchValue,
  ])

  return (
    <CurriculumsContainer searchHovered={searchHovered}>
      <SearchForm
        searchValue={searchValue}
        searchHovered={searchHovered}
        setSearchHovered={setSearchHovered}
        control={control}
        setCurrentCurriculumBlock={setCurrentCurriculumBlock}
      />
      <CreateCurriculumButton />
      <div className="curriculum-container">
        {curriculums?.map((curriculum) => (
          <Curriculum
            key={curriculum.id}
            name={curriculum.name}
            createdAt={curriculum.createdAt}
            updatedAt={curriculum.updatedAt}
          />
        ))}
      </div>
      {!!curriculumBlocksLeft && (
        <ShowMoreButton
          showMoreCurriculums={showMoreCurriculums}
          searchValue={searchValue}
        />
      )}
    </CurriculumsContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'mycurriculum.token': token } = parseCookies(ctx)

  try {
    const secret = process.env.CONFIG_AUTH_SECRET as string
    const { id: tokenUserId } = jwt.verify(token, secret) as JwtPayload

    return {
      props: {
        token,
        tokenUserId,
      },
    }
  } catch (err) {
    destroyCookie(ctx, 'mycurriculum.token')

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
}
