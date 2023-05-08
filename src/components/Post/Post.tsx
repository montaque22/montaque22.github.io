import React from "react";
import { Code } from "../Code/Code";

interface Post {
  baseclass?: string;
  title: string;
}
export const Post = (props: React.PropsWithChildren<Post>) => {
  const { title, baseclass = "", children } = props;

  return (
    <div className={baseclass}>
      <h2 className="text-5xl font-bold mb-2 max-w-3xl">{title}</h2>

      <div className="post__body">{children}</div>
    </div>
  );
};

Post.body = (props: React.PropsWithChildren) => {
  return <p className="mb-10">{props.children}</p>;
};

type PostInstructions = {
  text: string | JSX.Element;
};
interface PostSection {
  title: string;
  summary?: string;
  instructions?: PostInstructions[];
  image?: string;
  json?: object;
}
Post.section = (props: React.PropsWithChildren<PostSection>) => {
  const {
    title,
    summary = "",
    instructions = [],
    image = "",
    json,
    children,
  } = props;

  const renderInstructions = () => {
    if (instructions.length) {
      return (
        <ul className="mb-10 px-10">
          {instructions.map((instruction, idx) => {
            return (
              <li className="mb-6 flex" key={idx}>
                <span className="mr-2 text-xl">⁍</span> {instruction.text}
              </li>
            );
          })}
        </ul>
      );
    }
  };

  const renderImage = () => {
    if (image) {
      return (
        <div className="flex justify-center mb-10">
          <img className="max-h-80" src={image} alt="" />
        </div>
      );
    }
  };

  return (
    <section className="mb-10">
      <h3 className="text-3xl mb-2">{title}</h3>

      {summary && <p className="mb-6"> {summary}</p>}

      {renderInstructions()}

      {renderImage()}

      {json && <Code json={json} />}

      {children}
    </section>
  );
};