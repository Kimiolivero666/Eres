import React from 'react';
import styles from "./card.module.css";
import Image from 'next/image';
import Boton from './Boton';
import botonStyles from './boton.module.css'

interface CardProps {
    title: string;
    description: string;
    description2: string;
    minutos: string;

}

const Card: React.FC<CardProps> = ({ title, description, description2, minutos }) => {
    return (
        <div className={styles.card}>
            <div className={styles.contenidoCard}>

            <div className={styles.content}>
                <div className={styles.contenedorTitulo}>
                    <Image
                        className={styles.images}
                        src='/images/Recurso-3.png'
                        width={400}
                        height={500}
                        alt='' />
                    <h2 className={styles.title}>{title}</h2>
                </div>
                <p className={styles.description}>{description}</p>
                <p className={styles.description2}>{description2}</p>
            </div >
            <div className={styles.contenedorAbajo}>
                <div className={styles.cajaTiempo}>
                    <Image
                        className={styles.imagesTiempo}
                        src='/images/Recurso-4.png'
                        width={400}
                        height={500}
                        alt='' />
                        <p className={styles.minutos}>{minutos}</p>
                </div>
                <div className={styles.contenedorPrecio}>
                    <p className={styles.precio}>58€</p>
                    <Boton text='Reservar'
                    className={botonStyles.buttonRosado} 
                    textClassName={botonStyles.textBlanco}
                                  />
                </div>
            </div>
            </div>
        </div>
    );
};

export default Card;
