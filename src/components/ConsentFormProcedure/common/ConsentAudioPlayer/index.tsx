import { FC } from 'react';
import Button from 'components/Common/Button';
import AudioPlayer from 'components/ConsentFormProcedure/common/AudioPlayer';

interface Props {
  isPlaying: boolean;
  togglePlayback: () => void;
  audioUrl: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ConsentAudioPlayer: FC<Props> = ({ isPlaying, togglePlayback, audioUrl, size = 'xl' }) => (
  <>
    <Button
      iconUrl={isPlaying ? 'src/assets/svg/pause.svg' : 'src/assets/svg/play.svg'}
      rounded
      size={size}
      onClick={togglePlayback}
      className="mb-sm"
    />

    <AudioPlayer audioUrl={audioUrl} isPlaying={isPlaying} onEnded={togglePlayback} />
  </>
);

export default ConsentAudioPlayer;
