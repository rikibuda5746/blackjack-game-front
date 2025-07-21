import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Registration.module.scss';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '@features/auth/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from '@features/auth/store/authSlice';
import AuthForm from '../shared/AuthForm';
import AuthField from '../shared/AuthField';
import { useState } from 'react';

type registerFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<registerFormData>();
  const [registerMutation] = useRegisterMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmitFunction = async (data: registerFormData) => {
    try {
      setError(''); 
      const registerResponse = await registerMutation({ 
        name: data.name, 
        password: data.password, 
        email: data.email 
      }).unwrap();
      if (!registerResponse.accessToken || !registerResponse.refreshToken) {
        throw new Error('Invalid response: missing tokens');
      }
      dispatch(setCredentials(registerResponse)); 
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });

    } catch (err: any) {
      setError(err?.data?.error?.message || err?.message || 'Registration failed. Please try again.');
      dispatch(logout()); 
    }
  };

  return (
    <AuthForm title="Sign Up" onSubmit={handleSubmit(onSubmitFunction)} error={error}>
      <AuthField
        label="Name"
        autoComplete="name"
        autoFocus
        {...register('name', { required: 'name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <AuthField
        label="Email Address"
        autoComplete="email"
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
        autoComplete="new-password"
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
      <AuthField
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === watch('password') || 'Passwords do not match',
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={styles.submitClass}
      >
        Sign Up
      </Button>
      <Link to="/login" className={styles.secondaryBtn}>
        Already have an account? Sign In
      </Link>
    </AuthForm>
  );
};

export default Register;
