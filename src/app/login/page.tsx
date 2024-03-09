import React from 'react';
import { login, signup } from './actions';
import LoginInfo from '@/components/login/login-info';

const LoginPage = () => {
  return (
    <div>
      <LoginInfo />
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </div>
  );
};

export default LoginPage;
