import { useForm } from 'react-hook-form';
import { LoginDetails } from '../types';

interface LoginFormProps {
  onSubmit: (data: LoginDetails) => void;
  buttonLabel: string;
}

type FormData = {
  email: string;
  password: string;
};

const LoginForm = ({ onSubmit, buttonLabel }: LoginFormProps) => {
  const { register, handleSubmit, errors } = useForm<FormData>(); // React-hook-form


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
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
        <input
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
        <button type='submit'>{buttonLabel}</button>
      </div>
    </form>
  );
};

export default LoginForm;
