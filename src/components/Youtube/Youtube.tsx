import React from "react";

export const Youtube = (props: { url: string }) => {
  const { url } = props;
  const renderYoutubeVideo = () => {
    if (url) {
      return (
        <div className="flex justify-center mb-10">
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

  return renderYoutubeVideo() ?? null;
};
