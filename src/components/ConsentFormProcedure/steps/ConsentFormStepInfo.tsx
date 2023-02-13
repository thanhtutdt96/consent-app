import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import Button from 'components/Common/Button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ConsentFormStep, ConsentItemData, ConsentItemLanguage } from 'types/Common';

const FormErrorMessage = ({ children }: { children: ReactNode }) => (
  <div className="text-xs text-danger mt-xs">{children}</div>
);

interface Props {
  setCurrentStep: Dispatch<SetStateAction<ConsentFormStep>>;
  setCurrentFormData: Dispatch<SetStateAction<ConsentItemData>>;
}

const ConsentFormStepInfo: FC<Props> = ({ setCurrentStep, setCurrentFormData }) => {
  const initialValues = {
    name: '',
    language: '',
  };

  const languages = [ConsentItemLanguage.EN, ConsentItemLanguage.FR];

  const validateForm = ({ name, language }: ConsentItemData) => {
    const errors: Record<string, string> = {};

    if (!name) {
      errors.name = 'Required';
    }

    if (!language) {
      errors.language = 'Required';
    }

    return errors;
  };

  const submitHandler = (formData: ConsentItemData) => {
    setCurrentFormData(formData);
    setCurrentStep(ConsentFormStep.AGREEMENT);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={submitHandler}
      enableReinitialize
    >
      {() => (
        <Form>
          <div className="mb-lg">
            <label htmlFor="name" className="ml-sm">
              Name
            </label>
            <div className="flex column mt-sm">
              <Field id="name" name="name" type="text" className="px-sm" />
              <ErrorMessage
                name="name"
                render={(errorMessage) => <FormErrorMessage>{errorMessage}</FormErrorMessage>}
              />
            </div>
          </div>

          <div className="mb-lg">
            <label htmlFor="date" className="ml-sm">
              Language
            </label>
            <div className="flex column mt-sm">
              <Field as="select" name="language" className="px-sm">
                <option value="" disabled>
                  Select language
                </option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="language"
                render={(errorMessage) => <FormErrorMessage>{errorMessage}</FormErrorMessage>}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" iconUrl="src/assets/svg/arrow-right.svg" className="py-sm px-md">
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ConsentFormStepInfo;
