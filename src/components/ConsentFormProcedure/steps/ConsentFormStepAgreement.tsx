import { Dispatch, FC, SetStateAction, useState } from 'react';
import Button from 'components/Common/Button';
import ConsentAgreementContent from 'components/ConsentFormProcedure/common/ConsentAgreementContent';
import ConsentRecognition from 'components/ConsentFormProcedure/common/ConsentRecognition';
import { CONSENT_LIST_KEY } from 'assets/constants';
import useLocalStorage from 'hooks/useLocalStorage';
import { ConsentFormStep, ConsentItemData } from 'types/Common';
import './styles.scss';

interface Props {
  setCurrentStep: Dispatch<SetStateAction<ConsentFormStep>>;
  currentFormData: ConsentItemData;
}

const ConsentFormStepAgreement: FC<Props> = ({ currentFormData, setCurrentStep }) => {
  const [audioData, setAudioData] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isConsentAgreed, setIsConsentAgreed] = useState(false);

  const [, setConsentList] = useLocalStorage<ConsentItemData[]>(CONSENT_LIST_KEY, []);

  const retryHandler = () => {
    setAudioUrl(null);
    setAudioData(null);
  };

  const submitHandler = () => {
    if (!audioData) {
      return;
    }

    setConsentList((prevList) => [
      ...prevList,
      {
        ...currentFormData,
        is_consent_agreed: isConsentAgreed,
        audio_data: audioData,
      },
    ]);

    setCurrentStep(ConsentFormStep.SUCCESS);
  };

  return (
    <div className="consent-form-step-agreement">
      <ConsentAgreementContent />

      <ConsentRecognition
        className="mt-lg"
        language={currentFormData.language}
        audioUrl={audioUrl}
        setAudioUrl={setAudioUrl}
        setAudioData={setAudioData}
        isConsentAgreed={isConsentAgreed}
        setIsConsentAgreed={setIsConsentAgreed}
      />

      <div className="flex justify-end mt-lg">
        {audioUrl && (
          <Button
            type="button"
            iconUrl="src/assets/svg/retry.svg"
            className="py-sm px-md mr-sm"
            onClick={retryHandler}
          >
            Retry
          </Button>
        )}

        <Button
          type="submit"
          iconUrl="src/assets/svg/arrow-right.svg"
          className="py-sm px-md"
          disabled={!audioUrl}
          onClick={submitHandler}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ConsentFormStepAgreement;
