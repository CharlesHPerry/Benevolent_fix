import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import {useAuth0} from '@auth0/auth0-react';
import CarCalculation from './components/CarCalculation';
import FlightCalculation from './components/FlightCalculation';

function App() {

  const { isLoading } = useAuth0();

  if (isLoading) return (
    <div>Loading...</div>
  )

  return (
    <>
      <div className="navbar">
        <LoginButton />
        <LogoutButton />
        
      </div>
      <div className="App">
        <h1>Benevolent</h1>
        <CarCalculation />
        <FlightCalculation />
        <Profile />
      </div>
    </>
  );
}

export default App;
