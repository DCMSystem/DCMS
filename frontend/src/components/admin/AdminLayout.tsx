import React, { useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { setUserInfo } from 'app/user/userThunk';
import { useDispatch } from 'react-redux';
import { push } from 'lib/historyUtils';
import { decrypt } from 'lib/crypto';
import { useAppSelector } from 'app/hooks';
import AdminHeader from './AdminHeader';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

function AdminMainLayout({ component: Component, ...rest }: IProps) {
  const dispatch = useDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  useEffect(() => {
    if (userInfo.id && userInfo.isMaster) {
      return;
    }

    const user = window.localStorage.getItem('info');

    if (!user && !userInfo.id) {
      push('/');
    }

    if (user) {
      const userDecrypt = decrypt({ data: user });
      if (!userDecrypt || !userDecrypt.id || !userDecrypt.isMaster) {
        push('/');
      } else {
        dispatch(setUserInfo(userDecrypt));
      }
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div className="main admin">
          <AdminHeader pathName={pathname} />
          <Component {...matchProps} />
        </div>
      )}
    />
  );
}

export default AdminMainLayout;
