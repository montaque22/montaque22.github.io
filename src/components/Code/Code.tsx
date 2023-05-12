import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";

const MySwal = withReactContent(Swal);
interface ICode {
  json: object;
}
export const Code = (props: ICode) => {
  const { json } = props;

  const copy = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(JSON.stringify(json));
    MySwal.fire({ title: <p>Copied!</p> });
  };

  return (
    <div className="my-5 code">
      <div className="flex justify-between p-2 items-center">
        <p className="text-sm italic">
          <b>DISCLAIMER:</b> By copying this data you acknowledge the risks of
          using code from the internet and are acting at your own discretion. I
          am not responsible for any damages.
        </p>
        <button
          onClick={copy}
          className="bg-pink-700 hover:bg-pink-600 active:bg-rose-800 p-2 rounded"
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
