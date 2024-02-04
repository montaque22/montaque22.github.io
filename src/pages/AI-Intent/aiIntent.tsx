import React, { useState, useEffect } from "react";
import { Post } from "../../components/Post/Post";
import { Youtube } from "../../components/Youtube/Youtube";
import systemNodeExampleImg from "../../images/systemNodeExample.png";
import callRegisterNodeExampleImg from "../../images/callRegisterNodeExample.png";
import toolsNodeExampleImg from "../../images/toolsNodeExample.png";
import userNodeExampleImg from "../../images/userNodeExample.png";
import advanceToolsNodeExampleImg from "../../images/advanceTools.png";
import { advanceToolsNode } from "./aiIntentJson";
export const AIIntent = () => {
  const [systemNodeJSON, setSystemNodeJSON] = useState({});
  const [userNodeJSON, setUserNodeJSON] = useState({});
  const [toolNodeJSON, setToolNodeJSON] = useState({});
  const [callRegisterNodeJSON, setCallRegisterNode] = useState({});

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/montaque22/node-red-contrib-ai-intent/master/examples/openai-system-node-example.json"
    )
      .then((data) => data.json())
      .then(setSystemNodeJSON);
    fetch(
      "https://raw.githubusercontent.com/montaque22/node-red-contrib-ai-intent/master/examples/openai-user-node-exampe.json"
    )
      .then((data) => data.json())
      .then(setUserNodeJSON);
    fetch(
      "https://raw.githubusercontent.com/montaque22/node-red-contrib-ai-intent/master/examples/openai-tool-node-example.json"
    )
      .then((data) => data.json())
      .then(setToolNodeJSON);
    fetch(
      "https://raw.githubusercontent.com/montaque22/node-red-contrib-ai-intent/master/examples/openai-call-registered-intent-example.json"
    )
      .then((data) => data.json())
      .then(setCallRegisterNode);
  });
  return (
    <Post
      baseclass="ai-intent"
      title="Easily Use GPT in your automations with this plugin"
    >
      <Post.Body>
        <b>AI Intent</b> is a node-red plugin design to harness GPT in your
        flows with little friction. As a Home Assistant User, I primarily use
        node-red to create my automations. Node-Red by itself is powerful but
        leveraging GPT in my automations has unlocked automations you only see
        in movies. I've created automations that summarize my calendar, announce
        when tasks are complete, and keep me informed on what is happening all
        over my house. If you want to learn more on how to use <b>AI-Intent</b>{" "}
        check out the video below.
      </Post.Body>
      <Youtube url="https://www.youtube.com/embed/J0_mi7U0wCM" />
      <Post.Body>
        You can find additional examples on how this plugin works by checking
        out the
        <a
          href="https://github.com/montaque22/node-red-contrib-ai-intent"
          target="_blank"
          rel="noreferrer"
        >
          Github repo
        </a>
      </Post.Body>
      <Post.Section
        subTitle="User Node Example"
        summary={`User node is defines your interaction with GPT. These are the questions and commands you tell the LLM`}
        image={userNodeExampleImg}
        json={userNodeJSON}
      />
      <Post.Section
        subTitle="System Node Example"
        summary={`System node is responsible for defining the context (universe) for GPT to operate under.`}
        image={systemNodeExampleImg}
        json={systemNodeJSON}
      />

      <Post.Section
        subTitle="Tool Node Example"
        summary={`A sophisticated way to define the schema (or shape) of a function that GPT can call.
        GPT will respond with the parameters needed for you to successfully call the function/command`}
        image={toolsNodeExampleImg}
        json={toolNodeJSON}
      />

      <Youtube url="https://www.youtube.com/embed/SsHZHYIfn04" />

      <Post.Section
        subTitle="Advanced Usage for the Tool Node"
        summary={`Learn more powerful techniques to help you create something unrivaled in the mainstream market`}
        image={advanceToolsNodeExampleImg}
        json={advanceToolsNode}
      />

      <Youtube url="https://www.youtube.com/embed/oWP8es4g4D0" />
      <Post.Section
        subTitle="Call/Register Node Example"
        summary={`Connects two automations/flows together. When combined with the other AI-Intent Nodes, it allows GPT
        to instantly trigger functions locally in your system. The caveat is that you cannot define parameters GPT should
        return.`}
        image={callRegisterNodeExampleImg}
        json={callRegisterNodeJSON}
      />
    </Post>
  );
};
