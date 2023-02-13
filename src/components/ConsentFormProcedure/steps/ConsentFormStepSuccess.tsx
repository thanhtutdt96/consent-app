import { Link } from 'react-router-dom';
import Button from 'components/Common/Button';

const ConsentFormStepSuccess = () => {
  return (
    <div className="flex column items-center">
      <Button iconUrl="src/assets/svg/success.svg" rounded size="xl" className="mb-lg" />
      <p>Thank you, your consent has been successfully saved!</p>
      <Link to="consents" className="consent-form-step-success__cta-view-all">
        View all consents
      </Link>
    </div>
  );
};

export default ConsentFormStepSuccess;
