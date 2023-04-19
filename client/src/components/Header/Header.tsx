import { useNavigate } from 'react-router';
import { useUserState } from '../../contexts';
import './Header.css';

export const Header = () => {
  const [user, setUser] = useUserState();

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogIn = async () => {
    navigate('/login');
  };

  const handleMessages = async () => {
    navigate('/');
  };

  const handleLogOut = () => {
    setUser!(null);
    window.localStorage.clear();
  };

  if (!user) {
    return (
      <header className="header">
        <button onClick={handleMessages} className="btn" type="button">
          Messages
        </button>
        <button onClick={handleSignUp} className="btn" type="button">
          Sign up
        </button>
        <button onClick={handleLogIn} className="btn" type="button">
          Log in
        </button>
      </header>
    );
  }

  return (
    <header className="header">
      <button onClick={handleMessages} className="btn" type="button">
        Messages
      </button>
      <button onClick={handleLogOut} className="btn" type="button">
        Log out
      </button>
    </header>
  );
};
