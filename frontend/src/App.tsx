import {
  useAppSelector,
} from './hooks'
import {
  selectToken
} from './states/auth/authSlice'

import './App.css'
import AuthForm from './components/AuthForm'
import NewsList from './components/NewsList'
import NewsForm from './components/NewsForm'

function App() {
  const token = useAppSelector(selectToken)

  return (
    <>
      {token.length === 0 ? (
        <AuthForm />
      ) : (
        <NewsForm />
      )}
      <NewsList />
    </>
  )
}

export default App
