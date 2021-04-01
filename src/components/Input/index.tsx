import React, { InputHTMLAttributes, useCallback } from "react";

import { cep, currency, cpf, date, hour } from './masks';

import styles from '../../styles/components/Input/input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: "cep" | "currency" | "cpf" | "date" | "hour";
  prefix?: string;
}

const InputMask: React.FC<InputProps> = ({ mask, prefix, ...props }) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === "cep") {
        cep(e);
      }
      if (mask === "currency") {
        currency(e);
      }
      if (mask === "cpf") {
        cpf(e);
      }
      if (mask === 'date') {
        date(e);
      }
      if (mask === 'hour') {
        hour(e);
      }
    },
    [mask]
  );

  return (
    <div className={styles.Containerinput}>
      {prefix && <span className={styles.span}>{prefix}</span>}
      <input {...props} onKeyUp={handleKeyUp} />
    </div>
  );
};

export default InputMask;