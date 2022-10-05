import { SelectHTMLAttributes, useRef, useState } from "react";
import classNames from "classnames";
import { Formik } from "../types";
import { useOffClick } from "../hooks";

export function Select(props: {
  formik: Formik<any>;
  hint: string | null;
  items: Array<{ label: string }>;
  label: string;
  selectProps: SelectHTMLAttributes<HTMLInputElement>;
}) {
  const [expanded, setExpanded] = useState(false);

  const mutableObjectRef = useRef(null);

  useOffClick(mutableObjectRef, () => {
    setExpanded(false);
  });

  return (
    <div className="select-container tw-pt-4" ref={mutableObjectRef}>
      <label className="label" htmlFor={props.selectProps.id}>
        {props.label}
      </label>
      <div
        className={classNames("select", {
          "tw-border": !expanded,
          "tw-border-l": expanded,
          "tw-border-r": expanded,
          "tw-border-t": expanded,
          "tw-rounded-lg": !expanded,
          "tw-rounded-t-lg": expanded,
          "select-error":
            props.formik.errors[props.selectProps.id || ""] &&
            props.formik.touched[props.selectProps.id || ""],
        })}
        onClick={() => setExpanded(!expanded)}
      >
        {props.formik.values[props.selectProps.id || ""]}
      </div>

      {expanded ? (
        <div className="tw-bg-white tw-border-b tw-border-l tw-border-r tw-cursor-pointer tw-max-h-48 tw-overflow-y-scroll tw-rounded-b-lg tw-select-none">
          {props.items.map((x) => (
            <div
              className="tw-px-4 tw-py-2 hover:tw-bg-ghost-white"
              key={x.label}
              onClick={() => {
                props.formik.setFieldTouched(props.selectProps.id || "", true);

                props.formik.setFieldValue(props.selectProps.id || "", x.label);

                setExpanded(false);
              }}
            >
              {x.label}
            </div>
          ))}
        </div>
      ) : null}
      {props.hint &&
      (!props.formik.touched[props.selectProps.id || ""] ||
        !props.formik.errors[props.selectProps.id || ""]) ? (
        <p className="text-hint">{props.hint}</p>
      ) : null}

      {props.formik.errors[props.selectProps.id || ""] &&
      props.formik.touched[props.selectProps.id || ""] ? (
        <p className="text-hint tw-text-primary">
          {props.formik.errors[props.selectProps.id || ""] as any}
        </p>
      ) : null}
    </div>
  );
}
