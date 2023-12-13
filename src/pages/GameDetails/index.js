import React, { useEffect, useMemo, useState } from 'react';
import {
  Row,
  Tag,
  Typography,
  Rate,
  Input,
  Button,
  Divider,
  Avatar,
  Col,
} from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import {
  addComment,
  getUserData,
  getGameData,
  addRating,
} from '../../firebase/api';
import { auth } from '../../firebase/utils';

const GameDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
  });
  const [comment, setComment] = useState('');
  const [ratingStar, setRatingStar] = useState(0);
  const [game, setGameData] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    getUserData(setUser);
    getGameData(setGameData, location.state.game.game_id);
  }, []);

  const { Title, Paragraph } = Typography;
  const { TextArea } = Input;

  const handleChangeRating = (value) => {
    setRatingStar(value);
    setDisableBtn(false);
  };

  const getRating = useMemo(() => {
    let totalRatings = game.ratings?.reduce(
      (accumulator, item) => accumulator + item.rating,
      0
    );
    let totalNumberOfUsers = game.ratings?.length || 1;
    return totalRatings / totalNumberOfUsers;
  }, [game]);

  const openInNewTab = (path) => {
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.location.href = path;
    } else {
      navigate(path);
    }
  };

  return (
    <Row className='game-details-container'>
      <div
        className='image-container0'
        onClick={() => openInNewTab(`/playgame/${location.state.game.game_id}`)}
      >
        <img src={game.banner} alt='banner' className='back-banner' />
        <PlayCircleOutlined className='play-btn-details' size={100} />
      </div>
      <Title className='game-title'>
        {game.title}&nbsp; <Tag color='green'>{game.age_rating}</Tag>
        <Tag color='blue'>{game.genre}</Tag>
      </Title>
      <Paragraph className='paragraph-desc'>{game.description}</Paragraph>
      <Rate
        allowHalf
        defaultValue={getRating}
        value={getRating}
        disabled
        style={{ background: 'black' }}
        className='rateings'
      />
      <Divider
        style={{
          background: 'white',
          height: '2px',
        }}
      />
      <Title level={3} className='cmt-title'>
        Rating
      </Title>
      <Row
        gutter={[10, 10]}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col span={24}>
          <Rate
            onChange={handleChangeRating}
            allowHalf
            defaultValue={ratingStar}
            style={{ background: 'black' }}
            className='rateings'
          />
        </Col>
        <Col span={24}>
          {!disableBtn && (
            <Button
              onClick={() =>
                addRating(
                  {
                    name: user.firstName + ' ' + user.lastName,
                    rating: ratingStar,
                    profile_url: '',
                  },
                  location.state.game.id,
                  () => {
                    setDisableBtn(true);
                  }
                )
              }
            >
              Submit
            </Button>
          )}
        </Col>
      </Row>
      <Divider
        style={{
          background: 'white', // Set the background color
          height: '2px', // Set the height (thickness) of the divider
        }}
      />
      <Title level={3} className='cmt-title'>
        Comments
      </Title>
      <div className='comment-list'>
        {game.comments?.map((item) => {
          return (
            <Row gutter={[5, 5]} style={{ padding: '10px 20px' }} key={item.id}>
              <Col
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar src={<img src={game.banner} alt='avatar' />} />
                <Title level={5} className='user-name' style={{}}>
                  {item.name}
                </Title>
              </Col>
              <Col span={24}>
                <Paragraph className='cmnt-desc'>{item.comment}</Paragraph>
              </Col>
            </Row>
          );
        })}
      </div>
      <TextArea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='comment'
        maxLength={6}
        className='comment'
      />
      <Button
        type='primary'
        className='cmnt-btn'
        onClick={() =>
          addComment(
            {
              name: user.firstName + ' ' + user.lastName,
              comment,
              profile_url: '',
              user_id: user.user_id,
            },
            location.state.game.id,
            () => {
              getGameData(setGameData, location.state.game.id);
              setComment('');
            }
          )
        }
      >
        Comment
      </Button>
    </Row>
  );
};

export default GameDetails;
