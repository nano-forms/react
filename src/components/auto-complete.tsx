/* eslint-disable react-hooks/exhaustive-deps */
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Formik } from "../types";
import { useOffClick } from "../hooks";

export function AutoComplete(props: {
  fn: (value: string) => Promise<Array<{ label: string }>>;
  formik: Formik<any>;
  hint: string | null;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const [items, setItems] = useState([] as Array<{ label: string }>);

  const [value, setValue] = useState("");

  const mutableObjectRef = useRef(null);

  useOffClick(mutableObjectRef, () => {
    if (expanded) {
      setExpanded(false);

      setValue("");
    }
  });

  useEffect(() => {
    props
      .fn(value)
      .then(setItems)
      .catch(() => {});
  }, [value]);

  return (
    <div className="auto-complete-container tw-pt-4" ref={mutableObjectRef}>
      <label className="label" htmlFor={props.inputProps.id}>
        {props.label}
      </label>
      <input
        autoComplete={props.inputProps.autoComplete}
        className={classNames("auto-complete", {
          "tw-border": !expanded || !items.length,
          "tw-border-l": expanded && items.length,
          "tw-border-r": expanded && items.length,
          "tw-border-t": expanded && items.length,
          "tw-rounded-lg": !expanded || !items.length,
          "tw-rounded-t-lg": expanded && items.length,
          "auto-complete-error":
            props.formik.errors[props.inputProps.id || ""] &&
            props.formik.touched[props.inputProps.id || ""],
        })}
        disabled={props.inputProps.disabled}
        id={props.inputProps.id}
        name={props.inputProps.name}
        onFocus={() => {
          setExpanded(true);
        }}
        onBlur={props.formik.handleBlur}
        onChange={(event) => setValue(event.target.value)}
        placeholder={props.inputProps.placeholder}
        type={props.inputProps.type}
        value={
          expanded ? value : props.formik.values[props.inputProps.id || ""]
        }
      />

      {expanded && items.length ? (
        <div className="tw-bg-white tw-border-b tw-border-l tw-border-r tw-cursor-pointer tw-max-h-48 tw-overflow-y-scroll tw-rounded-b-lg tw-select-none">
          {items.map((x) => (
            <div
              className="tw-px-4 tw-py-2 hover:tw-bg-ghost-white"
              key={x.label}
              onClick={() => {
                props.formik.setFieldTouched(props.inputProps.id || "", true);

                props.formik.setFieldValue(props.inputProps.id || "", x.label);

                setExpanded(false);

                setValue("");
              }}
            >
              {x.label}
            </div>
          ))}
        </div>
      ) : null}
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
