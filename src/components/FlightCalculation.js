import React, {useEffect, useState} from "react";
import axios from "axios";
import {Airports} from './airports'

const FlightCalculation = () => {
    const [origin, setOrigin] = useState("");
    const [originLat, setOriginLat] = useState(0);
    const [originLong, setOriginLong] = useState(0);
    const [passenger, setPassenger] = useState(0);
    const [destination, setDestination] = useState("");
    const [destinationLat, setDestinationLat] = useState(0);
    const [destinationLong, setDestinationLong] = useState(0);
    const [emissions, setEmissions] = useState(0);
    const [distance, setDistance] = useState(0);
    const [cost, setCost] = useState(0);

    let calculateDistance = (e) => {
        e.preventDefault();
        const R = 6371e3; // metres
        const φ1 = originLat * Math.PI/180; // φ, λ in radians
        const φ2 = destinationLat * Math.PI/180;
        const Δφ = (destinationLat-originLat) * Math.PI/180;
        const Δλ = (destinationLong-originLong) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = (R * c)/1609.34; // in metres
        setDistance(d/0.000621371); // in miles
        setEmissions((distance * passenger * 150) / 907185);
        setCost((emissions * 51));
    }

    return (
        <div>
            <h3>Calculate the carbon emmisions of domestic flights in the US</h3>
            <form>
                <label for="flight_from">From:</label>
                <select name="flight_from" id="flight_from" size="7" required >
                    {Airports.map((val, key) => {
                            return (
                                <option key={key} onClick={() => {setOriginLat(val.lat); setOriginLong(val.long);}}>{val.name}</option>
                            )
                        })
                    }
                </select>
                <label for="flight_to">To:</label>
                <select name="flight_to" id="flight_to" size="7" required>
                {Airports.map((val, key) => {
                            return (
                                <option key={key} onClick={() => {setDestinationLat(val.lat); setDestinationLong(val.long);}} placeholder="Select a US airport">{val.name}</option>
                            )
                        })
                    }
                </select>
                <label for="num_pas">Number of passengers</label>
                <input type="number" id="num_pas" placeholder="1" onClick={(e) => setPassenger(e.target.value)}></input>
                <div>
                    <button onClick={(e) => calculateDistance()}>Calculate Carbon Emissions</button>
                </div>
            </form>
            <div>
                <p>Origin Lat and Long: {originLat}, {originLong}</p>
                <p>Destination Lat and Long: {destinationLat}, {destinationLong}</p>
                <p>Total tons of emissions from the flight: {emissions}</p>
            </div>
        </div>
    )
}

export default FlightCalculation