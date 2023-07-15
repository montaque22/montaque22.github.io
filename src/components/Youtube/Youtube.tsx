import React from "react";

export const Youtube = (props: { url: string; timeGate?: Date }) => {
  const { url, timeGate } = props;
  const now = new Date();
  const shouldHidePost = timeGate ? now < timeGate : false;

  const renderYoutubeVideo = () => {
    if (url) {
      return (
        <div className="flex justify-center m-10">
          <iframe
            width="560"
            height="315"
            src={url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    }
  };

  if (shouldHidePost) {
    return null;
  }

  return renderYoutubeVideo() ?? null;
};
