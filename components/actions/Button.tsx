import { ButtonProps } from '@/@types/props';
import React from 'react';

/** Configurable DaisyUI button */
const Button: React.FC<ButtonProps> = ({ styles, children }) => {
  return <button className={`btn ${styles}`}>{children}</button>;
};

export default Button;