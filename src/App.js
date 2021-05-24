import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import {useAuth0} from '@auth0/auth0-react';
import CarCalculation from './components/CarCalculation';

function App() {

  const {isLoading} = useAuth0();

  if (isLoading) return (
    <div>Loading...</div>
  )

  return (
    <div className="App">
      <h1>Benevolent</h1>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <CarCalculation />
    </div>
  );
}

export default App;
