// pages/index.tsx
import React from 'react';
import Carrusel from '../components/Carrusel';
import styles from "./page.module.css";
import Tratamiento from '@/components/Tratamiento';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';


const HomePage: React.FC = () => {
  const images = [
    { src: '/images/slide-1.jpg', alt: 'Slide 1' },
    { src: '/images/slide-2.jpg', alt: 'Slide 2' },
    { src: '/images/slide-3.jpg', alt: 'Slide 3' },
  ];
  return (
    <>
      <div className={styles.carrusel}>
        <Carrusel images={images} />
      </div>
      <div className={styles.descripcionEres}>
        <Container>
          <Row className='no-gutters'>
            <Col md={5} className=''>
              <Image 
              src='/images/img-eres.png'
              width={400}
              height={500}
              alt=''
              className={styles.imagen}
              />
            </Col>
            <Col md={7} className={styles.bienvenida}>
            <div >
              <h3 className={styles.titulo}>Bienvenido a <span className={styles.span}>Eres</span></h3>
              <p className={styles.parrafo}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam molestias, facilis dicta optio cum alias natus quod tempore expedita amet non quisquam odio culpa beatae nemo iste deserunt? Mollitia laborum tempore, reprehenderit iusto sunt possimus obcaecati! Deserunt provident nihil officiis doloremque, dolor quibusdam impedit. Fugit vel ducimus dolore nisi iste.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Tratamiento
          title='faciales'
          img='/images/img-1.jpg'
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae, temporibus provident necessitatibus eum, fugit officia suscipit dolorum possimus aliquam maxime aut atque voluptates! Fuga fugiat rem amet sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae, temporibus provident necessitatibus eum, fugit officia suscipit Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae, temporibus provident necessitatibus eum, fugit officia suscipitLorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae, temporibus provident necessitatibus eum, fugit officia suscipit
    '/>
      </div>
      <Container>
   <Row className='no-gutters'>
   <Col md={7} className={styles.bienvenida}>
<div >
  </div>
</Col>
     <Col md={5} className=''>
       <Image 
       src='/images/Recurso-1.png'
       width={400}
       height={500}
       alt=''
       className={styles.imagen}
       />
     </Col>
   </Row>
 </Container>

      <div>
        <Tratamiento
          title='corporales'
          img='/images/img-2.jpg'
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae, temporibus provident necessitatibus eum, fugit officia suscipit 
dolorum possimus aliquam maxime aut atque voluptates! Fuga fugiat rem amet sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
vitae, temporibus provident necessitatibus eum, fugit officia suscipit Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae, 
temporibus provident necessitatibus eum, fugit officia suscipitLorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae, 
temporibus provident necessitatibus eum, fugit officia suscipit
 '/>
      </div>
    </>
  );
}

export default HomePage;
