import React from 'react'
import Card from '@/components/Card'
import styles from "./servicios.module.css";
import { Container } from 'react-bootstrap';


const page = () => {
  return (
    <div className={styles.page}>
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