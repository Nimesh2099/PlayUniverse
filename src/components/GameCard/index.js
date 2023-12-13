import React from "react";
import { Rate, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const { Meta } = Card;
const GameCard = ({ game }) => {
  const navigate = useNavigate();

  const getRating = () => {
    let totalRatings = game.ratings.reduce(
      (accumulator, item) => accumulator + item.rating,
      0
    );
    let totalNumberOfUsers = game.ratings.length || 1;
    return totalRatings / totalNumberOfUsers;
  };
  return (
    <Card
      style={{
        background: "black",
        height: "100%",
        cursor: "pointer"
      }}
      className="game-card"
      cover={
        <img
          alt="example"
          src={game.banner}
          style={{
            height: "200px",
            objectFit: "fill",
            border: "2px solid white",
          }}
        />
      }
      onClick={() => navigate("/gamedetails", { state: { game } })}
    >
      <Meta
        title={<Typography style={{ color: "white" }}>{game.title}</Typography>}
        description={
          <div>
            <Typography style={{ color: "white" }}>
              {game.description}
            </Typography>
            <Rate
              allowHalf
              defaultValue={getRating()}
              disabled
              style={{ background: "black" }}
            />
          </div>
        }
      />
    </Card>
  );
};

export default GameCard;
