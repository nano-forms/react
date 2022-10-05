import classNames from "classnames";
import { Formik } from "../types";

export function MultipleChoice(props: {
  formik: Formik<any>;
  hint: string | null;
  id: string;
  items: Array<{ label: string }>;
  label: string;
}) {
  return (
    <div className="tw-pt-4">
      <label className="label">{props.label}</label>
      <div className="tw-gap-2 tw-flex tw-flex-wrap tw-pt-2">
        {props.items.map((x) => (
          <div
            className={classNames(
              "tw-border tw-cursor-pointer tw-px-4 tw-py-1 tw-select-none tw-text-xs tw-rounded-full",
              {
                "tw-bg-gray-200": props.formik.values[props.id] === x.label,
                "tw-border-gray-200": props.formik.values[props.id] === x.label,
              }
            )}
            key={x.label}
            onClick={() => props.formik.setFieldValue(props.id, x.label)}
          >
            {x.label}
          </div>
        ))}
      </div>
    </div>
  );
}
