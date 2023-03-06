import { forwardRef, InputHTMLAttributes, useId } from "react";
import classNames from "classnames";
import {
  Control,
  Controller,
  ControllerFieldState,
  FieldValues,
} from "react-hook-form";

interface IFormTagsProps {
  control: Control<any>;
  name: string;
}

interface ITagsWrapperProps {
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  leftIcon?: string;
  label?: string;
  helperText?: string;
  name: string;
  tags: string[];
}

function TagsWrapper(
  props: ITagsWrapperProps & FieldValues & ControllerFieldState
) {
  const {
    className,
    label,
    tags,
    helperText,
    value = [],
    onChange,
    error,
  } = props;

  const onChangeTag = (tag: string) => () => {
    onChange?.([...value, tag]);
  };

  const onRemoveTag = (tag: string) => () => {
    onChange?.(value.filter((item: string) => item !== tag));
  };

  return (
    <fieldset className={classNames("mb-3", className)}>
      {label && <legend className="mb-1">{label}</legend>}
      {helperText && <p className="font-light text-sm mb-4">{helperText}</p>}

      <div className="flex flex-wrap mb-4">
        {(value as string[]).map((tag, index) => (
          <div
            key={index}
            className="flex items-center mb-2 mr-2 text-sm px-3 py-1 bg-primary-400/10 text-primary-400 rounded-full cursor-pointer select-none"
            onClick={onRemoveTag(tag)}
          >
            {tag}
            <i className="sicon-close ml-1"></i>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap">
        {tags
          .filter((tag) => !value?.includes?.(tag))
          .map((tag, index) => (
            <div
              key={index}
              className="flex items-center mb-2 mr-2 text-sm px-3 py-1 bg-slate-100 rounded-full cursor-pointer select-none"
              onClick={onChangeTag(tag)}
            >
              {tag}
            </div>
          ))}
      </div>

      {error && (
        <p className="mt-1 text-sm font-medium text-red-600">{error.message}</p>
      )}
    </fieldset>
  );
}

export default function FormTags({
  name,
  control,
  ...other
}: IFormTagsProps & ITagsWrapperProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return <TagsWrapper {...field} {...fieldState} {...other} />;
      }}
    />
  );
}
