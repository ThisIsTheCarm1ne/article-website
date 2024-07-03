import {
  useState
} from 'react';

import AuthFormLogin from './login';
import AuthFormRegister from './register';

import './authFormStyle.scss';

function AuthForms() {
  const [isForRegister, setIsForRegister] = useState<boolean>(true);

  return (
    <>
      {isForRegister ? 
        <AuthFormRegister />
      :
        <AuthFormLogin />
      }
      <button onClick={() => setIsForRegister(!isForRegister)}>
        {isForRegister ?
          'Already registrared? Login'
        :
          'Don\'t have an account? Sign up now'
        }
      </button>
    </>
  )
}

export default function AuthForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Login or Sign up</button>
      {isOpen && (
        <div className='auth_popup_overlay'>
          <div className='auth_popup'>
            <button onClick={() => setIsOpen(false)}>Close</button>
            <AuthForms />
          </div>
        </div>
      )}
    </>
  )
}
