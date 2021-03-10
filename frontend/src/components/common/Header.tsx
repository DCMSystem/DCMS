import React from 'react';

interface HeaderProps {
  pathName: string;
}

function Header({ pathName }: HeaderProps) {
  return <div>header : {pathName}</div>;
}

export default Header;
