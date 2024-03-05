import React from "react";
import { Post } from "../../components/Post/Post";
import voicemailImg from "../../images/voicemail.png";
import voicemailSimpleImg from "../../images/voicemailSimple.png";
import voicemailThumbnail from "../../images/Voicmail Automation.jpg";
import importBlueprint from "../../images/importBlueprint.gif";
import {
  voicemailAutomation,
  voicemailAutomationSimple,
} from "./voicemailJson";

export const Voicemail = () => {
  return (
    <Post baseclass="voicemail" title="Todo List == Voicemail Automation">
      <Post.Body>
        You can use Home Asisstance Todo List integration to create a dope
        automation that acts like an answering machine. Whenever your smart home
        needs to send you a message, it can send it to voicemail where it can be
        replayed later. The best part is that you don't need to wait for an
        event for something to be placed into voicemail. Anything you manually
        place in voicemail will be replayed later once you activate the trigger.
      </Post.Body>

      <Post.Section image={voicemailThumbnail} />

      {/* <Youtube url="https://www.youtube.com/embed/J0_mi7U0wCM" /> */}

      <Post.Section
        title="Voicemail Automation (With GPT)"
        summary={`This automation has 2 main parts. The first section is the trigger which adds items to the voicemail todo list. 
        This trigger will not add duplicates (most of the time). The second part of the trigger will replay each item in the list and remove them from the list.
        NOTE: This automation requires the use of AI-Intent Nodes to leveral GPT. Check the menu and search for AI-Intent to learn more.`}
        image={voicemailImg}
        json={voicemailAutomation}
      />

      <Post.Section
        title="Voicemail Automation (No GPT)"
        summary={`This automation is the same as the first except it does not require AI-Intent and does not use GPT to summarize the list.`}
        image={voicemailSimpleImg}
        json={voicemailAutomationSimple}
      />

      <Post.Section
        title="Voicemail Automation Home Assistant Blueprint (No GPT)"
        image={importBlueprint}
      >
        <p>
          This automation is similar to its node-red counterpart, but it does
          not have the part of the automation that saves the message into the
          todo-list. Since home assisant automations are a little different than
          the node-red version, it is easer if you simply made the service call
          to store the todo item yourself.
          <br />
          <br />
          <em>
            Special thanks to{" "}
            <a href="https://www.linkedin.com/in/andersonimes/">
              Anderson Imes
            </a>{" "}
            for creating this blueprint.
          </em>
          <br />
          <br />
          <ul>
            <li>
              Copy the url:{" "}
              <a href="https://gist.github.com/andersonimes/1a7aa4771c4ab994a0b95822abdde7f5">
                https://gist.github.com/andersonimes/1a7aa4771c4ab994a0b95822abdde7f5
              </a>
            </li>
            <li>On the Blueprints tab, click import and paste the URL.</li>
          </ul>
        </p>
      </Post.Section>
    </Post>
  );
};
