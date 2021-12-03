import React, { useState, useEffect } from "react";
import { rgbToHex } from "../utils/helpers";

const SingleColor = ({ rgb, type, weight }) => {
  const [message, setMessage] = useState(false);

  //Funzione per riuscire a copiare il colore desiderato:
  const copiaColore = () => {
    navigator.clipboard
      .writeText(rgbToHex(...rgb))
      .then(() => setMessage(true))
      .catch((err) => console.log(err));
  };

  //Utilizzo useEffect per nascondere il messaggio 'colore copiato!' dopo tot tempo.
  useEffect(() => {
    const timer = setTimeout(() => {
      //(2) e faccio in modo che dopo 2 secondi
      setMessage(false); //(3) setMessage sarà false
    }, 2000);

    return () => clearTimeout(timer); //(4) faccio un return per passare il nostro timer
  }, [message]); //(1) quando arriviamo al valore di 'message'

  return (
    <article
      onClick={copiaColore}
      className={`single-color ${type}`} //affinchè i codici numerici dei colori possano variare di colore: nero per i colori chiari e bianco per i colori scuri, per una questione di leggibilità.
      style={{ backgroundColor: rgbToHex(...rgb) }}
    >
      {" "}
      <h5>{rgbToHex(...rgb)}</h5>
      {message && <p>Colore Copiato!</p>}
    </article>
  );
};

export default SingleColor;
