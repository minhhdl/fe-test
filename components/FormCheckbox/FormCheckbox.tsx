import { forwardRef, InputHTMLAttributes, SyntheticEvent, useId } from "react";
import classNames from "classnames";
import { Control, Controller, ControllerFieldState } from "react-hook-form";

interface IFormCheckboxProps {
  control: Control<any>;
  name: string;
}

interface ICheckboxWrapperProps {
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  leftIcon?: string;
  label?: string;
  onChange?: (value: boolean) => void;
  value?: boolean;
}

const CheckboxWrapper = forwardRef<
  HTMLInputElement,
  ICheckboxWrapperProps & ControllerFieldState
>(function CheckboxWrapperComponent(props, ref) {
  const { className, inputClassName, label, value, onChange } = props;

  const id = useId();

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    onChange?.(e.currentTarget.checked);
  };

  return (
    <div className={classNames("flex items-center mb-3", className)}>
      <input
        id={id}
        ref={ref}
        type="checkbox"
        className={classNames("rounded", inputClassName)}
        checked={!!value}
        onChange={handleChange}
      />
      {label && (
        <label htmlFor={id} className="ml-2 text-sm">
          {label}
        </label>
      )}
    </div>
  );
});

export default function FormCheckbox({
  name,
  control,
  ...other
}: IFormCheckboxProps & ICheckboxWrapperProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return <CheckboxWrapper {...field} {...fieldState} {...other} />;
      }}
    />
  );
}
