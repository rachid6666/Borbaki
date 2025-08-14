import React, { useState } from 'react';
import Slider from 'react-slider';
import ReactSlider from 'react-slider'

import "./PriceRangeSlider.css"
const PriceRangeSlider = (props) => {
  
  const MIN=2;
  const MAX=999;

  const[values,setValues] =useState([MIN,MAX])  

  // State variables for minimum and maximum price values
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const handleChange = (newValue) => {
    // Update state with the new range values (array)
    setMinValue(newValue[0]);
    setMaxValue(newValue[1]);
    setValues(newValue);
    props.onChange(newValue[1]);
  };

  return (
    <div  className="price-range-slider">
      <p>Price Range:</p>
      <div className="price-values">
        <span> €{values[0]}</span>-<span> €{values[1]}</span>
       
      </div>
      <small>
          Current Range:€{values[1]-values[0]}
        </small>
      <div>

    <Slider
        //onChange={setValues}
        onChange={handleChange}
        value={values}
        min={MIN}
        max={MAX}
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[1, 999]}

       
     

        minDistance={10}
    />
    </div>
 
    </div>
  );
};

export default PriceRangeSlider;
