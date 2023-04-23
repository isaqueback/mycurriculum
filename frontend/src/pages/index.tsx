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
import Animate from '@researchgate/react-intersection-observer'

export default function Home() {
  const { handleChangeAnimation } = useContext(AnimationContext)

  return (
    <HomeContainer>
      <Presentation1>
        <div>
          <Animate
            onChange={(entry) =>
              handleChangeAnimation({
                entry,
                entryAnimationName: 'animate__zoomInLeft',
                exitAnimationName: 'animate__zoomOutLeft',
                animationDelayName: 'animate__faster',
              })
            }
          >
            <h2>Faça seu currículo agora com modelos prontos</h2>
          </Animate>
          <Animate
            onChange={(entry) =>
              handleChangeAnimation({
                entry,
                entryAnimationName: 'animate__fadeInLeft',
                exitAnimationName: 'animate__fadeOutLeft',
                animationDelayName: 'animate__faster',
              })
            }
          >
            <p>
              Com um currículo bem elaborado, você aumenta suas chances de
              conseguir a vaga dos seus sonhos!
            </p>
          </Animate>
          <Animate
            onChange={(entry) =>
              handleChangeAnimation({
                entry,
                entryAnimationName: 'animate__bounceIn',
                exitAnimationName: 'animate__bounceOut',
                animationDelayName: 'animate__faster',
              })
            }
          >
            <Link href="/">
              <button>Fazer currículo</button>
            </Link>
          </Animate>
        </div>
        <div>
          <Animate
            onChange={(entry) =>
              handleChangeAnimation({
                entry,
                entryAnimationName: 'animate__fadeInDown',
                exitAnimationName: 'animate__fadeOutDown',
                animationDelayName: 'animate__faster',
              })
            }
          >
            <h2>Faça seu currículo agora</h2>
          </Animate>
          <Animate
            onChange={(entry) =>
              handleChangeAnimation({
                entry,
                entryAnimationName: 'animate__fadeInDown',
                exitAnimationName: 'animate__fadeOutDown',
                animationDelayName: 'animate__faster',
              })
            }
          >
            <p>Aumente suas chances de conseguir o seu emprego dos sonhos!</p>
          </Animate>
        </div>
        <Animate
          onChange={(entry) =>
            handleChangeAnimation({
              entry,
              entryAnimationName: 'animate__fadeInRight',
              exitAnimationName: 'animate__fadeOutRight',
              animationDelayName: 'animate__faster',
            })
          }
        >
          <Image
            src={postIllustration}
            alt="Animação de uma pessoa montando seu currículo"
          />
        </Animate>
        <Animate
          onChange={(entry) =>
            handleChangeAnimation({
              entry,
              entryAnimationName: 'animate__fadeInUp',
              exitAnimationName: 'animate__fadeOutUp',
              animationDelayName: 'animate__faster',
            })
          }
        >
          <Link href="/">
            <button>Fazer currículo</button>
          </Link>
        </Animate>
      </Presentation1>
      <Presentation2>
        <Animate
          onChange={(entry) =>
            handleChangeAnimation({
              entry,
              entryAnimationName: 'animate__fadeInLeft',
              exitAnimationName: 'animate__fadeOutLeft',
              animationDelayName: 'animate__faster',
            })
          }
        >
          <Image
            src={mountingCurriculumIllustration}
            alt="Animação de uma pessoa montando um currículo"
          />
        </Animate>
        <Animate
          onChange={(entry) =>
            handleChangeAnimation({
              entry,
              entryAnimationName: 'animate__lightSpeedInLeft',
              exitAnimationName: 'animate__lightSpeedOutLeft',
              animationDelayName: 'animate__faster',
            })
          }
        >
          <Image
            src={checkingCurriculumIllustration}
            width={211}
            alt="Animação de uma pessoa verificando um currículo"
          />
        </Animate>
        <article>
          <Animate
            onChange={(entry) =>
              handleChangeAnimation({
                entry,
                entryAnimationName: 'animate__lightSpeedInRight',
                exitAnimationName: 'animate__lightSpeedOutRight',
                animationDelayName: 'animate__faster',
              })
            }
          >
            <section>
              <Image
                src={documentIcon}
                width={50}
                alt="ícone de um documento"
              />
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
              <p>
                Troque as informações pré-preenchidas pelas suas informações.
              </p>
            </section>
          </Animate>
          <Animate
            onChange={(entry) =>
              handleChangeAnimation({
                entry,
                entryAnimationName: 'animate__lightSpeedInRight',
                exitAnimationName: 'animate__lightSpeedOutRight',
                animationDelayName: 'animate__faster',
              })
            }
          >
            <section>
              <Image src={pencilIcon} width={50} alt="ícone de um documento" />
              <div>
                <Image
                  src={pencilIcon}
                  width={50}
                  alt="ícone de um documento"
                />
                <h3>Design customizado</h3>
                <p>
                  Troque a cor do currículo, da letra, o tipo de letra e muito
                  mais, caso queira.
                </p>
              </div>
              <p>
                Troque a cor do currículo, da letra, o tipo de letra e muito
                mais, caso queira.
              </p>
            </section>
          </Animate>
          <Animate
            onChange={(entry) =>
              handleChangeAnimation({
                entry,
                entryAnimationName: 'animate__lightSpeedInRight',
                exitAnimationName: 'animate__lightSpeedOutRight',
                animationDelayName: 'animate__faster',
              })
            }
          >
            <section>
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
          </Animate>
        </article>
      </Presentation2>
      <Presentation3>
        <Animate
          onChange={(entry) =>
            handleChangeAnimation({
              entry,
              entryAnimationName: 'animate__zoomIn',
              exitAnimationName: 'animate__zoomOut',
              animationDelayName: 'animate__faster',
            })
          }
        >
          <h2>Alguns de nossos modelos</h2>
        </Animate>
        <Carousel />
        <Animate
          onChange={(entry) =>
            handleChangeAnimation({
              entry,
              entryAnimationName: 'animate__fadeInRight',
              exitAnimationName: 'animate__fadeOutLeft',
              animationDelayName: 'animate__faster',
            })
          }
        >
          <Link href="/">
            <button>Ver mais modelos</button>
          </Link>
        </Animate>
      </Presentation3>
      <Prices>
        <Animate
          onChange={(entry) =>
            handleChangeAnimation({
              entry,
              entryAnimationName: 'animate__bounceIn',
              exitAnimationName: 'animate__bounceOut',
              animationDelayName: 'animate__faster',
            })
          }
        >
          <h3>Preços</h3>
        </Animate>
        <div>
          <Animate
            onChange={(entry) =>
              handleChangeAnimation({
                entry,
                entryAnimationName: 'animate__lightSpeedInLeft',
                exitAnimationName: 'animate__lightSpeedOutLeft',
                animationDelayName: 'animate__faster',
              })
            }
          >
            <section>
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
                  <p>
                    É possível baixar o currículo criado quantas vezes quiser
                  </p>
                </li>
              </ul>
              <Link href="/">
                <button>Comprar</button>
              </Link>
            </section>
          </Animate>
          <Animate
            onChange={(entry) =>
              handleChangeAnimation({
                entry,
                entryAnimationName: 'animate__lightSpeedInRight',
                exitAnimationName: 'animate__lightSpeedOutRight',
                animationDelayName: 'animate__faster',
              })
            }
          >
            <section>
              <Image
                fill
                src={proPriceBg}
                alt="Animaçãozinha no plano mensal"
              />
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
                  <p>
                    É possível baixar o currículo criado quantas vezes quiser
                  </p>
                </li>
              </ul>
              <Link href="/">
                <button>Comprar</button>
              </Link>
            </section>
          </Animate>
        </div>
      </Prices>
    </HomeContainer>
  )
}
