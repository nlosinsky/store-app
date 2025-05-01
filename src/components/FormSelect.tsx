type FormSelectProps = {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  name: string;
  defaultValue?: string | undefined;
  options: string[];
}

const FormSelect = ({label, size, name, defaultValue, options}: FormSelectProps) => {
  const selectSize = size ? `select-${size}` : 'select-md';

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
      </select>
    </fieldset>
  );
};

export default FormSelect;
