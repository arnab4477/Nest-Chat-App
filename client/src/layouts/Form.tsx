import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUserState } from '../contexts';
import { authenticateUser, registerUser } from '../utils';
import './Form.css';

export const Form = (props: { formType: 'Log in' | 'Sign up' }) => {
  const [_, setUser] = useUserState();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errormessage, setErrorMessage] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (props.formType === 'Sign up') {
      try {
        const newUser = await registerUser({ name, password });
        setUser!(newUser);
        setShowError(false);

        window.localStorage.setItem('user', JSON.stringify(newUser));

        navigate('/');
      } catch (err: any) {
        setErrorMessage(err.response.data.message);
        setShowError(true);

        console.log(err.response.data);

        return;
      }
    } else {
      try {
        const existingUser = await authenticateUser({ name, password });
        setUser!(existingUser);
        setShowError(false);

        window.localStorage.setItem('user', JSON.stringify(existingUser));

        navigate('/');
      } catch (err: any) {
        setErrorMessage('invalid credentials');
        setShowError(true);
        return;
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>{props.formType}</h1>
      <input
        className="form-input"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-input"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {showError ? (
        <p style={{ color: 'red', fontSize: '14px' }}>{errormessage}</p>
      ) : (
        <></>
      )}
      <button className="btn" type="submit">
        {props.formType}
      </button>
    </form>
  );
};
