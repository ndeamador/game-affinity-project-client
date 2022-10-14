/** @jsxImportSource @emotion/react */

import { SerializedStyles } from '@emotion/react';
import styles from './styles';

const GenericContainer = ({
  children,
  additionalStyle,
}: {
  children: React.ReactNode;
  additionalStyle?: SerializedStyles | SerializedStyles[];
}) => {
  return <div css={[styles.container, additionalStyle]}>{children}</div>;
};

export default GenericContainer;
