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
        <div className="car_calc">
            <h1>Vehicle emissions calculator</h1>
            <form>
                <div className="small_forms">
                    {Vehicles.map((val, key) => {
                        return (
                            <li key={key} className="button_groups">
                                <div id={val.type} className="largeIcon" onClick={(e) => {e.preventDefault(); setMpg(val.mpg)}}>{val.icon}</div>
                                <div>{val.type}</div>
                            </li>
                        )
                    })}
                </div>
                <div className="small_forms">
                    <div className="radio_form">
                    <p className="form_label">MPG of your vehicle</p>
                        <input type="number"  name="car_mpg" id="mpg" value={mpg} onChange={e => setMpg(e.target.value)}></input>
                    </div>
                    <div className="radio_form">
                        <p className="form_label">Distance Traveled</p>
                        <input type="number" name="distance" id="distance" value={distance} onChange={e => setDistance(e.target.value)} ></input>
                    </div>
                </div>
                <div className="button_forms">
                    <button type="submit" className="calc_button" onClick={(e) => calculate(e)}>Calculate Vehicle Emissions</button>
                </div>
            </form>
            <div className="calc-result">
                <h3>Total Offset Cost of your Vehicle Emissions: ${cost.toFixed(2)}</h3>
                <h4>Total emissions created from vehicle: {emissions.toFixed(2)}</h4>
            </div>
        </div>
    )
}

export default CarCalculation