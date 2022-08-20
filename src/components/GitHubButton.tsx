/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Tooltip from '@reach/tooltip';
import { FaGithub } from 'react-icons/fa';
import { CircleButton } from './styledComponentsLibrary';

const styles = {
  linkStyle: css({
    marginLeft: '15px',
  }),
  tooltipStyle: css({
    zIndex: 200,
  }),
  buttonStyle: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--regular-button-background-color)',
    '&:hover': {
      color: 'var(--color-indigo)',
      // backgroundColor: 'var(--item-list-background)',
    },
  }),
  iconDivStyle: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }),
  iconStyle: css({
    width: 'auto',
    height: '65%',
  }),
};

const GitHubButton = () => {
  return (
    <a
      href='https://github.com/ndeamador/game-affinity-project-client'
      css={styles.linkStyle}
      target="_blank" rel="noreferrer noopener" // open link in new tab.
    >
      <Tooltip label='View GitHub repository' css={styles.tooltipStyle}>
        <CircleButton css={styles.buttonStyle}>
          <div css={styles.iconDivStyle}>
            <FaGithub css={styles.iconStyle} />
          </div>
        </CircleButton>
      </Tooltip>
    </a>
  );
};

export default GitHubButton;