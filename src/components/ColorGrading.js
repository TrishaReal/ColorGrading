import React, { useState, useEffect } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";
import { v4 as uuidv4 } from "uuid";

const ColorGrading = () => {
  //Dichiaro state per intercettare un'errore:
  const [isError, setIsError] = useState(false);

  //Dichiaro un'altro 'state':
  const [selectedColor, setSelectedColor] = useState([]);

  const [colorInput, setColorInput] = useState({
    color: "",
    qty: 10,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (colorInput.color && colorInput.qty) {
      //Se sono true, ovvero non sono stringa vuota, zero o undefined,
      const { color, qty } = colorInput;
      try {
        setSelectedColor(
          new Values(color).all(Math.round(100 / parseInt(qty, 10)) * 2)
          //Math.round(100/parseInt(qty, 10))*2 --> Round serve per arrontondare la cifra. ParseInt perchè otterremo un stringa dall'input.
        );
        setColorInput({
          color: "",
          qty: 10,
        });
      } catch (error) {
        setIsError(true);
      }
    }
  };

  const handleChange = (e) => {
    if (isError) {
      setIsError(false);
    }

    //decostruisco l'oggetto 'e.target' con 'name' e 'value':
    const { name, value } = e.target;
    setColorInput({
      //setto coloInput come, essendo un oggetto, ricopiare tutti i valori che noi stiamo modificando in quel momento
      ...colorInput,
      [name]: value,
    });
  }; // questo gestirà entrambi gli input

  useEffect(() => {
    setColorInput({ qty: 10, color: "" });
    setSelectedColor(new Values("#c8a2c8").all(Math.round(100 / 10) * 2));
  }, []); //Voglio che avvenga solo la prima volta.

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="color"
            id="color"
            value={colorInput.color}
            maxLength={7}
            onChange={handleChange}
            className="input"
          ></input>
          <input
            type="number"
            name="qty"
            id="qty"
            value={colorInput.qty}
            max={100}
            min={5}
            step={5}
            onChange={handleChange}
            className="input"
          ></input>
        </div>
        <button className="btn btn-selector" type="submit">
          Create
        </button>
      </form>
      <section className="color-section">
        {isError ? (
          <h4 className="section-center">Nessun Colore Trovato</h4>
        ) : selectedColor.length > 0 ? (
          selectedColor.map((el) => <SingleColor key={uuidv4()} {...el} />)
        ) : (
          <h4>Loading...</h4>
        )}
      </section>
    </>
  );
};

export default ColorGrading;
