import Image from 'next/image'
import { CurriculumContainer } from '@/src/styles/pages/dashboard/curriculum'
import template1Illustration from '@/src/assets/illustrations/template-1.png'
import downloadIllustration from '@/src/assets/illustrations/download-simple.svg'
import download2Illustration from '@/src/assets/illustrations/download-simple2.svg'
import duplicateIllustration from '@/src/assets/illustrations/copy-simple.svg'
import duplicateIllustration2 from '@/src/assets/illustrations/copy-simple2.svg'
import penIllustration from '@/src/assets/illustrations/pen.svg'
import pen2Illustration from '@/src/assets/illustrations/pen2.svg'
import { useState } from 'react'

interface CurriculumProps {
  name: string
  createdAt: Date
  updatedAt: Date
}

export default function Curriculum({
  name,
  createdAt,
  updatedAt,
}: CurriculumProps) {
  const [curriculumImageHovered, setCurriculumImageHovered] = useState(false)

  const handleCurriculumImageHover = () => {
    setCurriculumImageHovered((state) => !state)
  }
  return (
    <CurriculumContainer
      curriculumImageHovered={curriculumImageHovered}
      onMouseEnter={handleCurriculumImageHover}
      onMouseLeave={handleCurriculumImageHover}
    >
      <Image src={template1Illustration} alt={'Foto do currículo de ' + name} />
      <div className="curriculum-info-container">
        <h2>Currículo de {name}</h2>
        <div className="curriculum-dates-container">
          <time dateTime="2023-12-20">criado em 20/12/2023</time>
          <time dateTime="2023-12-20">atualizado há 3 dias atrás</time>
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
