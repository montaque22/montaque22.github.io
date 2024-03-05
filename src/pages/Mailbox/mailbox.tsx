import React from "react";
import { Post } from "../../components/Post/Post";
import { mailbox, mailboxReset } from "./mailboxJson";
import mailboxImg from "../../images/mailbox.png";
import mailboxResetImg from "../../images/mailbox-reset.png";
import { Youtube } from "../../components/Youtube/Youtube";
export const Mailbox = () => {
  return (
    <Post baseclass="stier" title="Mailbox automation with YoLink">
      <Youtube url="https://www.youtube.com/embed/UcKt4cvlsUI" />

      <Post.Section
        title="Mailbox State Change Automation"
        summary={` This is an automation i use to track the state of my mailbox. It uses a
        LoRa sensor to trigger the automation however you can update this
        automation to use whatever trigger you like. This automation also relies on a helper that has the following states:
        Empty, Delivered, Retrieved, Forgotten`}
        image={mailboxImg}
        json={mailbox}
      />
      <Post.Section
        title="Reset Mailbox"
        summary={`At 7pm every evening the status of the mailbox resets. If we haven't picked up the mail it is considered
        forgotten otherwise the mailbox state is set back to empty`}
        image={mailboxResetImg}
        json={mailboxReset}
      />
    </Post>
  );
};
