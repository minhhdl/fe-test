import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
import classNames from "classnames";
import { Control, Controller, ControllerFieldState } from "react-hook-form";

interface IFormRadioProps {
  control: Control<any>;
  name: string;
}

interface IOption {
  label: string;
  value: string;
  id: string;
}

interface IRadioWrapperProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  leftIcon?: string;
  label?: string;
  name: string;
  options: IOption[];
}

const RadioWrapper = forwardRef<
  HTMLInputElement,
  IRadioWrapperProps & ControllerFieldState
>(function RadioWrapperComponent(props, ref) {
  const { className, name, label, options, value, onChange, isTouched, error } =
    props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      onChange?.(e);
    }
  };

  return (
    <fieldset className={classNames("flex flex-col mb-3", className)}>
      {label && <legend className="mb-3">{label}</legend>}

      <div className="flex flex-wrap">
        {options.map((item, index) => (
          <div key={index} className="flex items-center mb-1 mr-6">
            <input
              id={item.id}
              type="radio"
              name={name}
              value={item.value}
              className="w-4 h-4 border-gray-300 cursor-pointer focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              checked={value === item.value}
              onChange={handleChange}
            />
            <label
              htmlFor={item.id}
              className="block ml-2 text-sm cursor-pointer font-light"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm font-medium text-red-600">{error.message}</p>
      )}
    </fieldset>
  );
});

export default function FormRadio({
  name,
  control,
  ...other
}: IFormRadioProps & IRadioWrapperProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return <RadioWrapper {...field} {...fieldState} {...other} />;
      }}
    />
  );
}
