/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from '@emotion/react';

const style = css({
  display: 'flex',
  // padding: '10px',
  backgroundColor: 'var(--item-list-background)',
  borderRadius: 'var(--border-radius)',
})

const GenericContainer = ({ children, additionalStyle }: { children: React.ReactNode, additionalStyle: SerializedStyles }) => {
  return <div css={[style, additionalStyle]}>{children}</div>;
};

export default GenericContainer;
