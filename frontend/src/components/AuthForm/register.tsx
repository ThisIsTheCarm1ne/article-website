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
  selectToken
} from '../../states/auth/authSlice'

export default function AuthFormRegister() {
  const token = useAppSelector(selectToken)
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  async function register(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      dispatch(set(data.token));
      console.log(token);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={register}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
    </>
  );
}
