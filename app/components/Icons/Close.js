import React from 'react';
import StyledIcon from './StyledIcon';

function Close(props) {
  return (
    <StyledIcon viewBox="0 0 24 24" a11yTitle="Search" {...props}>
      <polygon
        fill="inherit"
        stroke="none"
        points="19.71 5.71 18.29 4.29 12 10.59 5.71 4.29 4.29 5.71 10.59 12 4.29 18.29 5.71 19.71 12 13.41 18.29 19.71 19.71 18.29 13.41 12 19.71 5.71"
      />
    </StyledIcon>
  );
}

export default Close;
