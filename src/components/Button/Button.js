import React from 'react';
import style from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={style.Button}>
      Load more ...
    </button>
  );
};

export default Button;