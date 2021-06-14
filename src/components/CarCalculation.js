import React, {useState} from 'react';
import {Vehicles} from "./vehicles"


const CarCalculation = () => {
    const [mpg, setMpg] = useState(0);
    const [distance, setDistance] = useState(0);
    const [emissions ,setEmissions] = useState(0);
    const [cost, setCost] = useState(0);

    const calculate = (e) => {
        e.preventDefault();
        setEmissions(((distance / mpg) * 8887) / 907185);
        setCost((((distance / mpg) * 8887) / 907185) * 51);
       
    }


    return (
        <div>
            <h1>Calculate the social cost of carbon created by your vehicle.</h1>
            <form>
                <div className="small_forms">
                    {Vehicles.map((val, key) => {
                        return (
                            <li key={key} className="button_groups">
                                <button id={val.type} className="icon" onClick={(e) => {e.preventDefault(); setMpg(val.mpg)}}>{val.icon}{val.type}</button>
                            </li>
                        )
                    })}
                </div>
                <div className="small_forms">
                    <div className="number_forms">
                        <label for="mpg">MPG of your vehicle</label>
                        <input type="number" name="car_mpg" id="mpg" value={mpg} onChange={e => setMpg(e.target.value)}></input>
                    </div>
                    <div className="number_forms">
                        <label for="distance">Distance Traveled</label>
                        <input type="number" name="distance" id="distance" value={distance} onChange={e => setDistance(e.target.value)} ></input>
                    </div>
                </div>
                    <button type="submit" onClick={(e) => calculate(e)}>Calculate Cost</button>
            </form>
            <h3>Total Offset Cost of your Vehicle Emissions: {cost.toFixed(2)}$</h3>
            <h4>Total tons of emissions: {emissions.toFixed(2)}</h4>
        </div>
    )
}

export default CarCalculation