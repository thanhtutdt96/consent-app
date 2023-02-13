import { useState } from 'react';
import ConsentFormStepAgreement from 'components/ConsentFormProcedure/steps/ConsentFormStepAgreement';
import ConsentFormStepInfo from 'components/ConsentFormProcedure/steps/ConsentFormStepInfo';
import ConsentFormStepSuccess from 'components/ConsentFormProcedure/steps/ConsentFormStepSuccess';
import { v4 as uuidv4 } from 'uuid';
import { ConsentFormStep, ConsentItemData } from 'types/Common';
import './styles.scss';

const ConsentFormProcedure = () => {
  const [currentStep, setCurrentStep] = useState<ConsentFormStep>(ConsentFormStep.INFO);
  const [currentFormData, setCurrentFormData] = useState<ConsentItemData>({
    name: '',
    language: '',
    uuid: uuidv4(),
  });

  return (
    <div className="flex justify-center consent-form-procedure">
      {currentStep === ConsentFormStep.INFO && (
        <ConsentFormStepInfo
          setCurrentStep={setCurrentStep}
          setCurrentFormData={setCurrentFormData}
        />
      )}
      {currentStep === ConsentFormStep.AGREEMENT && (
        <ConsentFormStepAgreement
          currentFormData={currentFormData}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === ConsentFormStep.SUCCESS && <ConsentFormStepSuccess />}
    </div>
  );
};

export default ConsentFormProcedure;
