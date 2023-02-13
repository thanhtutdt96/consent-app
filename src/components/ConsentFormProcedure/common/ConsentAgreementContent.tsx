import { memo } from 'react';

const ConsentAgreementContent = () => (
  <>
    <p>
      You understand that by using the site or site services, you agree to be bound by this
      agreement. If you do not accept this agreement in its entirety, you must not access or use the
      site or the site services.
    </p>

    <p>Do you agree to this agreement? Please respond by saying “Yes” or “No”.</p>

    <p className="text-center text-sm">(Hold the mic button to speak and release)</p>
  </>
);

export default memo(ConsentAgreementContent);
