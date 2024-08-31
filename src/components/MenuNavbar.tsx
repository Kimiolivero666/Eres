"use client";

import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import styles from "./MenuNavbar.module.css";
import Image from "next/image";

const MenuNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
  }, [menuOpen]);

  return (
    <nav className={`${styles.navbar} fixed-top`}>
      <Container>
        <div className={styles.navbarContenedor}>
          {/* Logo */}
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

          {/* Menu */}
          <div className={`${styles.menu} ${menuOpen ? styles.active : ""}`}>
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
            
          {/* Social Icons */}
          <div className={styles.icons}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className={styles.icono} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className={styles.icono} />
            </a>
          </div>
          </div>










          {/* Menu Toggle Icon */}
          {menuOpen ? (
            <AiOutlineClose className={styles.iconBars} onClick={toggleMenu} />
          ) : (
            <HiOutlineBars3CenterLeft className={styles.iconBars} onClick={toggleMenu} />
          )}
        </div>
      </Container>
    </nav>
  );
};

export default MenuNavbar;
