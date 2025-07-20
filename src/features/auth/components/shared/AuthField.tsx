import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type AuthFieldProps = TextFieldProps & {
  register?: any;
};

const AuthField: React.FC<AuthFieldProps> = ({
  register,
  error,
  helperText,
  ...rest
}) => (
  <TextField
    margin="normal"
    fullWidth
    error={!!error}
    helperText={helperText}
    {...register}
    {...rest}
  />
);

export default AuthField; 