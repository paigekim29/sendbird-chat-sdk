'use client';

import { usePathname } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { sendbirdInfoAtom } from '@/atom/store';
import createTitle from '@/utils/create-title';
import PageLayout from '@/components/layouts/PageLayout';
import ChatComponent from '@/components/chat/ChatComponent';

function Chat() {
  const pathname = usePathname();
  const sendbirdInfo = useAtomValue(sendbirdInfoAtom);

  const currentChannel = (sendbirdInfo?.channels || []).find(
    (channel) => channel.url === pathname.split('/').slice(2)[0],
  );

  const title = createTitle(currentChannel?.members || [], sendbirdInfo?.userId || '');

  return (
    <PageLayout title={title}>
      <ChatComponent channel={currentChannel} />
    </PageLayout>
  );
}

export default Chat;
