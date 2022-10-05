import React, { useRef, useState } from "react";
import { FileMonkey } from "file-monkey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "../types";

export const FileUpload = (props: {
  formik: Formik<any>;
  hint: string | null;
  id: string;
  label: string;
  tags: Array<string>;
  username: string;
}) => {
  const inputElementFile = useRef(null as any | null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({ data: null, isLoading: false } as {
    data: {
      files: {
        collectionId: string;
        contentType: string;
        createdAt: number;
        id: string;
        name: string;
        size: number;
        tags: string[];
        url: string;
      }[];
      id: string;
    } | null;
    isLoading: boolean;
  });

  return (
    <div className="tw-pt-4">
      <div
        className="tw-bg-gray-50 tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-px-12 tw-py-12 tw-rounded-lg"
        onClick={() => inputElementFile.current.click()}
      >
        <FontAwesomeIcon
          className="tw-mb-3 tw-text-3xl tw-text-gray-500"
          icon={faUpload}
        />

        <div className="tw-font-medium tw-mb-3 tw-text-center tw-text-sm">
          {props.label}
        </div>

        <div className="tw-text-center tw-text-xs">{props.hint}</div>

        {state.data ? (
          <div className="tw-mt-3 tw-text-center tw-text-xs">
            {state.data?.files.map((x) => x.name).join(", ")}
          </div>
        ) : null}

        {state.isLoading ? (
          <div className="tw-mt-3">
            <span className="loader-small"></span>
          </div>
        ) : null}

        <input
          multiple
          onChange={async (event: any) => {
            setState((state) => {
              return {
                ...state,
                isLoading: true,
              };
            });

            const collection = await FileMonkey(
              props.username,
              props.tags
            ).onChange(event);

            if (!collection) {
              setState((state) => {
                return {
                  ...state,
                  isLoading: false,
                };
              });

              return;
            }

            setState({
              data: collection || null,
              isLoading: false,
            });

            props.formik.setFieldValue(props.id, {
              data: collection,
              type: "file_collection",
            });
          }}
          ref={inputElementFile}
          style={{ display: "none" }}
          type="file"
        />
      </div>
    </div>
  );
};
