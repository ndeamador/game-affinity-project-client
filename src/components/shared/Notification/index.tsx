/** @jsxImportSource @emotion/react */

import { SerializedStyles } from '@emotion/react';
import GenericContainer from 'components/shared/GenericContainer';
import styles from './styles';

const Notification = ({
  children,
  additionalStyle,
}: {
  children: React.ReactNode;
  additionalStyle?: SerializedStyles;
}) => {
  return (
    <GenericContainer
      additionalStyle={
        additionalStyle ? [styles.container, additionalStyle] : styles.container
      }
    >
      {children}
    </GenericContainer>
  );
};

export default Notification;
