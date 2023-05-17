import React from "react";
import { Code } from "../Code/Code";

interface IPost {
  baseclass?: string;
  title: string;
}
export const Post = (props: React.PropsWithChildren<IPost>) => {
  const { title, baseclass = "", children } = props;

  return (
    <div className={baseclass}>
      <h2 className="text-5xl font-bold mb-2 max-w-3xl">{title}</h2>

      <div className="post__body">{children}</div>
    </div>
  );
};

Post.Body = (props: React.PropsWithChildren) => {
  return <p className="mb-10">{props.children}</p>;
};

type PostInstructions = {
  text: string | JSX.Element;
};
interface PostSection {
  title?: string;
  summary?: string;
  instructions?: PostInstructions[];
  image?: string;
  json?: object;
  timeGate?: Date;
}
Post.Section = (props: React.PropsWithChildren<PostSection>) => {
  const {
    title,
    summary = "",
    instructions = [],
    image = "",
    json,
    timeGate,
    children,
  } = props;
  const now = new Date();
  const shouldHidePost = timeGate ? now < timeGate : false;

  const renderInstructions = () => {
    if (instructions.length) {
      return (
        <ul>
          {instructions.map((instruction, idx) => {
            return <li key={idx}>{instruction.text}</li>;
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

  if (shouldHidePost) {
    return null;
  }

  return (
    <section className="mb-10">
      {title && <h3 className="text-3xl mb-2">{title}</h3>}

      {summary && <p className="mb-6"> {summary}</p>}

      {renderInstructions()}

      {renderImage()}

      {json && <Code json={json} />}

      {children}
    </section>
  );
};
