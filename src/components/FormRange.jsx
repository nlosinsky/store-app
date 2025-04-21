import { formatPrice } from "../utils";
import { useState } from "react";

const FormRange = ({ label, name, size, price }) => {
  const rangeSize = size ? `range-${size}` : 'range-md';
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  const updatePrice = (e) => {
    const value = +e.target.value || 0;

    if (value !== selectedPrice) {
      setSelectedPrice(value)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="capitalize text-sm font-normal">{label}</label>
        <span>{formatPrice(selectedPrice)}</span>
      </div>
      <input id={name}
             step={step}
             type="range"
             min={0}
             max={maxPrice}
             value={selectedPrice}
             className={`range range-primary ${rangeSize}`}
             name={name}
             onChange={(e) => updatePrice(e)}
      />
      <div className="flex justify-between items-center mt-2 font-bold text-xs px-2">
        <span>0</span>
        <span className="float-right">Max: {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};

export default FormRange;
