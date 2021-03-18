import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface HeaderProps {
  pathName: string;
  isMaster: boolean;
}

function Header({ pathName, isMaster }: HeaderProps) {
  return (
    <div className="header">
      <div className="utill">
        {isMaster && (
          <NaviLink pathName={pathName} value="/admin">
            <Link to="/admin">ADMIN</Link>
          </NaviLink>
        )}
      </div>
      <Navigator className="url">
        <NaviLink pathName={pathName} value="/main">
          <Link to="/main">HOME</Link>
        </NaviLink>
        <NaviLink pathName={pathName} value="/discount">
          <Link to="/discount">할인율</Link>
        </NaviLink>
        <NaviLink pathName={pathName} value="/promotion">
          <Link to="/promotion">프로모션</Link>
        </NaviLink>
        <NaviLink pathName={pathName} value="/fta">
          <Link to="/fta">FTA</Link>
        </NaviLink>
        <NaviLink pathName={pathName} value="/estimate">
          <Link to="/estimate">견적</Link>
        </NaviLink>
        <NaviLink pathName={pathName} value="/development">
          <Link to="/development">개발</Link>
        </NaviLink>
        <NaviLink pathName={pathName} value="/as">
          <Link to="/as">AS</Link>
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
  background-color: white;
  height: 2.5rem;

  a {
    margin-left: 36px;
    text-decoration: none;
  }
`;

const NaviLink = styled.div<NavigatorProps>`
  a {
    color: ${({ pathName, value }) =>
      pathName.indexOf(value) >= 0 ? 'rgb(55, 152, 182)' : 'rgb(59, 59, 59)'};
    font-weight: ${({ pathName, value }) => (pathName.indexOf(value) >= 0 ? '600' : '400')};
  }
`;

export default Header;
