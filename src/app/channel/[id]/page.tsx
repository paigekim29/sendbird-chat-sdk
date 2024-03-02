'use client';

import { useAtomValue } from 'jotai';
import { sendbirdInfoAtom } from '@/atom/store';
import createTitle from '@/utils/create-title';
import PageLayout from '@/components/layouts/PageLayout';
import ChatComponent from '@/components/chat/ChatComponent';

function Chat() {
  const sendbirdInfo = useAtomValue(sendbirdInfoAtom);
  const currentChannel = sendbirdInfo?.currentChannel;
  const userId = sendbirdInfo?.userId || '';

  const title = createTitle(currentChannel?.members || [], userId);

  return (
    <PageLayout title={title}>
      <ChatComponent channel={currentChannel} />
    </PageLayout>
  );
}

export default Chat;
