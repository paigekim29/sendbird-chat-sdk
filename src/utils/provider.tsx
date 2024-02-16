'use client';

import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import { DevTools } from 'jotai-devtools';

function Provider({ children }: React.PropsWithChildren) {
  return (
    <>
      <ConfigProvider locale={enUS}>{children}</ConfigProvider>
      <DevTools />
    </>
  );
}

export default Provider;
