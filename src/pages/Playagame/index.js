import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { addPointsEarned } from '../../firebase/api';
import { auth } from '../../firebase/utils';

const Playgame = () => {
  const getContext = (gameId) => {
    switch (gameId) {
      case '0643bf76-6fc1-4a0d-85ef-1c623460ef27':
        return {
          loaderUrl: '/build/SW.loader.js',
          dataUrl: '/build/SW.data.unityweb',
          frameworkUrl: '/build/SW.framework.js.unityweb',
          codeUrl: '/build/SW.wasm.unityweb',
        };
      case 'fdf0745d-e3f6-4591-bdbe-2232707a38de':
        return {
          loaderUrl: '/build/Racer.loader.js',
          dataUrl: '/build/Racer.data.unityweb',
          frameworkUrl: '/build/Racer.framework.js.unityweb',
          codeUrl: '/build/Racer.wasm.unityweb',
        };
      case 'd02f12e1-65a4-4e4c-9526-168ee3bf5bdf':
        return {
          loaderUrl: '/build/jumper.loader.js',
          dataUrl: '/build/jumper.data.unityweb',
          frameworkUrl: '/build/jumper.framework.js.unityweb',
          codeUrl: '/build/jumper.wasm.unityweb',
        };
      case '85d7d00e-dba3-489d-97f1-3c9ef437cef5':
        return {
          loaderUrl: '/build/GB.loader.js',
          dataUrl: '/build/GB.data.unityweb',
          frameworkUrl: '/build/GB.framework.js.unityweb',
          codeUrl: '/build/GB.wasm.unityweb',
        };
      default:
        return {
          loaderUrl: '/build/Raceing.loader.js',
          dataUrl: '/build/Raceing.data.unityweb',
          frameworkUrl: '/build/Raceing.framework.js.unityweb',
          codeUrl: '/build/Raceing.wasm.unityweb',
        };
    }
  };

  const { id } = useParams();
  const { unityProvider } = useUnityContext(getContext(id));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const user = auth.currentUser;
      addPointsEarned(user.uid, 2);
      console.log(`Updating backend with playtime: 2 seconds`);
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Unity
        unityProvider={unityProvider}
        style={{ height: '100vh', width: '100vw' }}
      />
    </div>
  );
};

export default Playgame;
