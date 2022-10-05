import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import { Formik } from "../types";

export function Input(props: {
  formik: Formik<any>;
  hint: string | null;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
}) {
  return (
    <div className="tw-pt-4">
      <label className="label" htmlFor={props.inputProps.id}>
        {props.label}
      </label>
      <input
        autoComplete={props.inputProps.autoComplete}
        className={classNames("input", {
          "input-error":
            props.formik.errors[props.inputProps.id || ""] &&
            props.formik.touched[props.inputProps.id || ""],
        })}
        disabled={props.inputProps.disabled}
        id={props.inputProps.id}
        name={props.inputProps.name}
        onBlur={props.formik.handleBlur}
        onChange={props.formik.handleChange}
        placeholder={props.inputProps.placeholder}
        type={props.inputProps.type}
        value={props.formik.values[props.inputProps.id || ""]}
      />
      {props.hint &&
      (!props.formik.touched[props.inputProps.id || ""] ||
        !props.formik.errors[props.inputProps.id || ""]) ? (
        <p className="text-hint">{props.hint}</p>
      ) : null}

      {props.formik.errors[props.inputProps.id || ""] &&
      props.formik.touched[props.inputProps.id || ""] ? (
        <p className="text-hint tw-text-primary">
          {props.formik.errors[props.inputProps.id || ""] as any}
        </p>
      ) : null}
    </div>
  );
}
