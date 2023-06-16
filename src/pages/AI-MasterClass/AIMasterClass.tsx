import React from "react";
import { Post } from "../../components/Post/Post";
import { Youtube } from "../../components/Youtube/Youtube";
import { context, episodeOne, episodeThree, episodeTwo } from "./nodes";
import episodeOneImg from "../../images/AI-MasterClass-EP-1.png";
import episodeTwoImg from "../../images/episodeTwo.png";
import episodeThreeImg from "../../images/episodeThree.png";

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
        title="2. Add GPT to Home Assistant in 10 Minutes! Make it EPIC in 10 more!"
        summary={`There are several integrations out there that allows you to utilize GPT in Home
        Assistant but i've never seen people use it used in an automation. At the time of writing, the OpenAI integration only
        allows you talk to GPT on a dashboard. But my version HITS DIFFERENT. I believe it is where Home Assistant will go after a few month of testing and development
        and it's where I believe the smart home community expects it to go. At the end of this lesson you will be able to use GPT in an automation flow and get answers
        about your smart home as well as any other general knowledge GPT has.`}
      />
      <Youtube url="https://www.youtube.com/embed/1tq9UbLfDtY" />
      <Post.Section
        summary={`When a message comes in from Telegram the next node sets the a property called
              "prompt" to the text sent from telegram. the "getEntities" node fetches all the entities in
              your home assistant environment and the "Filter for specific entities" will search for
              any entity with an id that starts with "light." The following node updates the "prompt" text to 
              with information about your smart home and the question you want to ask GPT. The "OpenAI" node
              will send the message and return an answer which will be cleaned up and formatted byt the
              "Sanitize response" node. Lastly the message from OpenAI is sent back to Telegram.`}
        json={episodeTwo}
        image={episodeTwoImg}
      />
      <Post.Section
        title="3. Get GPT to Trigger Your Automations!"
        summary={`After some digging, I think I'm the first person to figure out how to get GPT to control your
        Home Automations without actually having physical control or connection to your system.
        This is experimental and I am certain that in time, a better integration will be available to enable a more 
        seamless and tightly coupled experience. Until that time, the content below shows how you can use your 
        AI Chatbot to control your smart home with GPT-3's help.`}
        timeGate={new Date("May 24, 2023 8:30 AM")}
      />
      <Youtube
        url="https://www.youtube.com/embed/uFCnuJ5x6u4"
        timeGate={new Date("May 24, 2023 8:30 AM")}
      />
      <Post.Section
        summary={`GPT is able to control our automations by providing the entities and the action to perform on those
        entities based on the context give. We provide OpenAI relevant Devices and actions and ask it to return a JSON
        Object that satisfies the criteria. This mean that we do not need to provide any new code or alternate way of saying
        "Turn of the lights" as GPT is able to infer what we want. It should be noted that this implementation 
        takes 2 trips to OpenAI's server to complete any request. Currently,
        there is a contest to see if this can be reduced to a single succinct request.`}
        timeGate={new Date("May 24, 2023 8:30 AM")}
        json={episodeThree}
        image={episodeThreeImg}
      />

      {/* <Post.Section
        title="4. GPT took over my home!"
        summary={`Coming Soon`}
        timeGate={new Date("June 17, 2023")}
      /> */}
    </Post>
  );
};
