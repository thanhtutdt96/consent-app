import ConsentItem from 'components/ConsentItem';
import { ConsentItemHeader } from 'components/ConsentItem/common/ConsentItemHeader';
import { CONSENT_LIST_KEY } from 'assets/constants';
import useBlobHelper from 'hooks/useBlobHelper';
import useLocalStorage from 'hooks/useLocalStorage';
import { ConsentItemData } from 'types/Common';
import './styles.scss';

const Consents = () => {
  const [consentList] = useLocalStorage<ConsentItemData[]>(CONSENT_LIST_KEY, []);
  const { dataUriToBlobUri } = useBlobHelper();

  return (
    <>
      <h2 className="text-center text-lg mb-xl">All Consents</h2>
      <div className="flex justify-center">
        {consentList.length > 0 ? (
          <div className="consents__list-wrapper">
            <ConsentItemHeader />

            {consentList.map(
              (
                { name, language, audio_data: audioData, is_consent_agreed: isConsentAgreed },
                index,
              ) => (
                <ConsentItem
                  key={index}
                  index={index}
                  name={name}
                  language={language}
                  audioUrl={dataUriToBlobUri(audioData || '')}
                  isConsentAgreed={isConsentAgreed}
                />
              ),
            )}
          </div>
        ) : (
          <p>No consents available</p>
        )}
      </div>
    </>
  );
};

export default Consents;
