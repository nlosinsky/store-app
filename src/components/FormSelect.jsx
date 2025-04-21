const FormSelect = ({label, size, name, defaultValue, options}) => {
  const selectSize = size ? `select-${size}` : 'select-md';
  if (!options) {
    options = [];
  }

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend capitalize text-sm font-normal">{label}</legend>
      <select defaultValue={defaultValue}
              id={name}
              name={name}
              className={`select ${selectSize} font-bold`}
      >
        {
          options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })
        }
        {/*<option disabled={true}>all</option>*/}
        {/*<option>Chrome</option>*/}
        {/*<option>FireFox</option>*/}
        {/*<option>Safari</option>*/}
      </select>
    </fieldset>
  );
};

export default FormSelect;
