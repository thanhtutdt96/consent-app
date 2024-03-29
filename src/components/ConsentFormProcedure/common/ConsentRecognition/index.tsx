import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Button from 'components/Common/Button';
import ConsentAudioPlayer from 'components/ConsentFormProcedure/common/ConsentAudioPlayer';
import { useAppDispatch } from 'redux/hooks';
import { alert } from 'redux/slices/toastSlice';
import recordIcon from 'assets/svg/record.svg';
import recordingIcon from 'assets/svg/recording.svg';
import { ConsentItemAgreement, ConsentItemLanguage, ToastType } from 'types/Common';

interface Props {
  className?: string;
  language: string;
  yesLabel: string;
  noLabel: string;
  audioUrl: string | null;
  setAudioUrl: Dispatch<SetStateAction<string | null>>;
  setAudioData: Dispatch<SetStateAction<string | null>>;
  isConsentAgreed: boolean;
  setIsConsentAgreed: Dispatch<SetStateAction<boolean>>;
}

const ConsentRecognition: FC<Props> = ({
  className,
  language,
  yesLabel,
  noLabel,
  audioUrl,
  setAudioUrl,
  setAudioData,
  isConsentAgreed,
  setIsConsentAgreed,
}) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useAppDispatch();

  const isRecordExisted = useMemo(() => {
    return !isRecording && transcript.length > 0 && audioUrl;
  }, [audioUrl, isRecording, transcript.length]);

  const saveAudioData = useCallback(
    (blob: Blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setAudioData(base64data);
      };
    },
    [setAudioData],
  );

  const initSpeechRecognition = useCallback(() => {
    recognitionRef.current = new window.webkitSpeechRecognition();

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const speechToText = event.results[0][0].transcript.toLowerCase();

      setTranscript(speechToText);

      switch (language) {
        case ConsentItemLanguage.FR:
          if (speechToText.includes(ConsentItemAgreement.OUI.toLowerCase())) {
            setIsConsentAgreed(true);

            return;
          }

          if (speechToText.includes(ConsentItemAgreement.NON.toLowerCase())) {
            setIsConsentAgreed(false);
          }

          break;
        default:
          if (speechToText.includes(ConsentItemAgreement.YES.toLowerCase())) {
            setIsConsentAgreed(true);

            return;
          }

          if (speechToText.includes(ConsentItemAgreement.NO.toLowerCase())) {
            setIsConsentAgreed(false);
          }

          break;
      }
    };
  }, [language, setIsConsentAgreed]);

  const initMediaRecorder = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
          audioChunksRef.current.push(event.data);
        });

        mediaRecorderRef.current.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunksRef.current);
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);

          saveAudioData(audioBlob);
        });
      })
      .catch((error) => {
        dispatch(alert(error.toString() || 'Error', ToastType.ERROR));
      });
  }, [dispatch, saveAudioData, setAudioUrl]);

  const stopMediaRecorder = () => {
    if (!mediaRecorderRef.current) {
      return;
    }

    mediaRecorderRef.current.stop();
  };

  const startRecording = () => {
    recognitionRef.current?.start();

    setIsRecording(true);
    setTranscript('');

    audioChunksRef.current = [];
    mediaRecorderRef.current?.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);

    stopMediaRecorder();
  };

  const togglePlayback = () => {
    setIsPlaying((previousValue) => !previousValue);
  };

  useEffect(() => {
    initMediaRecorder();
    initSpeechRecognition();
  }, [initMediaRecorder, initSpeechRecognition]);

  return (
    <div className={className}>
      <div className="flex column items-center">
        {!isRecordExisted ? (
          <Button
            iconUrl={isRecording ? recordingIcon : recordIcon}
            rounded
            size="xl"
            onTouchStart={startRecording}
            onMouseDown={startRecording}
            onTouchEnd={stopRecording}
            onMouseUp={stopRecording}
            className="mb-sm"
          />
        ) : (
          <>
            {audioUrl && (
              <ConsentAudioPlayer
                audioUrl={audioUrl}
                isPlaying={isPlaying}
                togglePlayback={togglePlayback}
                className="mb-sm"
              />
            )}
          </>
        )}
        {isRecordExisted && (
          <p className="mb-0">You responded “{isConsentAgreed ? yesLabel : noLabel}”</p>
        )}
      </div>
    </div>
  );
};

export default ConsentRecognition;
