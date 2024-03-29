/** @jsxImportSource @emotion/react */

import Tooltip from '@reach/tooltip';
import { CircleButton } from 'components/shared/CircleButton';
import { FaGithub } from 'react-icons/fa';
import styles from './GitHubButton.styles';

const GitHubButton = () => {
  return (
    <a
      href='https://github.com/ndeamador/game-affinity-project-client'
      css={styles.linkStyle}
      target='_blank'
      rel='noreferrer noopener' // open link in new tab.
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
