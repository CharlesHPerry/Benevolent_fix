import './App.css';
import React, {useState} from 'react'
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import {useAuth0} from '@auth0/auth0-react';
import CarCalculation from './components/CarCalculation';
import FlightCalculation from './components/FlightCalculation';
import Hero from './components/Hero'
import AllProjects from './components/allProjects'
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';


function App() {

  const styles = {

    largeIcon: {
      width: 140,
      height: 140,
    },

    hoverIcon: {
      width: 100,
      height: 100,
    }
  
  };
  const [mystyle, setMyStyle] = useState(styles.largeIcon)
  const { isLoading } = useAuth0();
  const [calc, setCalc] = useState("first")

  if (isLoading) return (
    <div>Loading...</div>
  )
  function RenderInner() {
    if (calc === "first") {
      return <FlightCalculation />
    } else if (calc === "second"){
      return <CarCalculation />
    }
  }

  return (
    <>
      {/* <div className="navbar">
        <LoginButton />
        <LogoutButton />
        
      </div> */}
      <div className="App">
        <Hero />
        <div className="calculation_select">
          <h1 className="section_title">Calculate the cost for your actions</h1>
          <div className="calculators">
            <div className="calculator">
              <AirplanemodeActiveIcon onClick={() => setCalc("first")} style={mystyle} onHover={() => setMyStyle(styles.hoverIcon)} />
              <p>Flight Calculation</p>
            </div>
            <div className="calculator">
              <DriveEtaIcon onClick={() => setCalc("second")} style={mystyle} onHover={() => setMyStyle(styles.hoverIcon)} />
              <p>Vehicle Calculation</p>
            </div>
          </div>
           <p className="section_title">( Click the Icon for the calculation you'd like to make )</p>
        </div>
        <RenderInner />
        <AllProjects />
      </div>
    </>
  );
}

export default App;
