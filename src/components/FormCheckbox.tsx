type FormCheckboxProps = {
  label: string;
  name: string;
  defaultValue?: string | undefined;
  size?: 'sm' | 'md' | 'lg';
}

const FormCheckbox = ({ label, name, defaultValue, size }: FormCheckboxProps) => {
  const checkboxSize = size ? `checkbox-${size}` : 'checkbox-md';
  const checked = defaultValue === 'true' || defaultValue === '1';

  return (
    <div className="flex items-center gap-2 flex-col">
      <label htmlFor={name} className="capitalize text-sm font-normal cursor-pointer">{label}</label>
      <input type="checkbox"
             className={`checkbox checkbox-primary ${checkboxSize}`}
             defaultChecked={checked}
             name={name}
             id={name}
      />
    </div>
  );
};

export default FormCheckbox;
