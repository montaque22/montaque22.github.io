import React from "react";
import { Post } from "../../components/Post/Post";
import { demo } from "./demo";

import "./home.scss";

export const Home = () => {
  return (
    <Post baseclass="home" title="Welcome to Chaperone!">
      <p></p>
      <Post.Section
        summary={` This companion guide will show you interesting, sometimes complex,
        node-red configurations that can enhance your home assistant
        automations. But don't worry! I made it easy to achieve these automations.
            The snippet below represents a collection of nodes or complete automations and you
            will see these snippets all throughout the site. I've made My automations available for import
            which is easy to do!`}
        json={demo}
        instructions={[
          {
            text: "At you're own discretion, Click copy",
          },
          {
            text: "Go to Node-Red in Home Assistant and open the Hamburger menu",
          },
          {
            text: "Click Import",
          },
          {
            text: "With the clipboard tab selected, paste in the JSON and you can choose to import it into an existing flow (or board) or you can import it into a new flow.",
          },
          {
            text: "Click Import",
          },
          {
            text: "If you see a dialog, Its telling you that 1 or more of your nodes already exist somewhere in the system.",
          },
        ]}
      />
    </Post>
  );
};
