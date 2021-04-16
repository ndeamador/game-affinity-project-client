/** @jsxImportSource @emotion/react */
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { LOGIN, REGISTER_NEW_USER } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { LoginDetails, OpenLoginRegisterModalOptions } from '../types';
import { capitalizeFirstLetter } from '../utils/misc';
import { Button, Input, Spinner } from './styledComponentsLibrary';

interface LoginFormProps {
  // onSubmit: (data: LoginDetails) => void;
  // buttonLabel: string;
  // loading: boolean;
  setOpenModal: React.Dispatch<
    React.SetStateAction<OpenLoginRegisterModalOptions>
  >;
  loginOrRegister: 'login' | 'register';
}

type FormInputs = {
  email: string;
  password: string;
};

const LoginForm = ({
  // onSubmit,
  // buttonLabel,
  // loading,
  setOpenModal,
  loginOrRegister,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }, // There seem to be some complications rendering the loading spinner using this property, so I pass instead Apollo's query loading states.
  } = useForm<FormInputs>(); // React-hook-form

  const [
    registerNewUser,
    { loading: registerLoading, error: registerError },
  ] = useMutation(REGISTER_NEW_USER, {
    onCompleted: (result) => {
      console.log(result);
      setOpenModal('none');
    },
    onError: (err) => {
      console.log(err.message);
    },
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const [login, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN,
    {
      onCompleted: (result) => {
        console.log('login result: ', result);
        setOpenModal('none');
      },
      onError: (err) => {
        console.log('login error:', err.message);
      },
      refetchQueries: [{ query: CURRENT_USER }],
    }
  );

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

  const serverError = loginError
    ? loginError.message
    : registerError
    ? registerError.message
    : undefined;

  console.log('backend reg error: ', registerError);
  console.log('backend log error: ', loginError);
  console.log('rhforms errors: ', errors);

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
          // name='email'
          type='email'
          aria-label='email'
          placeholder='Sign up with your email'
          // ref={register({ required: true })}
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', { required: true })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
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
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <Button type='submit' variant='primary'>
          {/* {isSubmitting ? <Spinner /> : buttonLabel} */}
          {loading ? <Spinner /> : capitalizeFirstLetter(loginOrRegister)}
        </Button>
        {serverError && <span>{serverError}</span>}
      </div>
    </form>
  );
};

export default LoginForm;
