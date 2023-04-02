import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import Button from 'components/Common/Button';
import ConsentAgreementContent from 'components/ConsentFormProcedure/common/ConsentAgreementContent';
import ConsentRecognition from 'components/ConsentFormProcedure/common/ConsentRecognition';
import { CONSENT_LIST_KEY } from 'assets/constants';
import arrowRightIcon from 'assets/svg/arrow-right.svg';
import retryIcon from 'assets/svg/retry.svg';
import useLocalStorage from 'hooks/useLocalStorage';
import {
  ConsentFormStep,
  ConsentItemAgreement,
  ConsentItemData,
  ConsentItemLanguage,
} from 'types/Common';
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

  const yesLabel = useMemo(
    () =>
      currentFormData.language === ConsentItemLanguage.EN
        ? ConsentItemAgreement.YES
        : ConsentItemAgreement.OUI,
    [currentFormData.language],
  );

  const noLabel = useMemo(
    () =>
      currentFormData.language === ConsentItemLanguage.EN
        ? ConsentItemAgreement.NO
        : ConsentItemAgreement.NON,
    [currentFormData.language],
  );

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
      <ConsentAgreementContent yesLabel={yesLabel} noLabel={noLabel} />

      <ConsentRecognition
        className="mt-lg"
        language={currentFormData.language}
        yesLabel={yesLabel}
        noLabel={noLabel}
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
            iconUrl={retryIcon}
            className="py-sm px-md mr-sm"
            onClick={retryHandler}
          >
            Retry
          </Button>
        )}

        <Button
          type="submit"
          iconUrl={arrowRightIcon}
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
