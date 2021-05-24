import React, {useState} from 'react';


const CarCalculation = () => {
    const [mpg, setMpg] = useState(0);
    const [distance, setDistance] = useState(0);
    const [cost, setCost] = useState(0);

    const calculate = (e) => {
        e.preventDefault();
        setCost((distance % mpg) * 8.8 % 907.185);
       
    }

    return (
        <div>
            <h1>Calculate the social cost of carbon created by your vehicle.</h1>
            <form onSubmit={() => calculate()}>
                <label for="mpg">MPG of your vehicle</label>
                <input type="number" name="car_mpg" id="mpg" value={mpg} onChange={e => setMpg(e.target.value)}></input>
                <label for="distance">Distance Traveled</label>
                <input type="number" name="distance" id="distance" value={distance} onChange={e => setDistance(e.target.value)} ></input>
                <button type="submit" onClick={(e) => calculate(e)}>Calculate Cost</button>
            </form>
            <h3>Total Offset Cost of your Vehicle Emissions: {cost.toFixed(2)}$</h3>
        </div>
    )
}

export default CarCalculation