import ConsentItem from 'components/ConsentItem';
import { CONSENT_LIST_KEY } from 'assets/constants';
import useLocalStorage from 'hooks/useLocalStorage';
import { ConsentItemData } from 'types/Common';
import './styles.scss';

const Consents = () => {
  const [consentList] = useLocalStorage<ConsentItemData[]>(CONSENT_LIST_KEY, []);

  return (
    <>
      <h2 className="text-center text-lg mb-xl">All Consents</h2>
      <div className="flex justify-center">
        <div className="consents__list-wrapper">
          <div className="flex justify-between mb-md text-bold">
            <div>Details</div>
            <div className="ml-auto flex">
              <div className="mr-sm">Consent</div>
              <div>Given</div>
            </div>
          </div>
          {consentList.map(
            (
              { name, language, audio_url: audioUrl, is_consent_agreed: isConsentAgreed },
              index,
            ) => (
              <ConsentItem
                key={index}
                index={index}
                name={name}
                language={language}
                audioUrl={audioUrl}
                isConsentAgreed={isConsentAgreed}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Consents;
