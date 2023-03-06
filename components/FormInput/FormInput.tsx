import { forwardRef } from "react";
import classNames from "classnames";
import {
  Control,
  Controller,
  ControllerFieldState,
  FieldValues,
} from "react-hook-form";
import Input, { IInputProps } from "./Input";

interface IFormInputProps {
  control: Control<any>;
  name: string;
}

interface IInputWrapperProps extends IInputProps {
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  leftIcon?: string;
  label?: string;
}

const InputWrapper = forwardRef<
  HTMLInputElement,
  IInputWrapperProps & ControllerFieldState
>(function InputWrapperComponent(props, ref) {
  const {
    leftIcon,
    className,
    inputClassName,
    iconClassName,
    label,
    type,
    onChange,
    onBlur,
    onFocus,
    value,
    placeholder,
    error,
  } = props;

  return (
    <div className={classNames("mb-3", className)}>
      {label && <label className="block mb-[6px] text-sm">{label}</label>}
      <div className="flex">
        {leftIcon && (
          <i
            className={classNames(
              `sicon-${leftIcon} flex-shrink-0 text-2xl leading-none mr-2 mt-2`,
              iconClassName
            )}
          ></i>
        )}
        <div className="flex-1">
          <Input
            ref={ref}
            type={type}
            className={inputClassName}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
          />
          {error && (
            <p className="mt-1 text-sm font-medium text-red-600">{error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default function FormInput({
  name,
  control,
  ...other
}: IFormInputProps & IInputWrapperProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return <InputWrapper {...field} {...fieldState} {...other} />;
      }}
    />
  );
}
