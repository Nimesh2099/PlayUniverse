import React from 'react';
import { auth } from './../../firebase/utils';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import Logo from './../../assets/logo.png';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserData } from '../../firebase/api';
import './styles.scss';

const Header = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({});
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    getUserData(setUserData);
  }, []);
  let shouldRenderLinks =
    user?.email === '' || user === null || userData.is_blocked;
  let shouldRenderProfile = user?.email === '' || user === null;
  let isAdmin = userData.isAdmin;
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <img src={Logo} alt='Play Universe logo' />
        </Link>
      </div>
      {userData.is_blocked && (
        <div className='blocked-msg'>
          <span>You are blocked by Admin</span>{' '}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!shouldRenderLinks ? (
          <div className='navigation-links'>
            <Link
              className='navigation-text'
              to='/games'
              style={{ paddingRight: '20px', color: 'white' }}
            >
              Games
            </Link>
            <Link
              className='navigation-text'
              to='/LeaderBoard'
              style={{ paddingRight: '20px', color: 'white' }}
            >
              LeaderBoard
            </Link>
            {isAdmin && (
              <>
                <Link
                  className='navigation-text'
                  to='/admin-dashboard-users'
                  style={{ paddingRight: '20px', color: 'white' }}
                >
                  Users
                </Link>
                <Link
                  className='navigation-text'
                  to='/admin-dashboard-games'
                  style={{ paddingRight: '20px', color: 'white' }}
                >
                  Add Games
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className='navigation-links'>
            <Link
              className='navigation-text'
              to='/login'
              style={{ paddingRight: '20px', color: 'white' }}
            >
              Login
            </Link>
            <Link
              className='navigation-text'
              to='/registration'
              style={{ paddingRight: '20px', color: 'white' }}
            >
              Sign Up
            </Link>
          </div>
        )}
        <div className='callToActions'>
          {!shouldRenderProfile && (
            <Avatar
              style={{
                backgroundColor: '#428bebe0',
                verticalAlign: 'middle',
                marginLeft: '20px',
                cursor: 'pointer',
              }}
              size='large'
              gap={2}
              icon={<UserOutlined />}
              onClick={() => navigate('/profile')}
            >
              Rutvik
            </Avatar>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
