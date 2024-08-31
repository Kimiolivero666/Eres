import React, { FC } from 'react';
import styles from './boton.module.css';
import Link from "next/link";


interface BotonProps {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  className?: string;
  textClassName?: string;
  href?: string; // Hacemos que href sea opcional
}

const Boton: FC<BotonProps> = ({ type = 'button', text, className, textClassName, href }) => {
  const buttonClassName = `${className ? `${className} ` : ''}${styles.button}`;
  const textClass = `${textClassName ? `${textClassName} ` : ''}${styles.text}`;

  return href ? (
    <Link href={href} className={buttonClassName} role="button">
      <span className={textClass}>{text}</span>
    </Link>
  ) : (
    <button className={buttonClassName} type={type}>
      <span className={textClass}>{text}</span>
    </button>
  );
};

export default Boton;