import React from "react";
import Section from "components/Layout/Section";

type Props = {
  match: Match;
  info: MatchInfo;
};

export default function Info({ info }: Props) {
  const { images, youtube, trivia } = info;

  return (
    <div>
      {youtube && (
        <Section title="Videos">
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
        </Section>
      )}
      {images && (
        <Section title="Photos">
          {images.map((image) => {
            return (
              <p key={image.url} className="mb-2">
                <a
                  href={image.url}
                  className="text-blue-600 hover:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={image.url} className="w-full" />
                </a>
              </p>
            );
          })}
        </Section>
      )}
      {trivia && (
        <Section title="Trivia">
          {trivia.map((text) => (
            <p key={text} className="mb-4">
              {text}
            </p>
          ))}
        </Section>
      )}

      <div>
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
      </div>
    </div>
  );
}
