import React from "react";
import { Post } from "../../components/Post/Post";
import { Youtube } from "../../components/Youtube/Youtube";

export const AIIntent = () => {
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
    </Post>
  );
};
