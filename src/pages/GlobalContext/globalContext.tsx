import React from "react";
import { Post } from "../../components/Post/Post";
import { contextSubflow, example } from "./automations";
import context from "../../images/context.png";
import { Youtube } from "../../components/Youtube/Youtube";
import { Code } from "../../components/Code/Code";
export const GlobalContext = () => {
  return (
    <Post baseclass="global-context" title="Save Anything... Temporarily">
      <Post.Body>
        This node-red subflow was designed to be used as a way to create back
        and forth interaction between different automations. The context will
        save whatever is in the payload for up to two minutes and automatically
        discard it. However, the 2-minute timer would reset if you saved more
        information.
      </Post.Body>

      <Post.Section
        title="Context Automation"
        summary={`Context will store the given information into
the Global Context Store. This means that 
information store here is accessible to ANY
automation. The Context node is meant to 
allow Home Assistant to "Remember" information
for a short period of time to help enrich
user experience. A typical example would be
saving a state before making a change.`}
        image={context}
        json={contextSubflow}
      />
      <Post.Section
        title="How does it work"
        summary={`Reference the image above to understand the properties below.`}
      >
        <p>
          <b> {"Key: "}</b>
          This is the property name you want to store you info under.
        </p>
        <p>
          <b> {"Value Property: "}</b>
          This is the propery path in the msg object where the data you want to
          store is kept. Consider the following msg object:
        </p>
        <Code json={example} hideCopy />
        <p>
          Lets say you wanted to store the array at the data property. In the
          Value Property you would put <b>{" payload.event.data"}</b>
        </p>
        <p>
          <b> {"Treat above as value instead: "}</b>
          This will treat the information in the Value Property as data instead
          of a path to data. Using the previous example, if Treat above as value
          instead was checked this node would instead store the string
          <b>{" 'payload.event.data'"}</b>
        </p>
        <br />
        <p>
          <b> {"Action"}</b>
        </p>
        <ul>
          <li>
            <b>{"Find: "}</b> Will return the value stored at key. This will
            ignore all the other properties
          </li>
          <li>
            <b>{"Save: "}</b> Store the data in/at Value Property under the
            specified key. Remember, data store will last about 2 minutes and
            will be purged
          </li>
          <li>
            <b>{"Clear: "}</b> Removes the information at the specified key
          </li>
        </ul>
      </Post.Section>
    </Post>
  );
};
