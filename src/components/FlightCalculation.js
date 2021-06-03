import React, {useEffect, useState} from "react";
import axios from "axios";
import GoogleMaps from './GoogleMap';


const FlightCalculation = () => {

    let calculateDistance = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h3>Calculate the carbon emmisions of domestic flights in the US</h3>
            <GoogleMaps />
            <h3>Total flight emissions</h3>
        </div>
    )
}

export default FlightCalculation