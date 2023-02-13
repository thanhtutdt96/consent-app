import { lazy } from 'react';
import ConsentFormProcedure from 'components/ConsentFormProcedure';

const Toast = lazy(() => import('components/Common/Toast'));

const Home = () => {
  return (
    <>
      <h2 className="text-center text-lg mb-xl">Consent Form</h2>
      <ConsentFormProcedure />
      <Toast />
    </>
  );
};

export default Home;
