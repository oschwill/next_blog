'use client';

import { login } from '@/lib/action';
import { useFormState } from 'react-dom';
import Link from 'next/link';
/* CSS */
import styles from './loginForm.module.css';

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state?.error && (
        <p style={{ backgroundColor: 'pink', color: 'darkred', padding: '5px' }}>{state.error}</p>
      )}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>{' '}
    </form>
  );
};

export default LoginForm;
