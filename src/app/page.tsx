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
              <h3 className={styles.titulo}>Eres <span className={styles.span}>Wellness & Kosmetik</span></h3>
              <p className={styles.parrafo}>Un espacio pensado para tu bienestar, desde un enfoque holístico y profesional.
              </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Tratamiento
          title='faciales'
          img='/images/img-1.jpg'
          text='Cada piel es diferente y tiene necesidades particulares, por lo que el asesoramiento individualizado 
forma parte de nuestros tratamientos y servicios desde la primera consulta. Estaremos encantados de 
apoyarlo para encontrar juntos el balance correcto para su piel en el salón como también con productos 
para su uso en casa, de esta forma mejorar el aspecto de su piel y su hidratación.'/>
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
          text='Experimente una profunda relajación, alivio de tensiones y descanso a través de nuestros masajes. 
Permítase una pausa para reconectar con la calma y dejar ir el estrés del día a día.
 '/>
      </div>
    </>
  );
}

export default HomePage;
