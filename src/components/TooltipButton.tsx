/** @jsxImportSource @emotion/react */
import { CircleButton, Spinner } from './styledComponentsLibrary';
import Tooltip from '@reach/tooltip';
import { FaTimesCircle } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import * as colors from '../styles/colors';

interface TooltipButtonProps {
  label: string;
  highlight?: string;
  onClick: () => void;
  // icon: IconType;
  icon: IconBaseProps; //https://stackoverflow.com/questions/60819522/typescript-compilation-error-with-react-type-element-is-not-assignable-to-ty
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

function TooltipButton({
  label,
  onClick,
  icon,
  highlight=colors.indigo,
  isLoading,
  isError,
  errorMessage,
  ...rest
}: TooltipButtonProps) {
  // const { isLoading, isError, error, run } = useAsync();

  function handleClick() {
    // run(onClick());
    onClick();
  }

  const error = {
    message: errorMessage,
  };

  console.log('INSIDE: loading:', isLoading, ' - error: ', isError);

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
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
