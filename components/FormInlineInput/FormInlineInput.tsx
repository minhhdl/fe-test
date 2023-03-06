import { forwardRef, SyntheticEvent, useEffect, useRef } from "react";
import { Control, Controller, ControllerFieldState } from "react-hook-form";
import styles from "./FormInlineInput.module.scss";

interface IFormInlineInputProps {
  control: Control<any>;
  name: string;
}

interface IInlineInputProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  value?: string | null;
  onChange?: (value?: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InlineInput = forwardRef<
  HTMLSpanElement,
  IInlineInputProps & ControllerFieldState
>(function InlineInputComponent(props, ref) {
  const {
    value = "",
    onChange,
    onFocus,
    onBlur,
    placeholder,
    defaultValue,
    className,
  } = props;
  const textareaEl = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textareaEl.current) {
      textareaEl.current.innerText = value || "";
    }
  }, []);

  const handleChange = (e: SyntheticEvent<HTMLSpanElement>) => {
    onChange?.(e.currentTarget.innerText || "");
  };

  const handleBlur = (e: SyntheticEvent) => {
    onBlur?.();
    if (!value && textareaEl.current) {
      textareaEl.current.innerText = defaultValue || "";
      onChange?.(defaultValue);
    }
  };

  return (
    <div className={className}>
      <span
        ref={textareaEl}
        role="textbox"
        contentEditable
        aria-multiline="true"
        onInput={handleChange}
        onBlur={handleBlur}
        onFocus={onFocus}
        className={styles.input}
        placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
    </div>
  );
});

export default function FormInlineInput({
  name,
  control,
  ...other
}: IFormInlineInputProps & IInlineInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return <InlineInput {...field} {...fieldState} {...other} />;
      }}
    />
  );
}
