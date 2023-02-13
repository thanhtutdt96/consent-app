import React, { useEffect, useRef } from 'react';

type Props = {
  audioUrl: string;
  isPlaying: boolean;
  onEnded: () => void;
};

const AudioPlayer: React.FC<Props> = ({ audioUrl, isPlaying, onEnded }) => {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isPlaying) {
      void ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio src={audioUrl} ref={ref} controls={false} onEnded={onEnded} />
  );
};

export default AudioPlayer;
