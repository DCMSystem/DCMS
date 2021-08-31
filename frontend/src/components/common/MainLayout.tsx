import React, { useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { setUserInfo } from 'app/user/userThunk';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { push } from 'lib/historyUtils';
import { decrypt } from 'lib/crypto';
import { useAppSelector } from 'app/hooks';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

function MainLayout({ component: Component, ...rest }: IProps) {
  const dispatch = useDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  useEffect(() => {
    const user = window.localStorage.getItem('info');

    if (userInfo.id) {
      return;
    }

    if (!user && !userInfo.id) {
      push('/');
    }

    if (user) {
      const userDecrypt = decrypt({ data: user });
      if (!userDecrypt || !userDecrypt.id) {
        push('/');
      } else {
        dispatch(setUserInfo(userDecrypt));
      }
    }
  }, []);

  const getLogout = () => {
    window.localStorage.removeItem('info');
    push('/');
  };

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div className="main">
          <Header pathName={pathname} isMaster={userInfo.isMaster} getLogout={getLogout} />
          <Component {...matchProps} />
        </div>
      )}
    />
  );
}

export default MainLayout;
