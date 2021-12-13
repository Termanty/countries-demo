import React from "react";
import { Link } from "react-router-dom";
import pretierAmount from "../pretierAmout";

function CountryCard({ name, capital, languages, population, flags }) {
  const linkPath = "/countries/" + name;
  return (
    <Link className="country" to={linkPath}>
      <div className="grey">
        <h3>{name}</h3>
        <p>{capital}</p>
      </div>
      <div className="white">
        <p>
          languages:{" "}
          {languages.map((l) => (
            <b key={l.name}>{l.name} </b>
          ))}
        </p>
        <p>
          population: <b>{pretierAmount(population)}</b>
        </p>
        <img className="card-img" src={flags.png} alt="flag" />
      </div>
    </Link>
  );
}

export default CountryCard;
