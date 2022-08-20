/** @jsxImportSource @emotion/react */
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { LOGIN, REGISTER_NEW_USER } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { LoginDetails, OpenLoginRegisterModalOptions } from '../types';
import { capitalizeFirstLetter } from '../utils/misc';
import { Button, Input, Spinner } from './styledComponentsLibrary';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useEffect } from 'react';
import { ErrorNotification } from './styledComponentsLibrary';
import { css } from '@emotion/react';

// Styles
// ===========================================================
const styles = {
  form: css({
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    '> .inputErrorDiv': {
      margin: '0 0 25px 0',
      width: '100%',
      minWidth: '250px',
    },
  }),
  input: css({
    backgroundColor: 'var(--inner-content-background-color)',
  }),
  submitButtonAndNotificationDiv: css({
    alignSelf: 'flex-start',
  }),
  submitButton: css({
    height: '40px',
    minWidth: '75px',
  }),
  notification: css({
    marginLeft: '20px',
  }),
};

// TypeScript definitions
// ===========================================================
interface LoginFormProps {
  setOpenModal: React.Dispatch<
    React.SetStateAction<OpenLoginRegisterModalOptions>
  >;
  loginOrRegister: 'login' | 'register';
}

type FormInputs = {
  email: string;
  password: string;
};

// Yup validation schema
// ===========================================================
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Enter your email.')
    .email('Enter a valid email.'),
  password: yup
    .string()
    .required('Enter your password')
    .min(8, 'Password must have minimum 8 characters.')
    .max(64, `Password cannot exceed 64 characters`),
});

// ===========================================================
// FORM COMPONENT
// ===========================================================

const LoginForm = ({
  // onSubmit,
  // buttonLabel,
  // loading,
  setOpenModal,
  loginOrRegister,
}: LoginFormProps) => {
  // ===========================================================
  // GraphQL Mutations
  // ===========================================================
  const [registerNewUser, { loading: registerLoading, error: registerError }] =
    useMutation(REGISTER_NEW_USER, {
      onCompleted: () => {
        setOpenModal('none');
      },
      onError: (err) => {
        console.log('register error:', err.message);
      },
      refetchQueries: [{ query: CURRENT_USER }],
    });

  const [login, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN,
    {
      onCompleted: () => {
        setOpenModal('none');
      },
      onError: (err) => {
        console.log('login error:', err.message);
      },
      refetchQueries: [{ query: CURRENT_USER }],
    }
  );

  // ===========================================================
  // Form Hook
  // ===========================================================
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors /* isSubmitting */ }, // There seem to be some complications rendering the loading spinner using the isSubmitting property, so I pass instead Apollo's query loading states.
  } = useForm<FormInputs>({ resolver: yupResolver(schema) }); // React-hook-form with Yup validation schema

  // ===========================================================
  // Server error state
  // ===========================================================
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [serverErrorTimer, setServerErrorTimer] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  useEffect(() => {
    const notificationTimeout = 4000;

    if (serverErrorTimer) clearTimeout(serverErrorTimer);

    if (loginError) {
      setServerError(loginError.message);
      setServerErrorTimer(
        setTimeout(() => setServerError(undefined), notificationTimeout)
      );
    } else if (registerError) {
      setServerError(registerError.message);
      setServerErrorTimer(
        setTimeout(() => setServerError(undefined), notificationTimeout)
      );
    }
  }, [loginError, registerError]);

  useEffect(() => {
    // Clear timeouts to prevent state updates if the modal is unmounted
    if (serverErrorTimer) clearTimeout(serverErrorTimer);
  }, [setOpenModal]);

  // ===========================================================
  // Submit handlers
  // ===========================================================
  const submitLogin = async (data: LoginDetails) => {
    login({ variables: { email: data.email, password: data.password } });
  };

  const submitRegistration = (data: LoginDetails) => {
    registerNewUser({
      variables: { email: data.email, password: data.password },
    });
  };

  const onSubmit =
    loginOrRegister === 'login' ? submitLogin : submitRegistration;
  const loading = loginOrRegister === 'login' ? loginLoading : registerLoading;

  // ===========================================================
  // RETURN
  // ===========================================================
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate css={styles.form}>
      <div className='inputErrorDiv'>
        <Input
          id='email'
          // name='email'
          type='email'
          aria-label='email'
          placeholder='Sign up with your email'
          // ref={register({ required: true })}
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', { required: true })}
          css={styles.input}
        />
        <ErrorNotification variant='stacked'>
          {errors?.email?.message}
        </ErrorNotification>
      </div>
      <div className='inputErrorDiv'>
        <Input
          id='password'
          // name='password'
          type='password'
          placeholder='Password'
          // ref={register({ required: true, minLength: 8, maxLength: 64 })}
          aria-invalid={errors.password ? 'true' : 'false'}
          {...register('password', {
            required: true,
            maxLength: 64,
            minLength: 8,
          })}
          css={styles.input}
        />
        <ErrorNotification variant='stacked'>
          {errors?.password?.message}
        </ErrorNotification>
      </div>
      <div css={styles.submitButtonAndNotificationDiv}>
        <Button type='submit' variant='primary' css={styles.submitButton}>
          {loading ? <Spinner /> : capitalizeFirstLetter(loginOrRegister)}
        </Button>
        {serverError && (
          <ErrorNotification variant='inline' css={styles.notification}>
            {serverError}
          </ErrorNotification>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
