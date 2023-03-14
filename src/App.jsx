import React, { useState, useEffect } from "react";
import { FaSync } from "react-icons/fa";
import "./style.css";

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const randomCountries = getRandomCountries(data, 10);
        setCountries(randomCountries);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRefresh = () => {
    window.location.reload(); // atualiza a página quando o botão é clicado
  };


  // retorna um array com n países aleatórios
  const getRandomCountries = (countries, n) => {
    const shuffled = countries.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n).map((country) => {
      const name = country.name.common;
      const area = country.area;
      const capital = country.capital?.[0] || "-";
      const currency = Object.keys(country.currencies)?.[0] || "-";
      return { name, area, capital, currency };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Countries</h1>
        <table>
          <thead>
            <tr>
              <th>País</th>
              <th>Área</th>
              <th>Capital</th>
              <th>Moeda</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={index}>
                <td>{country.name}</td>
                <td>{country.area}</td>
                <td>{country.capital}</td>
                <td>{country.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
      <div className="refresh-button" onClick={handleRefresh}>
        <FaSync className="refresh-icon" /> {/* ícone animado */}
      </div>
    </div>
  );
};

export default App;
