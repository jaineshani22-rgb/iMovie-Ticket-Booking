import React from 'react';
import AuthCard from '../components/AuthCard';

const Login = () => {
  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-8 sm:py-12">
      <AuthCard initialMode="login" />
    </div>
  );
};

export default Login;