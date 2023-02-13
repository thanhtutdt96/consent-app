import ConsentItem from 'components/ConsentItem';
import { ConsentItemHeader } from 'components/ConsentItem/common/ConsentItemHeader';
import { CONSENT_LIST_KEY } from 'assets/constants';
import useLocalStorage from 'hooks/useLocalStorage';
import { ConsentItemData } from 'types/Common';
import './styles.scss';

const Consents = () => {
  const [consentList] = useLocalStorage<ConsentItemData[]>(CONSENT_LIST_KEY, []);

  const dataURItoBlob = (dataURI: string) => {
    // convert base64 to raw binary data held in a string
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      array[i] = byteString.charCodeAt(i);
    }

    const dataView = new DataView(arrayBuffer);
    const blob = new Blob([dataView], { type: mimeString });

    return URL.createObjectURL(blob);
  };

  return (
    <>
      <h2 className="text-center text-lg mb-xl">All Consents</h2>
      <div className="flex justify-center">
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
                audioUrl={dataURItoBlob(audioData || '')}
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
