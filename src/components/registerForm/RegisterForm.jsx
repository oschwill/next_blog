'use client';

import { register } from '@/lib/action';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/* CSS */
import styles from '../RegisterForm.module.css';

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    // Weiterleiten auf die Login Page
    state?.success && router.push('/login');
  }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input type="password" placeholder="password again" name="passwordRepeat" />
      <button>Register</button>
      {state?.error && (
        <p style={{ backgroundColor: 'pink', color: 'darkred', padding: '5px' }}>{state.error}</p>
      )}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
