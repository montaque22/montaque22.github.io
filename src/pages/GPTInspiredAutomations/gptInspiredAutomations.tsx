import React from "react";
import { Post } from "../../components/Post/Post";
import { Youtube } from "../../components/Youtube/Youtube";
import { emailGuardian, fourLevels, storytime } from "./gptAutomationsJson";
import LevelSummaryImg from "../../images/summary.png";
import StoryTimeImg from "../../images/storytime.png";
import EmailGuardianImg from "../../images/emailGuardian.png";

export const GPTInspiredAutomations = () => {
  return (
    <Post
      baseclass="gpt-inspired-automations"
      title="Useful automations inspired by GPT"
    >
      <Youtube url="https://www.youtube.com/embed/wnIDPz436z0" />
      <Post.Body>
        These automations are examples of how GPT can be used to achieve some
        useful automations. They use <a href="/aiIntent">AI-Intent</a> which are
        special nodes that communicate to OpenAI.
      </Post.Body>

      <Youtube url="https://www.youtube.com/embed/TDwhX24x1PE" />
      <Post.Section
        subTitle="Bath-time Stories"
        summary={`Create an automation that can generate creative stories for your little one.`}
        image={StoryTimeImg}
        json={storytime}
      />

      <Youtube url="https://www.youtube.com/embed/ewN_8FTlxTE" />
      <Post.Section
        subTitle="Email Guardian"
        summary={`Use GPT to analyze you're email and alert you about specific occurances you care about`}
        image={EmailGuardianImg}
        json={emailGuardian}
      />

      <Youtube url="https://www.youtube.com/embed/H38JbIAwQaE" />
      <Post.Section
        subTitle="4 levels "
        summary={`Learn how to create the Event Summary automation. The JSON below are 4 levels seen in the video.`}
        image={LevelSummaryImg}
        json={fourLevels}
      />
    </Post>
  );
};
