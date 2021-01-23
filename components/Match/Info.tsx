import React from "react";
import { Block, Header } from "components/layout";
import { Match } from "types";
import InfoLinks from "components/shared/InfoLinks";

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
            <div key={video.id} className="mb-2 _video-container">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </Block>
      )}
      {images && (
        <Block>
          <Header text="Photos" />
          {images.map((image) => {
            return (
              <p key={image.url} className="mb-2">
                <a
                  href={image.url}
                  className="text-link hover:text-link-hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={image.url} className="w-full" />
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
