/** @jsxImportSource @emotion/react */
import { CircleButton, Spinner } from './styledComponentsLibrary';
import Tooltip from '@reach/tooltip';
import { FaTimesCircle } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
// import * as colors from '../styles/colors';

interface TooltipButtonProps {
  label: string;
  highlight?: string;
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
  highlight = 'var(--colors-indigo)',
  isLoading,
  isError,
  errorMessage,
  ...rest
}: TooltipButtonProps) {
  // const { isLoading, isError, error, run } = useAsync();

  function handleClick(event: React.SyntheticEvent) {
    // run(onClick());

    // These two prevent that clicking the button also triggers other clickables underneath (like a react-router's Link)
    event.stopPropagation();
    event.preventDefault();

    onClick();
  }

  const error = {
    message: errorMessage,
  };

  // console.log('In Tooltipbutton: loading:', isLoading, ' - error: ', isError);

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          color: isError ? 'var(--colors-danger)' : 'var(--colors-gray80)',
          ':hover,:focus': {
            color: isLoading
              ? 'var(--colors-gray80)'
              : isError
              ? 'var(--colors-danger)'
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  );
}

export default TooltipButton;
