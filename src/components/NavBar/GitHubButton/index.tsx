/** @jsxImportSource @emotion/react */

import Tooltip from '@reach/tooltip';
import { FaGithub } from 'react-icons/fa';
import { CircleButton } from '../../shared/styledComponentsLibrary';
import styles from './styles';

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
