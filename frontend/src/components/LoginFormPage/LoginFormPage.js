import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='container'>
        <div className="top-bar">
                {/* <span className="x">X</span> */}
                <span className="log-in">Log in or sign up</span>
        </div>
        <div className='welcome'>
            <span>Welcome To AirBenbe</span>
        </div>
        <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div>
            <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className='username-email'
            placeholder='Username or Email'
            />
        </div>
        <div>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='password'
            placeholder='Password'
            />
        </div>
        <div>
        <button className='login' type="submit">Continue</button>
        </div>
        </form>
    </div>
    );
    }

export default LoginFormPage;