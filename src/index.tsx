import { Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from 'redux/store';
import App from 'App';
import 'styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    {/* eslint-disable-next-line react/jsx-no-undef */}
    <Suspense fallback={<div>Loading... </div>}>
      <App />
    </Suspense>
  </Provider>,
);
