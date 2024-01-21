import React from "react";
import { Post } from "../../components/Post/Post";
import { Youtube } from "../../components/Youtube/Youtube";
import { batteryStatusJson } from "./batterStatus";
import batteryStatusImg from "../../images/batteryStatus.png";

export const BatteryStatus = () => {
  return (
    <Post baseclass="battery-status" title="Use GPT to report device status">
      <Post.Body>
        This automation relies on GPT to run business logic and determine if a
        device status requires attention. To connect my automation to GPT, I use{" "}
        <a href="/aiIntent">AI-Intent</a> which allows me to tell GPT what I
        care about. Below is an automation that highlights this capability.
        <a href="/aiIntent">Click here (AI-Intent)</a> to see how to install
        this plugin into Node-Red
      </Post.Body>
      <Youtube url="https://www.youtube.com/embed/T-cIfzZxTmc" />
      <Post.Section
        subTitle="Battery Status Automation"
        summary={`This automation uses the Home assistant render node to query for all devices with "battery" in it's name.
        The result along with their states are passed to GPT`}
        image={batteryStatusImg}
        json={batteryStatusJson}
      />
    </Post>
  );
};
