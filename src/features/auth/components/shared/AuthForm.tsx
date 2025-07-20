import React, { ReactNode, FormEventHandler } from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './AuthForm.module.scss';

type AuthFormProps = {
  title: string;
  children: ReactNode;
  error?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, children, onSubmit, error }) => (
  <Grid>
    <Grid className={styles.authContainer}>
      <Avatar className={styles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" className={styles.title} gutterBottom>
        {title}
      </Typography>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}
        {error && (
          <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
      </form>
    </Grid>
  </Grid>
);

export default AuthForm; 