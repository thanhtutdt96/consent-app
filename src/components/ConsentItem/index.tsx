import { FC, memo, useState } from 'react';
import ConsentAudioPlayer from 'components/ConsentFormProcedure/common/ConsentAudioPlayer';
import './styles.scss';

interface Props {
  name: string;
  language: string;
  audioUrl?: string | null;
  isConsentAgreed?: boolean;
  index: number;
}

const ConsentItem: FC<Props> = ({ name, language, audioUrl, isConsentAgreed, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    setIsPlaying((previousValue) => !previousValue);
  };

  return (
    <div className={`flex justify-between px-md py-sm ${index % 2 === 0 ? 'consent-item--even' : ''}`}>
      <div className="flex column justify-center">
        <div className="consent-item__name text-bold mb-xs">{name}</div>
        <div className="text-xs consent-item__language">Language: {language}</div>
      </div>

      <div className="flex items-center">
        <img
          src={isConsentAgreed ? 'src/assets/svg/checked.svg' : 'src/assets/svg/unchecked.svg'}
          alt="Consent agreement"
          className="mr-lg"
        />

        {audioUrl && (
          <ConsentAudioPlayer
            audioUrl={audioUrl}
            isPlaying={isPlaying}
            togglePlayback={togglePlayback}
            size="sm"
          />
        )}
      </div>
    </div>
  );
};

export default memo(ConsentItem);
