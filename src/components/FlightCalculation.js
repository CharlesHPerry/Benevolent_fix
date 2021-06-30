import React, {useEffect, useState} from "react";
import axios from "axios";
import GoogleMaps from './GoogleMap';


const FlightCalculation = () => {

    let calculateDistance = (e) => {
        e.preventDefault();
    }

    return (
        <div className="calculation_div">
            <h1 className="calc-title">Flight emission calculator</h1>
            <GoogleMaps />
        </div>
    )
}

export default FlightCalculation