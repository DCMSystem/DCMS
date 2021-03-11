import React, { useEffect } from 'react';
import { useAppSelector } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { getUserList, openUserModal, closeUserModal, signup, deleteUser } from 'app/user/userThunk';
import SignupModal from './SignupModal';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';

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
    <div className="account-wrapper">
      <div className="account-button">
        <IconButton aria-label="addUser" onClick={onButtonClick} className="add-button">
          <PersonAddIcon color="primary" style={{ fontSize: '35px' }} />
        </IconButton>
      </div>
      <hr />
      {userList.map((data, idx) => (
        <div key={data.id} className="account">
          <span>{idx + 1}.</span>
          <span className="account-id">{data.id}</span>
          <span className="account-master">{data.isMaster ? '관리자' : '사용자'}</span>
          <IconButton aria-label="addUser" onClick={onDeleteClick} id={data.id}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      {userModal && (
        <SignupModal open={userModal} onClose={onModalClose} onSubmit={onAccountSubmit} />
      )}
    </div>
  );
}

export default Account;
