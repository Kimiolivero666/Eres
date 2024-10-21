import React from 'react'
import Card from '@/components/Card'
import styles from "./servicios.module.css";
import { Container } from 'react-bootstrap';
import Image from 'next/image';



const page = () => {
  return (
    <div className={styles.page}>

      <Image
        src='/images/img-1.jpg'
        width={1920}
        height={1080}
        className={styles.imagen}
        alt=''
      />

      <h3 className={styles.titulo}>
        FACIALES
      </h3>

      <Container>
        <Card
          title='CLÁSICO HIDRATANTE'
          description='Una solución para cada tipo de piel. ¡Limpieza profunda, para una piel nutrida, hidratada y radiante!'
          description2='Incluye diagnóstico de la piel. Ideal para la primera consulta.'
          minutos='70 min.'
        />

      </Container>
      <Image
        src='/images/img-2.jpg'
        width={1920}
        height={1080}
        className={styles.imagen}
        alt=''
      />
      <h3 className={styles.titulo}>
        CORPORALES
      </h3>

      <Container>
        <Card
          title='CLÁSICO HIDRATANTE'
          description='Una solución para cada tipo de piel. ¡Limpieza profunda, para una piel nutrida, hidratada y radiante!'
          description2='Incluye diagnóstico de la piel. Ideal para la primera consulta.'
          minutos='70 min.'
        />

      </Container>
    </div>
  )
}

export default page