/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginDetails } from '../types';
import { Button, Input, Spinner } from './styledComponentsLibrary';

interface LoginFormProps {
  onSubmit: (data: LoginDetails) => void;
  buttonLabel: string;
}

type FormData = {
  email: string;
  password: string;
};

const LoginForm = ({ onSubmit, buttonLabel }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm<FormData>(); // React-hook-form

  // useEffect(() => {
  //   console.log('Submitting...');
  // }, [isSubmitting]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <div>
        <Input
          id='email'
          name='email'
          type='email'
          placeholder='Sign up with your email'
          ref={register({ required: true })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p>Handle this email error</p>}
      </div>
      <div>
        <Input
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          ref={register({ required: true, minLength: 8, maxLength: 64 })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && <p>Handle this password error</p>}
      </div>
      <div>
        <Button type='submit' variant='primary'>
          {/* {isSubmitting ? <Spinner /> : buttonLabel} */}
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
