import { forwardRef } from "react";
import classNames from "classnames";
import { Control, Controller, ControllerFieldState } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import styles from "./FormDatepicker.module.scss";

interface IFormDatepickerProps {
  control: Control<any>;
  name: string;
}

interface IDatepickerWrapperProps {
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  leftIcon?: string;
  label?: string;
  name: string;
  showTimeOnly?: boolean;
  onChange?: (date: Dayjs) => void;
  value?: string;
}

const DatepickerWrapper = forwardRef<
  HTMLInputElement,
  IDatepickerWrapperProps & ControllerFieldState
>(function FormDatepickerWrapperComponent(props, ref) {
  const {
    leftIcon,
    className,
    iconClassName,
    label,
    onChange,
    showTimeOnly,
    error,
    value,
  } = props;

  const handleChange = (selectedDate: Dayjs, raw: string) => {
    onChange?.(selectedDate);
  };

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
        <div className={`flex-1 relative ${styles.datepicker}`}>
          <DatePicker
            onChange={handleChange}
            showTimeOnly={showTimeOnly}
            dateFormat="YYYY-MM-DD"
            inputComponent={({ onClear, ...props }) => (
              <input
                ref={ref}
                className={classNames(
                  "rounded px-3 leading-10 w-full outline-none outline-offset-0 focus:outline-primary-400 mt-1"
                )}
                {...props}
                value={
                  value
                    ? showTimeOnly
                      ? dayjs(value).format("HH:mm")
                      : dayjs(value).format("YYYY-MM-DD")
                    : undefined
                }
              />
            )}
          />
          {error && (
            <p className="mt-1 text-sm font-medium text-red-600">
              {error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default function FormDatepicker({
  name,
  control,
  ...other
}: IFormDatepickerProps & IDatepickerWrapperProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return <DatepickerWrapper {...field} {...fieldState} {...other} />;
      }}
    />
  );
}
