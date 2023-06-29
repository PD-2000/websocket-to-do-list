import React from 'react';
import styles from './Button.module.scss';

const Button = ({onClick, children, btnRed}) => {
  const classes = [];

  if(btnRed)
    classes.push(styles.btnRed);

    return (
      <button onClick={onClick} className={`${classes.join(' ')} ${styles.btn}`}>
        {children}
      </button>
    );
};

export default Button;