import { FC, useEffect, useRef } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { alert } from 'redux/slices/toastSlice';
import { ToastType } from 'types/Common';

type Props = {
  audioUrl: string;
  isPlaying: boolean;
  onEnded: () => void;
};

const AudioPlayer: FC<Props> = ({ audioUrl, isPlaying, onEnded }) => {
  const ref = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isPlaying) {
      void ref.current.play().catch((error) => {
        dispatch(alert(error.toString() || 'Error', ToastType.ERROR));
      });
    } else {
      ref.current.pause();
    }
  }, [dispatch, isPlaying]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio src={audioUrl} ref={ref} controls={false} onEnded={onEnded} />
  );
};

export default AudioPlayer;
