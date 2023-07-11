import React from "react";
import { Post } from "../../components/Post/Post";
import { childGuardAutomation } from "./automations";
import babyEscape from "../../images/baby-escape.png";
import { Youtube } from "../../components/Youtube/Youtube";
export const ChildGuardAutomation = () => {
  return (
    <Post
      baseclass="child-guard"
      title="This simple automation could've prevented this nightmare"
    >
      <Post.Body>
        Last week, we had a scary moment as our child unexpectedly climbed out
        of her crib. Normally, we wouldn't care but since none of us in the
        house expected it, she was not only able to wander around the house but
        she also went outside for several minutes with none of us aware!
        Needless to say, she is okay, but this new development urged us to
        expand our smart-home to allow her the freedom of mobility without
        compromising security. My family agreed on this following smarthome
        automation.
      </Post.Body>

      <Youtube url="https://www.youtube.com/embed/nsZzunK1tlo" />

      <Post.Section
        title="Baby Escape Detection Automation"
        summary={`This automation uses a motion sensor to detect motion directly in front of the crib. If the child escapes the crib and touches the ground, the motion sensor will trigger.
        which will set the smart bulbs in both the baby and parent's room to red and send a message to the Google Speakers in both rooms. This is a simple automation and has a
        lot of room to expand such as activate cameras and locking doors. This automation was designed to take advantage of existing hardware I already had in the room so the
        only additional thing I needed to purchase was the Aqara Motion Sensor. For quick access to the hardware I used in this automation click the links below.`}
        instructions={[
          {
            text: (
              <a
                href="https://www.amazon.com/Aqara-Configurable-Detection-Automations-Compatible/dp/B0B9XZ1D51/ref=sr_1_2?crid=3J0NA35WQ9KGC&amp;keywords=aqara&amp;qid=1688969341&amp;sprefix=aqar%252Caps%252C273&amp;sr=8-2&_encoding=UTF8&tag=technithusias-20&linkCode=ur2&linkId=c50070844aa2652675c717e382c98b71&camp=1789&creative=9325"
                target="_blank"
              >
                Aqara Motion Sensor
              </a>
            ),
          },

          {
            text: (
              <a
                href="https://www.amazon.com/Aqara-WXKG11LM-Switch-Wireless-Remote/dp/B07D19YXND/ref=sr_1_3?crid=3J0NA35WQ9KGC&amp;keywords=aqara&amp;qid=1688969341&amp;sprefix=aqar%252Caps%252C273&amp;sr=8-3&_encoding=UTF8&tag=technithusias-20&linkCode=ur2&linkId=ff31b8de21853bd57189e24f100af7ad&camp=1789&creative=9325"
                target="_blank"
              >
                Aqara Button (Mini Switch)
              </a>
            ),
          },
          {
            text: (
              <a
                href="https://www.amazon.com/smart-light-bulbs-alexa-wifi/dp/B08TB6VXFL/ref=sr_1_7?keywords=tp+link+kasa+light+bulb&amp;qid=1689010248&amp;sprefix=tp+link+bul%252Caps%252C266&amp;sr=8-7&_encoding=UTF8&tag=technithusias-20&linkCode=ur2&linkId=04711e287a8f41f804de869f706b4897&camp=1789&creative=9325"
                target="_blank"
              >
                TP-Link Smart Bulbs
              </a>
            ),
          },
          {
            text: (
              <a
                href="https://store.google.com/product/google_nest_mini"
                target="_blank"
              >
                Google Nest Mini / Google{" "}
              </a>
            ),
          },
          {
            text: (
              <em>
                Links included in this description might be affiliate links. If
                you purchase a product or service with the links that I provide
                I may receive a small commission. There is no additional charge
                to you! Thank you for supporting me so I can continue to provide
                you with dope free content!
              </em>
            ),
          },
        ]}
        image={babyEscape}
        json={childGuardAutomation}
      />
    </Post>
  );
};
