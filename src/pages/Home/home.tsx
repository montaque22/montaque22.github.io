import React from "react";
import { Post } from "../../components/Post/Post";

import "./home.scss";

export const Home = () => {
  return (
    <Post baseclass="home" title="Welcome to Chaperone!">
      <p>
        This companion guide will show you interesting, sometimes complex,
        node-red configurations that can enhance your home assistant
        automations.
      </p>
    </Post>
  );
};
