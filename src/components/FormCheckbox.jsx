const FormCheckbox = ({ label, name, defaultValue, size }) => {
  const checkboxSize = size ? `checkbox-${size}` : 'checkbox-md';

  return (
    <div className="flex items-center gap-2 flex-col">
      <label htmlFor={name} className="capitalize text-sm font-normal cursor-pointer">{label}</label>
      <input type="checkbox"
             className={`checkbox checkbox-primary ${checkboxSize}`}
             defaultChecked={defaultValue}
             name={name}
             id={name}
      />
    </div>
  );
};

export default FormCheckbox;
