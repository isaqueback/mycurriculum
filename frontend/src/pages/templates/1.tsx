import {
  Container,
  TemplateEditor,
  Template,
} from '@/src/styles/pages/templates/1'
import myProfilePicture from '../../assets/illustrations/minha-foto-canal.jpg'
import Image from 'next/image'

export default function Template1() {
  return (
    <Container>
      <TemplateEditor></TemplateEditor>
      <Template>
        <div className="left-part">
          <section>
            <div>
              <h1>Isaque Delfino</h1>
              <strong>Desenvolvedor web fullstack</strong>
            </div>
            <Image alt="Minha foto de perfil" src={myProfilePicture} />
          </section>
          <section>
            <address>
              <h3>Dados Pessoais</h3>
              <div>
                <h4>E-mail:&nbsp;</h4>
                <p>isa.quecosta00@gmail.com</p>
              </div>
              <div>
                <h4>Celular:&nbsp;</h4>
                <p>+351 93 724-8553</p>
              </div>
              <div>
                <h4>Data de nascimento:&nbsp;</h4>
                <p>
                  <time dateTime="1998-12-22">22/12/1998</time>
                </p>
              </div>
              <div>
                <h4>Nacionalidade:&nbsp;</h4>
                <p>brasileira</p>
              </div>
              <div>
                <h4>GitHub:&nbsp;</h4>
                <p>
                  <a
                    href="https://github.com/isaqueback"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/
                    <strong>isaqueback</strong>
                  </a>
                </p>
              </div>
              <div>
                <h4>Linkedin:&nbsp;</h4>
                <p>
                  <a
                    href="https://www.linkedin.com/in/isaqueback/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/<strong>isaqueback</strong>
                  </a>
                </p>
              </div>
              <div>
                <h4>Endereço:&nbsp;</h4>
                <p>Portugal - Viana do Castelo - Vila Nova de Cerveira</p>
              </div>
            </address>
          </section>
          <section>
            <h3>Habilidades</h3>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>Styled Components</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Vite</li>
              <li>Next.js</li>
              <li>ORM Sequelize</li>
              <li>PostgreSQL</li>
            </ul>
          </section>
          <section>
            <h3>Idiomas</h3>
            <ul>
              <li>Português - nativo</li>
              <li>Inglês - iniciante</li>
            </ul>
          </section>
        </div>
        <div className="right-part">
          <section>
            <h2>Sobre Mim</h2>
            <p>
              Desenvolvedor web fullstack com 4 meses de experiência. Possuo
              sólidos conhecimentos em HTML, CSS, JavaScript, assim como
              experiência com frameworks como React, Vite e Next.js.
              Familiarizado com ORM Sequelize e banco de dados PostgreSQL.
              Atualmente atuo como freelancer, buscando oportunidades para
              contribuir em projetos desafiadores e aprimorar minhas habilidades
              na área de desenvolvimento web.
            </p>
          </section>
          <section>
            <h3>Experiências Profissionais</h3>
            <div>
              <h4>Laminador</h4>
              <h5>
                <span>Brunswick Marine</span>
                <span>&nbsp;-&nbsp;</span>
                <address>Vila Nova de Cerveira, Portugal</address>
              </h5>
              <div>
                <time>
                  <span>Hoje</span>
                  <span>01/2022</span>
                </time>
                <p>
                  Principais atribuições eram de lixar e projetar resina e fibra
                  no barco, bem como colocar panos de fibra de vidro e
                  posteriormente laminá-lo.
                </p>
              </div>
            </div>
            <div>
              <h4>Operador de Caixa</h4>
              <h5>
                <span>Irmãos Gonçalves</span>
                <span>&nbsp;-&nbsp;</span>
                <address>Porto Velho, Brasil</address>
              </h5>
              <div>
                <time>
                  <span>11/2021</span>
                  <span>11/2020</span>
                </time>
                <p>
                  Principais atribuições eram de atender os clientes, negociar o
                  seu troco, registrar e empacotar seus produtos, bem como
                  instruir os novatos a operarem caixa.
                </p>
              </div>
            </div>
          </section>
          <section>
            <h3>Educação</h3>
            <div>
              <time>
                <span>2018</span>
                <span>2017</span>
              </time>
              <div>
                <h4>Ensino Superior - Engenharia Civil</h4>
                <h5>Faculdade de Rondônia - FARO</h5>
                <address>Porto Velho, Brasil</address>
              </div>
            </div>
            <div>
              <time>
                <span>2016</span>
                <span>2010</span>
              </time>
              <div>
                <h4>Ensino Médio</h4>
                <h5>E.E.E.M.F. Barão do Solimões</h5>
                <address>Porto Velho, Brasil</address>
              </div>
            </div>
          </section>
          <section>
            <h3>Projetos</h3>
            <ul>
              <li>
                <h4>Lista de afazeres (todo) feito em React</h4>
                <a
                  href="https://todo-isaqueback.netlify.app"
                  target="_blank"
                  rel="noreferrer"
                >
                  🔗 https://todo-isaqueback.netlify.app
                </a>
              </li>
              <li>
                <h4>Contador para o lançamento de um recurso feito em React</h4>
                <a
                  href="https://countdown-isaqueback.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  🔗 https://countdown-isaqueback.netlify.app/
                </a>
              </li>
              <li>
                <h4>
                  Blog pessoal que consome issues do Github feito em React
                </h4>
                <a
                  href="https://github-blog-isaqueback.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  🔗 https://github-blog-isaqueback.netlify.app/
                </a>
              </li>
            </ul>
          </section>
        </div>
      </Template>
    </Container>
  )
}
