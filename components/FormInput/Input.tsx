import {
  forwardRef,
  InputHTMLAttributes,
  memo,
  MutableRefObject,
  SyntheticEvent,
} from "react";
import classNames from "classnames";
import {
  NumberFormatValues,
  NumericFormat,
} from "react-number-format";

export type InputType = "text" | "textarea" | "numeric";

export interface IInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  type?: InputType;
  value?: string | number;
  onChange?: (
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => void;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, IInputProps>(
  function InputComponent(props, ref) {
    const { type = "text", className, ...inputProps } = props;

    if (type === "textarea") {
      return (
        <textarea
          ref={ref as MutableRefObject<HTMLTextAreaElement>}
          className={classNames(
            "rounded px-3 leading-5 w-full resize-none border-none outline-none outline-offset-0 focus:outline-offset-0 focus:outline-primary-400",
            className
          )}
          {...inputProps}
        />
      );
    }

    if (type === "numeric") {
      const onValueChange = (values: NumberFormatValues) => {
        inputProps.onChange?.(values.value);
      };
      return (
        <NumericFormat
          getInputRef={ref}
          className={classNames(
            "rounded px-3 py-0 leading-10 w-full border-none outline-none outline-offset-0 focus:outline-offset-0 focus:outline-primary-400",
            className
          )}
          valueIsNumericString
          thousandSeparator=","
          value={inputProps.value}
          onValueChange={onValueChange}
          placeholder={inputProps.placeholder}
        />
      );
    }

    return (
      <input
        ref={ref as MutableRefObject<HTMLInputElement>}
        className={classNames(
          "rounded px-3 leading-10 w-full outline-none outline-offset-0 focus:outline-primary-400",
          className
        )}
        {...inputProps}
      />
    );
  }
);

export default memo(Input);
