import React from "react";
import { Post } from "../../components/Post/Post";
import { goodnight } from "./goodnight";
import bedAutomation from "../../images/beforeBed.png";
import { Youtube } from "../../components/Youtube/Youtube";
export const STier = () => {
  return (
    <Post
      baseclass="stier"
      title="Avoid this lame trigger and use this one instead"
    >
      <Post.Body>
        Below are some automations that are triggered Good Night This is an
        iPhone specific automation and is triggered when the phone is plugged in
        at bedtime. This automation has 2 parts. The first is setting up the
        automation in Home Assistant using Node-Red. The second part is setting
        up the trigger on your iOS device.
      </Post.Body>

      <Youtube url="https://www.youtube.com/embed/uRzoJCkh3WE" />

      <Post.Section
        title="In Home Assistant"
        summary={`To keep things simple, this result of this automation is to call a link-out node that would run a list of desired automations.`}
        image={bedAutomation}
        json={goodnight}
      />

      <Post.Section
        title="iOS Device"
        summary={`The automation above is triggered via a webhook which we will run using an iPhone.
        The instructions below show how to set personal automation which triggers a webhook when the phone
        is connected to power.`}
        instructions={[
          {
            text: (
              <span>
                Open the Shortcuts app and go to the <b>Automation</b> tab and
                click the <b>+</b> button
              </span>
            ),
          },

          {
            text: (
              <span>
                Tap <b>Create Personal Automation</b>
              </span>
            ),
          },
          {
            text: (
              <span>
                Choose <b>Charger</b> ➡ <b>Is Connected</b> ➡ <b>Next</b>
              </span>
            ),
          },

          {
            text: (
              <span>
                Add a new action and choose <b>Get Current Focus</b>
              </span>
            ),
          },
          {
            text: (
              <span>
                Now choose the <b>If-statement</b> next and set it to say{" "}
                <b>If Current Focus has any value</b> as the condition
              </span>
            ),
          },

          {
            text: (
              <span>
                Set the action for this condition to be{" "}
                <b>Get Contents of URL</b>
              </span>
            ),
          },
        ]}
      />
    </Post>
  );
};
