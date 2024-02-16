'use client';

import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import { Provider as JotaiProvider } from 'jotai';
import { DevTools } from 'jotai-devtools';

function Provider({ children }: React.PropsWithChildren) {
  return (
    <JotaiProvider>
      <ConfigProvider locale={enUS}>{children}</ConfigProvider>
      <DevTools />
    </JotaiProvider>
  );
}

export default Provider;
