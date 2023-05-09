import TranslationProvider from '@components/TranslationProvider';
import { ConferenceCreateProvider } from '@context/ConferenceCreateContext';
import { CommsProvider, ThemeProvider } from '@dolbyio/comms-uikit-react';
import { Navigator } from '@src/routes/Navigator';
import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import VoxeetSDK from '@voxeet/voxeet-web-sdk';

import './App.module.scss';

const App = () => {
  const location = useLocation();
  VoxeetSDK.packageUrlPrefix = `${window.location.origin}${import.meta.env.BASE_URL}assets/wasm`
  const urlToken = useMemo(() => {
    return encodeURIComponent(new URLSearchParams(window.location.search).get('token') || '');
  }, [location]);

  const YOUR_TOKEN = urlToken;

  return (
    <TranslationProvider>
      <ConferenceCreateProvider>
        <CommsProvider
          token={"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkb2xieS5pbyIsImlhdCI6MTY4MzYwMjUyMywic3ViIjoiemQzREt5amlsY3B2bUd2WU1UZXg5dz09IiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiJdLCJ0YXJnZXQiOiJzZXNzaW9uIiwib2lkIjoiZWM3NjFkYWYtYzk0OS00MGEwLTg4NzQtYjczMTg5MDRmYjE2IiwiYWlkIjoiZjI5ZmI5YmItNDY2My00YjY4LWJjZjgtODcxODIwNDg0ZThjIiwiYmlkIjoiOGEzNjlkNDM4N2ZiM2Q1YzAxODdmYzk0MjQwNzY0MmIiLCJleHAiOjE2ODM2ODg5MjN9.M6NqrQ6b8sz3IRcr64pn2Bv0z_OkycclYHYF0TNigNrXbK56yw2BC3-Pe0OthD5mLbkJhSepFG_1Bz9_3m_icw"} 
          packageUrlPrefix={`${window.location.origin}${
            import.meta.env.BASE_URL
          }assets/wasm`}
        >
          <ThemeProvider
            customThemes={{
              'My Theme': { colors: { white: 'yellow', primary: { 400: 'red' }, secondary: { 400: 'blue' } } },
            }}
          >
            <Navigator />
          </ThemeProvider>
        </CommsProvider>
      </ConferenceCreateProvider>
    </TranslationProvider>
  );
};

const container = document.getElementById('root');
// no-non-null-assertion comes from official react docs
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
