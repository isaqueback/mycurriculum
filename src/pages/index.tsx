import {
  HomeContainer,
  Presentation1,
  Presentation2,
  Presentation3,
  Prices,
} from '../styles/pages/home/'
import Image from 'next/image'
import Link from 'next/link'
import postIllustration from '../assets/illustrations/post.gif'
import checkingCurriculumIllustration from '../assets/illustrations/checking-curriculum.gif'
import mountingCurriculumIllustration from '../assets/illustrations/mounting-curriculum.gif'
import documentIcon from '../assets/icons/file-text-thin.svg'
import pdfDocumentIcon from '../assets/icons/file-pdf-thin.svg'
import pencilIcon from '../assets/icons/pencil-thin.svg'
import infoIcon from '../assets/icons/info.svg'
import checkIcon from '../assets/icons/check-solid.svg'
import xIcon from '../assets/icons/xmark-solid 1.svg'
import { Carousel } from './Carousel'
import proPriceBg from '../assets/illustrations/pro-plan-animation.gif'
import { useContext } from 'react'
import { AnimationContext } from '../contexts/AnimationContext'

export default function Home() {
  const { toggleElementsAnimation } = useContext(AnimationContext)
  const { areElementsAnimated, animatedElements } = toggleElementsAnimation()


  return (
    <HomeContainer>
      <Presentation1
        isPresentation1Title1Visible={ areElementsAnimated[14].isPresentation1Title1Visible}
        isPresentation1Title2Visible={ areElementsAnimated[15].isPresentation1Title2Visible}
        isPresentation1P1Visible={ areElementsAnimated[16].isPresentation1P1Visible}
        isPresentation1P2Visible={ areElementsAnimated[17].isPresentation1P2Visible}
        isPresentation1Button1Visible={ areElementsAnimated[18].isPresentation1Button1Visible}
        isPresentation1Button2Visible={ areElementsAnimated[19].isPresentation1Button2Visible}
        isPresentation1ImgVisible={ areElementsAnimated[20].isPresentation1ImgVisible}
      >
        <div>
          <h2 ref={animatedElements[14].presentation1Title1}>Faça seu currículo agora com modelos prontos</h2>
          <p ref={animatedElements[16].presentation1P1}>
            Com um currículo bem elaborado, você aumenta suas chances de
            conseguir a vaga dos seus sonhos!
          </p>
          <Link href="/">
            <button ref={animatedElements[18].presentation1Button1}>Fazer currículo</button>
          </Link>
        </div>
        <div>
          <h2 ref={animatedElements[15].presentation1Title2}>Faça seu currículo agora</h2>
          <p ref={animatedElements[17].presentation1P2}>Aumente suas chances de conseguir o seu emprego dos sonhos!</p>
        </div>
        <Image
          src={postIllustration}
          alt="Animação de uma pessoa montando seu currículo"
          ref={animatedElements[20].presentation1Img}
        />
        <Link href="/">
          <button ref={animatedElements[19].presentation1Button2}>Fazer currículo</button>
        </Link>
      </Presentation1>
      <Presentation2
        isPresentation2Section1Visible={
          areElementsAnimated[0].isPresentation2Section1Visible
        }
        isPresentation2Section2Visible={
          areElementsAnimated[1].isPresentation2Section2Visible
        }
        isPresentation2Section3Visible={
          areElementsAnimated[2].isPresentation2Section3Visible
        }
        isPresentation2Illustration1Visible={
          areElementsAnimated[3].isPresentation2Illustration1Visible
        }
        isPresentation2Illustration2Visible={
          areElementsAnimated[4].isPresentation2Illustration2Visible
        }
      >
        <Image
          src={mountingCurriculumIllustration}
          alt="Animação de uma pessoa montando um currículo"
          ref={animatedElements[3].presentation2Illustration1}
        />
        <Image
          ref={animatedElements[4].presentation2Illustration2}
          src={checkingCurriculumIllustration}
          width={211}
          alt="Animação de uma pessoa verificando um currículo"
        />
        <article>
          <section ref={animatedElements[0].presentation2Section1}>
            <Image src={documentIcon} width={50} alt="ícone de um documento" />
            <div>
              <Image
                src={documentIcon}
                width={50}
                alt="ícone de um documento"
              />
              <h3>Modelos prontos e pré-preenchidos</h3>
              <p>
                Troque as informações pré-preenchidas pelas suas informações.
              </p>
            </div>
            <p>Troque as informações pré-preenchidas pelas suas informações.</p>
          </section>
          <section ref={animatedElements[1].presentation2Section2}>
            <Image src={pencilIcon} width={50} alt="ícone de um documento" />
            <div>
              <Image src={pencilIcon} width={50} alt="ícone de um documento" />
              <h3>Design customizado</h3>
              <p>
                Troque a cor do currículo, da letra, o tipo de letra e muito
                mais, caso queira.
              </p>
            </div>
            <p>
              Troque a cor do currículo, da letra, o tipo de letra e muito mais,
              caso queira.
            </p>
          </section>
          <section ref={animatedElements[2].presentation2Section3}>
            <Image
              src={pdfDocumentIcon}
              width={50}
              alt="ícone de um documento"
            />
            <div>
              <Image
                src={pdfDocumentIcon}
                width={50}
                alt="ícone de um documento"
              />
              <h3>Currículo em pdf</h3>
              <p>Faça o download do currículo em pdf</p>
            </div>
            <p>Faça o download do currículo em pdf</p>
          </section>
        </article>
      </Presentation2>
      <Presentation3
        isPresentation3TitleVisible={areElementsAnimated[5].isPresentation3TitleVisible}
        isPresentation3SliderVisible={areElementsAnimated[6].isPresentation3SliderVisible}
        isPresentation3ButtonVisible={areElementsAnimated[7].isPresentation3ButtonVisible}
      >
        <h2 ref={animatedElements[5].presentation3Title}>Alguns de nossos modelos</h2>
        <Carousel presentation3Slider={animatedElements[6].presentation3Slider} isPresentation3SliderVisible={areElementsAnimated[6].isPresentation3SliderVisible} />
        <Link href="/">
          <button ref={animatedElements[7].presentation3Button}>Ver mais modelos</button>
        </Link>
      </Presentation3>
      <Prices
        isPricesTitleVisible={areElementsAnimated[8].isPricesTitleVisible}
        isPricesSection1Visible={areElementsAnimated[9].isPricesSection1Visible}
        isPricesSection2Visible={areElementsAnimated[10].isPricesSection2Visible}
      >
        <h3 ref={animatedElements[8].pricesTitle}>Preços</h3>
        <div>
          <section ref={animatedElements[9].pricesSection1}>
            <div>
              <div>
                <h4>Basic</h4>
                <small>
                  <Image
                    src={infoIcon}
                    alt="Ícone representando uma info. A letra i circuncidada e com fundo transparente."
                  />
                </small>
              </div>
              <div>
                <strong>R$ 2</strong>
                <small>/currículo criado</small>
              </div>
            </div>
            <ul>
              <li>
                <span>
                  <Image src={checkIcon} alt="Ícone de verificado" />
                </span>
                <p>Acesso a todos os nossos modelos de currículos</p>
              </li>
              <li>
                <span>
                  <Image src={xIcon} alt="Ícone de cancelar (um x)" />
                </span>
                <p>É possível alterar o currículo depois de baixado</p>
              </li>
              <li>
                <span>
                  <Image src={xIcon} alt="Ícone de cancelar (um x)" />
                </span>
                <p>É possível criar mais de 1 currículo</p>
              </li>
              <li>
                <span>
                  <Image src={checkIcon} alt="Ícone de verificado" />
                </span>
                <p>É possível baixar o currículo criado quantas vezes quiser</p>
              </li>
            </ul>
            <Link href="/">
              <button>Comprar</button>
            </Link>
          </section>
          <section ref={animatedElements[10].pricesSection2}>
            <Image fill src={proPriceBg} alt="Animaçãozinha no plano mensal" />
            <div>
              <div>
                <h4>Pro</h4>
                <small>
                  <Image
                    src={infoIcon}
                    alt="Ícone representando uma info. A letra i circuncidada e com fundo transparente."
                  />
                </small>
              </div>
              <div>
                <strong>R$ 6</strong>
                <small>/mês</small>
              </div>
            </div>
            <ul>
              <li>
                <span>
                  <Image src={checkIcon} alt="Ícone de verificado" />
                </span>
                <p>Acesso a todos os nossos modelos de currículos</p>
              </li>
              <li>
                <span>
                  <Image src={checkIcon} alt="Ícone de cancelar (um x)" />
                </span>
                <p>É possível alterar o currículo depois de baixado</p>
              </li>
              <li>
                <span>
                  <Image src={checkIcon} alt="Ícone de cancelar (um x)" />
                </span>
                <p>É possível criar mais de 1 currículo</p>
              </li>
              <li>
                <span>
                  <Image src={checkIcon} alt="Ícone de verificado" />
                </span>
                <p>É possível baixar o currículo criado quantas vezes quiser</p>
              </li>
            </ul>
            <Link href="/">
              <button>Comprar</button>
            </Link>
          </section>
        </div>
      </Prices>
    </HomeContainer>
  )
}
