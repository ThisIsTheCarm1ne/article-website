import {
  FormEvent,
  useState
} from 'react';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks'
import {
  set,
  selectToken,
} from '../../states/auth/authSlice'

import {
  setUserId,
  selectUserId,
} from '../../states/auth/userIdSlice'

export default function AuthFormLogin() {
  const token = useAppSelector(selectToken)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  async function login(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      dispatch(setUserId(data._id));
      dispatch(set(data.token));
    } catch (error) {
      setError((error as Error).message);
    }
  };
  
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  )
}
