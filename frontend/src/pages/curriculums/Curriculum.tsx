import { useState } from 'react'
import Image from 'next/image'
import { CurriculumContainer } from '@/src/styles/pages/curriculums/curriculum'
import template1Illustration from '@/src/assets/illustrations/template-1.png'
import downloadIllustration from '@/src/assets/illustrations/download-simple.svg'
import download2Illustration from '@/src/assets/illustrations/download-simple2.svg'
import duplicateIllustration from '@/src/assets/illustrations/copy-simple.svg'
import duplicateIllustration2 from '@/src/assets/illustrations/copy-simple2.svg'
import penIllustration from '@/src/assets/illustrations/pen.svg'
import pen2Illustration from '@/src/assets/illustrations/pen2.svg'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import 'animate.css'

interface CurriculumProps {
  name: string
  createdAt: string
  updatedAt: string
}

const Curriculum = ({ name, createdAt, updatedAt }: CurriculumProps) => {
  const [curriculumImageHovered, setCurriculumImageHovered] = useState(false)

  const formattedCreatedAt = format(new Date(createdAt), 'dd/MM/yyyy')
  const formattedUpdatedAt = formatDistanceToNow(new Date(updatedAt), {
    addSuffix: true,
    includeSeconds: true,
    locale: ptBR,
  })

  const handleCurriculumImageHover = () => {
    setCurriculumImageHovered((state) => !state)
  }
  return (
    <CurriculumContainer
      curriculumImageHovered={curriculumImageHovered}
      onMouseEnter={handleCurriculumImageHover}
      onMouseLeave={handleCurriculumImageHover}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Image src={template1Illustration} alt={'Foto do currículo de ' + name} />
      <div className="curriculum-info-container">
        <h2>{name === 'Novo Currículo' ? name : `Currículo de ${name}`}</h2>
        <div className="curriculum-dates-container">
          <time dateTime={createdAt}>criado em {formattedCreatedAt}</time>
          <time dateTime={updatedAt}>atualizado {formattedUpdatedAt}</time>
        </div>
        <div className="curriculum-buttons-container">
          <button>
            <Image src={downloadIllustration} alt="Ícone de download" />
            <Image
              src={download2Illustration}
              alt="Ícone de download laranja"
            />
            <span>Baixar</span>
          </button>
          <button>
            <Image src={duplicateIllustration} alt="Ícone de duplicar" />
            <Image
              src={duplicateIllustration2}
              alt="Ícone de duplicar laranja"
            />
            <span>Duplicar</span>
          </button>
        </div>
      </div>
      <button>
        <Image src={penIllustration} alt="Ícone de editar" />
        <Image src={pen2Illustration} alt="Ícone de editar mais grosso" />
        <span>Editar</span>
      </button>
    </CurriculumContainer>
  )
}

export default Curriculum
