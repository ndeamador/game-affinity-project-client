/** @jsxImportSource @emotion/react */
import {
  CircleButton,
  Spinner,
} from 'components/shared/styledComponentsLibrary';
import Tooltip from '@reach/tooltip';
import { FaTimesCircle } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import styles from './styles';

interface TooltipButtonProps {
  label: string;
  altColor?: boolean;
  onClick: () => void;
  icon?: IconBaseProps; //https://stackoverflow.com/questions/60819522/typescript-compilation-error-with-react-type-element-is-not-assignable-to-ty
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

function TooltipButton({
  label,
  onClick,
  icon,
  isLoading,
  isError,
  errorMessage,
  altColor,
  ...rest
}: TooltipButtonProps) {
  function handleClick(event: React.SyntheticEvent) {
    // These two prevent that clicking the button also triggers other clickables underneath (like a react-router's Link)
    event.stopPropagation();
    event.preventDefault();

    onClick();
  }

  const error = {
    message: errorMessage,
  };

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={[
          styles.button,
          altColor && styles.altHighlightStyle,
          isError && styles.errorStyle,
          isLoading && styles.loadingStyle,
        ]}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        transparentTopRight
        {...rest}
      >
        <div css={styles.iconDivStyle}>
          {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
        </div>
      </CircleButton>
    </Tooltip>
  );
}

export default TooltipButton;
