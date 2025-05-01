type FormInputProps = {
  label: string;
  name: string;
  type: string;
  defaultValue?: string | undefined;
  size?: 'sm' | 'md' | 'lg';
}

const FormInput = ({label, name, type, defaultValue, size}: FormInputProps) => {
  const inputSize = size ? `input-${size}` : 'input-md';
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend capitalize text-sm font-normal">{label}</legend>
      <input type={type} className={`input w-full ${inputSize}`} name={name} defaultValue={defaultValue} />
    </fieldset>
  );
};

export default FormInput;
