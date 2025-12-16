import React, { useState } from 'react';
import { useTranslation } from '@/theme2/hooks';
import { LanguageSelector } from '@/theme2/components';
import './index.scss';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', { username, password, rememberMe });
  };

  return (
    <div className="login-container">
      <div className="absolute top-4 right-4">
        <LanguageSelector variant="minimal" />
      </div>
      
      <form id="login" onSubmit={handleSubmit}>
        <div className="box">
          <h2 className="text-2xl font-bold text-center mb-6">
            {t('pages.login.title')}
          </h2>
          <div className="data col-xs-2">
            <label htmlFor="username">{t('pages.login.username')}:</label>
            <input
              className="form-control text-center mb-4"
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              placeholder={t('pages.login.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">{t('pages.login.password')}:</label>
            <input
              className="form-control text-center mb-4"
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              placeholder={t('pages.login.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor='rememberme' className='font-normal'>
              {t('pages.login.rememberMe').toUpperCase()}
            </label>
            <input
              type="checkbox"
              id='rememberme'
              name="rememberme"
              value="rememberme"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="form-control"
            />
            <br />
            <input
              className="btn btn-primary btn-block"
              style={{ width: '304px' }}
              type="submit"
              name="Submit"
              value={t('pages.login.loginButton').toUpperCase()}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
