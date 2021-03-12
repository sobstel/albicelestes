import React from "react";
import { Block, Header } from "components/layout";
import { Match } from "types";
import InfoLinks from "components/InfoLinks";

type Props = { match: Pick<Match, "info"> };

export default function Info({ match }: Props) {
  if (!match.info) {
    return null;
  }

  const { images, youtube, trivia, links } = match.info;

  return (
    <div>
      {youtube && (
        <Block>
          <Header text="Videos" />
          {youtube.map((video) => (
            <div key={video.id}>
              <div className="mb-2 _video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  frameBorder="0"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ))}
          <style jsx>{`
            ._video-container {
              overflow: hidden;
              position: relative;
              width: 100%;
            }
            ._video-container::after {
              padding-top: 56.25%;
              display: block;
              content: "";
            }
            ._video-container iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          `}</style>
        </Block>
      )}
      {images && (
        <Block>
          <Header text="Photos" />
          {images.map((image) => {
            return (
              <p key={image.url} className="mb-2">
                <a href={image.url} target="_blank" rel="noopener noreferrer">
                  <img src={image.url} loading="lazy" className="w-full" />
                </a>
              </p>
            );
          })}
        </Block>
      )}
      {trivia && (
        <Block>
          <Header text="Trivia" />
          {trivia.map((text) => (
            <p key={text} className="mb-4">
              {text}
            </p>
          ))}
        </Block>
      )}
      <InfoLinks links={links} />
    </div>
  );
}
