import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  pathName: string;
}

function AdminHeader({ pathName }: AdminHeaderProps) {
  return (
    <div className="header">
      <div className="utill">
        <Link to="/main">메인페이지로</Link>
      </div>
      <Navigator className="url">
        <NaviLink pathName={pathName} value="/admin">
          <Link to="/admin">HOME</Link>
        </NaviLink>
        <NaviLink pathName={pathName} value="/admin/account">
          <Link to="/admin/account">계정관리</Link>
        </NaviLink>
        <NaviLink pathName={pathName} value="/admin/product">
          <Link to="/admin/product">제품관리</Link>
        </NaviLink>
      </Navigator>
    </div>
  );
}

interface NavigatorProps {
  pathName: string;
  value: string;
}

const Navigator = styled.div`
  margin: 25px 30px;
  display: flex;
  justify-content: center;

  a {
    margin-left: 36px;
    text-decoration: none;
  }
`;

const NaviLink = styled.div<NavigatorProps>`
  a {
    color: ${({ pathName, value }) => (pathName === value ? '#d193f5' : 'black')};
  }
`;

export default AdminHeader;
