import React, { useEffect } from 'react';
import { useAppSelector } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { getUserList, openUserModal, closeUserModal, signup, deleteUser } from 'app/user/userThunk';
import { Button } from '@material-ui/core';
import SignupModal from './SignupModal';

function Account() {
  const dispatch = useDispatch();
  const { userList, userModal } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  const onButtonClick = () => {
    dispatch(openUserModal('signup'));
  };

  const onModalClose = () => {
    dispatch(closeUserModal());
  };

  const onAccountSubmit = ({
    id,
    password,
    isMaster,
  }: {
    id: string;
    password: string;
    isMaster: boolean;
  }) => {
    dispatch(signup({ id, password, isMaster }));
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget;
    dispatch(deleteUser({ id }));
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={onButtonClick}>
        사용자 추가
      </Button>
      {userList.map((data, idx) => (
        <div key={data.id}>
          {idx + 1}. {data.id} {data.isMaster ? '관리자' : '사용자'}
          <button onClick={onDeleteClick} id={data.id}>
            삭제
          </button>
        </div>
      ))}
      {userModal && (
        <SignupModal open={userModal} onClose={onModalClose} onSubmit={onAccountSubmit} />
      )}
    </div>
  );
}

export default Account;
