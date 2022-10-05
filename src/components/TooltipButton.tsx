/** @jsxImportSource @emotion/react */
import { CircleButton, Spinner } from './styledComponentsLibrary';
import Tooltip from '@reach/tooltip';
import { FaTimesCircle } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import { css } from '@emotion/react';

const style = css({
  '&:hover, :focus': {
    color: 'var(--color-indigo)',
  },
});

const errorStyle = css({
  color: 'var(--color-danger)',
});

const altHighlightStyle = css({
  '&:hover,:focus': {
    color: 'var(--color-danger)',
  },
});

const loadingStyle = css({
  color: 'var(--color-gray80)',
  '&:hover, :focus': {
    color: 'var(--color-gray80)',
  },
});

const iconDivStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

interface TooltipButtonProps {
  label: string;
  altColor?: boolean;
  onClick: () => void;
  // icon: IconType;
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
          style,
          altColor && altHighlightStyle,
          isError && errorStyle,
          isLoading && loadingStyle,
        ]}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        transparent
        {...rest}
      >
        <div css={iconDivStyle}>
          {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
        </div>
      </CircleButton>
    </Tooltip>
  );
}

export default TooltipButton;
