import React from 'react';
import MotorcycleOutlinedIcon from '@material-ui/icons/MotorcycleOutlined';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';


const styles = {

    largeIcon: {
      width: 90,
      height: 90,
    },
  
  };

export const Vehicles = [
    {
        type: "Motorcycle",
        mpg: 37.5,
        icon: <MotorcycleOutlinedIcon style={styles.largeIcon} />
    },
    {
        type: "Sedan",
        mpg: 23,
        icon: <DriveEtaIcon style={styles.largeIcon} />
    },
    {
        type: "SUV",
        mpg: 19,
        icon: <AirportShuttleIcon style={styles.largeIcon} />
    }
]