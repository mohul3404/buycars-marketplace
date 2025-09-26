import { useState } from 'react'; 
import './AuthPage.css';

function AuthPage() {
  
  const [isLoginView, setIsLoginView] = useState(true);


  const toggleView = () => {
    setIsLoginView(!isLoginView); 
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {}
        <h2>{isLoginView ? 'Welcome Back!' : 'Create an Account'}</h2>
        <p>
          {isLoginView
            ? 'Enter your credentials to access your account.'
            : 'Fill in the details below to get started.'}
        </p>
        
        <form className="auth-form">
          {}
          {!isLoginView && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>

          <button type="submit" className="auth-button">
            {isLoginView ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-switch">
          <p>
            {isLoginView ? "Don't have an account? " : 'Already have an account? '}
            {}
            <a onClick={toggleView}>
              {isLoginView ? 'Sign Up' : 'Log In'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;