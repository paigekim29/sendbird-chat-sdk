'use client';

import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import { Provider as JotaiProvider } from 'jotai';
import { DevTools } from 'jotai-devtools';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

function Provider({ children }: React.PropsWithChildren) {
  return (
    <JotaiProvider>
      <ConfigProvider locale={enUS}>{children}</ConfigProvider>
      <DevTools />
    </JotaiProvider>
  );
}

export default Provider;
