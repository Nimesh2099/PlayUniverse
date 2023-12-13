import React, { useEffect, useState } from "react";
import GameCard from "../../components/GameCard/index";
import { Row, Col } from "antd";
import { getGamesListApi } from "../../firebase/api";
import "./styles.scss";

const Gamepage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGamesListApi(setGames);
  }, []);

  return (
    <Row
      gutter={[50, 50]}
      style={{ padding: "10rem 22rem" }}
      className="games-container"
    >
      {games.map((item, index) => (
        <Col span={8} key={item.id}>
          <GameCard game={item} />
        </Col>
      ))}
    </Row>
  );
};

export default Gamepage;
