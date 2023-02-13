import { useOutlet } from 'react-router';
import Navbar from 'components/Common/Navbar';

const MainLayout = () => {
  const currentOutlet = useOutlet();

  return (
    <div className="App">
      <div className="container">
        <Navbar />
        {currentOutlet}
      </div>
    </div>
  );
};

export default MainLayout;
