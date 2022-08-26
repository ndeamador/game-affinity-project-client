/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import GenericContainer from './GenericContainer';

const style = css({
  padding: '20px',
  marginTop: 'var(--searchbar-margin-top)',
})

const Notification = ({ children }: { children: React.ReactNode }) => {
  return <GenericContainer additionalStyle={style}>{children}</GenericContainer>;
};

export default Notification;
