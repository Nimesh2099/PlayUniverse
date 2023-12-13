import React from "react";
import "./style.scss";

const GameItem = (props) => {
  return (
    <section className="gameItem">
      <img src={props.img_src} alt={props.img_alt} />
      <div className="description">
        <h2>{props.title}</h2>
        <p>{props.detail1}</p>
        <p>{props.detail2}</p>
        <button className="btnLearnMore">Learn More&gt;</button>
      </div>
    </section>
  );
};

export default GameItem;
