/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from '@emotion/react';
import GenericContainer from '../GenericContainer';

const style = css({
  padding: '20px',
  marginTop: 'var(--searchbar-margin-top)',
});

const Notification = ({
  children,
  additionalStyle,
}: {
  children: React.ReactNode;
  additionalStyle?: SerializedStyles;
}) => {
  return (
    <GenericContainer
      additionalStyle={additionalStyle ? [style, additionalStyle] : style}
    >
      {children}
    </GenericContainer>
  );
};

export default Notification;
