
import styles from "./tratamiento.module.css";
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import Boton from './Boton';
import React, { FC } from 'react';


interface BotonProps {
  title: string;
  img: string;
  text: string;
}

const Tratamiento: FC<BotonProps> = ({title,img, text}) => {
  return (
    <div className={styles.tratamiento}>
        <h3 className={styles.titulo}>
         {title}
        </h3>
        <Image 
   src={img}
   alt=''
   width={1920}
   height={1080}
   className={styles.imagen}
   priority
 />
 <Container>
    <p className={styles.parrafo}>{text}</p>
    <div className={styles.boton}>
    <Boton text='Ver más'/>
    </div>
    
 </Container>
    </div>
  )
}

export default Tratamiento