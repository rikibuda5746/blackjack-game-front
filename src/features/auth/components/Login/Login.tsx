import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@features/auth/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@features/auth/store/authSlice';
import AuthForm from '../shared/AuthForm';
import AuthField from '../shared/AuthField';
import storageService from '@app/services/storageService';

type loginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<loginFormData>();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');

  const onSubmitFunction = async (data: loginFormData) => {
    try {
      setError(''); 
      const loginResponse = await login({ 
        email: data.email, 
        password: data.password 
      }).unwrap();
      if (!loginResponse.accessToken || !loginResponse.refreshToken) {
        throw new Error('Invalid response: missing tokens');
      }
    
      dispatch(setCredentials(loginResponse));

    } catch (err: any) {
      setError(err?.data?.error?.message || err?.message || 'Login failed. Please try again.');
      storageService.clearTokens();
    }
  };

  return (
    <AuthForm title="Sign In" onSubmit={handleSubmit(onSubmitFunction)} error={error}>
      <AuthField
        id="email"
        label="Email"
        autoComplete="username"
        autoFocus
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <AuthField
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register('password', {
          required: 'Password is required',
          validate: (value) => {
            const hasSpecial = /[!@#$%^&*]/.test(value);
            const isLongEnough = value.length >= 8;
            if (!isLongEnough) return 'Password must be at least 8 characters';
            if (!hasSpecial) return 'Password must include a special character';
            return true;
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={styles.submit}
      >
        Sign In
      </Button>
      <Link to="/registration" className={styles.secondaryBtn}>
        Don't have an account? Sign Up
      </Link>
    </AuthForm>
  );
};

export default Login;
