import React from 'react';
import styles from './footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { MdLocationOn } from 'react-icons/md';
import Boton from './Boton';
import botonStyles from './boton.module.css'; // Importamos los estilos del botón
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container className={styles.container}>
        <Row className="no-gutters">
          <Col md={4} className={styles.contenedorCol1}>
            <div className={styles.brand}>
              <a href="/">
                <Image
                  src="/images/Logo-home-02.svg"
                  width={100}
                  height={30}
                  alt="Logo"
                  className={styles.logo}
                />
              </a>
            </div>
            <Image
              src="/images/Recurso-2.png"
              width={400}
              height={500}
              alt=""
              className={styles.imagen}
            />
          </Col>
          <Col md={4} className={styles.bienvenida}>
            <div className={styles.boxUbicacion}>
              <MdLocationOn className={styles.IconLocation} />
              <p className={styles.ubicacion}>Ubicación</p>
            </div>
            <div>
              <p className={styles.parrafoUbicacion}>Avenida Siempre Viva 555</p>
              <p className={styles.parrafoUbicacion}>+345 5677 8889</p>
              <p className={styles.parrafoUbicacion}>info@eres.com</p>
              <Boton
                text="contacto"
                className={botonStyles.buttonBlanco} // Aplicamos la clase para botón blanco
                textClassName={botonStyles.textMarron} // Aplicamos la clase para texto marrón
              />
            </div>
            {/* Social Icons */}
            <div className={styles.icons}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className={styles.icono} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className={styles.icono} />
              </a>
            </div>
          </Col>
          <Col md={4}>
            {/* Menu */}

            <div className={styles.menuBox}>
              <a href="/" className={styles.linkMenu}>
                Inicio
              </a>
              <a href="/Sobre Eres" className={styles.linkMenu}>
                Sobre Eres
              </a>
              <a href="/Servicios" className={styles.linkMenu}>
                Servicios
              </a>
              <a href="/Promociones" className={styles.linkMenu}>
                Promociones
              </a>
              <a href="/Contacto" className={styles.linkMenu}>
                Contacto
              </a>
            </div>
            <div className={styles.contenedorIdiomas}>
              <p className={styles.idiomas}>Español</p>
              <p className={styles.idiomas}>English</p>
              <p className={styles.idiomas}>Deutsch</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
