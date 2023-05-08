import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";

const MySwal = withReactContent(Swal);
interface Code {
  json: object;
}
export const Code = (props: Code) => {
  const { json } = props;

  const copy = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(JSON.stringify(json));
    MySwal.fire({ title: <p>Copied!</p> });
  };

  return (
    <div className="my-5">
      <div className="flex justify-end p-2">
        <button
          onClick={copy}
          className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 p-2 rounded"
        >
          Copy to clipboard
        </button>
      </div>
      <div className="max-h-96 overflow-auto rounded">
        <SyntaxHighlighter language="json" style={materialOceanic}>
          {JSON.stringify(json, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
