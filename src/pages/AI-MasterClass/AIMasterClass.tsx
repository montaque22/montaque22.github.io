import React from "react";
import { Post } from "../../components/Post/Post";
import { Youtube } from "../../components/Youtube/Youtube";
import { episodeOne } from "./nodes";
import episodeOneImg from "../../images/AI-MasterClass-EP-1.png";

export const AIMasterClass = () => {
  return (
    <Post
      baseclass="ai-masterclass"
      title="Create an AI Chatbot using GPT-3 to control your smart home"
    >
      <Post.Body>
        This is a unique utilization of GPT within Home Assistant which enables
        you to not only ask your chatbot questions about your home, but also
        gives your AI bot the ability to make changes such as toggling lights
        and other devices.
      </Post.Body>

      <Post.Body>
        GPT-3 makes it very easy to create an AI chatbot however there are some
        challenges we need to overcome to get it to work in a meaningful way
        within our smarhome. Here is what we must overcome:
      </Post.Body>
      <ul>
        <li>Integrating Telegram into Home Assistant</li>
        <li>Integrate GPT-3 into Home Assistant </li>
        <li>Enable IA Chatbot to run simple commands</li>
        <li>Enable IA Chatbot to run complex commands</li>
      </ul>

      <Post.Section
        title="1. Integrating Telegram into Home Assistant"
        summary={`In the video below, I explain how create a telegram bot and connect it to home assistant.
        I also explain how the Telegram events work and how you can see them in your automations. This is the first step
        in creating a personal AI chatbot capable of controlling your smart home.`}
      />
      <Youtube url="https://www.youtube.com/embed/wl8ZWBjpBoA" />

      <Post.Section
        summary={`Once you you add Telegram to your config yaml file, you should have new services available to you
        inside node-reds Call-Service node. If you followed the video you should have a similar setup of nodes you see
        below. However, if you were unable to follow or simply did not feel like it, you can import the JSON
        below to get the same exact setup and nodes I have.`}
        json={episodeOne}
        image={episodeOneImg}
      />

      <Post.Section
        title="2. Integrate GPT-3 into Home Assistant"
        summary={`Coming Soon`}
      />
    </Post>
  );
};
