import { lazy } from 'react';
import { useOutlet } from 'react-router';
import Navbar from 'components/Common/Navbar';

const Toast = lazy(() => import('components/Common/Toast'));

const MainLayout = () => {
  const currentOutlet = useOutlet();

  return (
    <div className="App">
      <div className="container">
        <Navbar />
        {currentOutlet}
        <Toast />
      </div>
    </div>
  );
};

export default MainLayout;
