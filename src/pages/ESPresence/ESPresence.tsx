import { Post } from "../../components/Post/Post";
import { lightAutomation } from "./nodes";
import espresenceMbLight from "../../images/espresence-mb-light.png";

export const ESPresence = () => {
  return (
    <Post title="ESPresence Automations">
      <Post.Section
        title="Room Occupancy"
        summary={`The following automation uses both the ESPresence and Ring Motion sensor
              to detect if someone is in a room. At first I built this automation to only use Motion
              Sensor but it did not work the way I wanted since Motion Sensors have difficulty
              picking up small motion. As a result my wife would get upset because the room would go
              dark while she is reading. 😅 The automation you see below is the improved version that
              uses ESPresence to determine if a person is in currently in a room by tracking specific bluetooth
              enabled devices such as our phones.`}
        image={espresenceMbLight}
      />
      <Post.Section
        title="Prerequisites"
        summary={`These automations require the following additional equipment and software`}
        instructions={[
          {
            text: <a href="https://espresense.com/">Setup ESpresence</a>,
          },
          {
            text: "Motion sensors (any kind compatible with Home Assistant should do)",
          },
          {
            text: (
              <a href="https://flows.nodered.org/node/node-red-contrib-debounce-leading-trailing">
                node-red-contrib-debounce-leading-trailing
              </a>
            ),
          },
        ]}
      />
      <Post.Section
        title="How it works"
        instructions={[
          {
            text: (
              <span>
                The first node triggers whenever the Ring Motion Sensor
                triggers.
              </span>
            ),
          },
          {
            text: (
              <span>
                <b>Preserve Motion Data:</b>
                simply stores the payload of the motion sensor state in a
                separate property so i don't lose it
              </span>
            ),
          },
          {
            text: (
              <span>
                <b>Motion Gate Enabled:</b>
                This is a helper switch in home assistant to act as deadman
                switch. If the switch is on, the automation is free to execute,
                otherwise the automation will stop. This is used prevent the
                automation from doing too much in during the day or if we simply
                want to control it manually.
              </span>
            ),
          },
          {
            text: (
              <span>
                If the sun is below the horizon and it's during part of the
                night I am certain my wife and i will be awake, the automation
                is allowed to execute. I'll refer to this ideal state as "during
                working hours"
              </span>
            ),
          },
          {
            text: (
              <span>
                <b>"During working hours":</b>
                While the automation is allowed to run, it check the stored
                property if the motion triggered on. If it did, it checks the{" "}
                <b>Motion Gate</b> one more time and then sets the lights to
                100%. At the same time (in parallel) it checks to see if the
                lights are on. If the lights are on, the automation starts the
                process to "turn off the lights".
              </span>
            ),
          },
          {
            text: (
              <div>
                <span>
                  <b>"Turn off the lights":</b>
                  This process gets started under 3 circumstances
                </span>
                <ul style={{ marginLeft: "25px" }}>
                  <li>
                    1. If the motion sensor triggers on during working hours
                  </li>
                  <li>
                    2. If the motion sensor triggers off during "working hours"
                  </li>
                  <li>
                    3. If the motion sensor triggers outside "working hours"
                    (this is a fail-safe)
                  </li>
                </ul>
                <span>
                  This process will first check to see if lights are on. If this
                  is true then it will start two parallel processes. Both
                  process are debounced nodes that will execute after 10 and 20
                  mins of <em>NO ACTIVITY</em>. This mean that once the lights
                  turn on or the room registers that there is no motion It will
                  start a 10 minute time and a 20 minute timer. If there is no
                  activity, for 10 minutes the first timer will move on and
                  check to see if ESPresence detects noone in the room. If this
                  true it will check the <b>Motion Gate</b>
                  again and then set the lights to 40% brightness. After 10 more
                  minutes of inactivity if no motion was detected the last
                  debounce node will move forward and verify with ESPresences
                  that there is noone in the room at which point the lights will
                  turn off.
                </span>
              </div>
            ),
          },
        ]}
      />
      <Post.Section json={lightAutomation} />
    </Post>
  );
};
