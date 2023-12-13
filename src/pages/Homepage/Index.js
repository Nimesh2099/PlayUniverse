import React, { useEffect, useState } from "react";
import { Carousel, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getGamesListApi0, getUserData } from "../../firebase/api";
import "./styles.scss";

const Homepage = (props) => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    getUserData(setUserData);
    getGamesListApi0(setGames);
  }, []);
  
  let shouldRenderLinks = userData.is_blocked;

  return (
    <Carousel autoplay className="homepage">
      {games.map((item) => (
        <div className="img-container" key={item.game_id}>
          <img src={item.banner} className="img" />
          <div className="content">
            <div className="details">
              <h3 className="title">{item.title}</h3>
              <span className="desc">{item.description}</span>
              <div className="tags">
                <Tag color="#f50" style={{fontSize: "12px", padding: "2px 4px"}}>{item.age_rating}</Tag>
                <Tag color="#2db7f5" style={{fontSize: "12px", padding: "2px 4px"}}>{item.genre}</Tag>
              </div>
              {!shouldRenderLinks && (
                <Button
                  size={50}
                  className="play-btn"
                  style={{width: "200px"}}
                  onClick={() =>
                    navigate("/gamedetails", { state: { game: item } })
                  }
                >
                  PLAY
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Homepage;
