'use client';

import { usePathname } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { sendbirdInfoAtom } from '@/atom/store';
import PageLayout from '@/components/layouts/PageLayout';
import ChatComponent from '@/components/chat/ChatComponent';

import { Member } from '@sendbird/chat/groupChannel';

function Chat() {
  const pathname = usePathname();
  const sendbirdInfo = useAtomValue(sendbirdInfoAtom);

  const currentChannel = sendbirdInfo.channels.find((channel) => channel.url === pathname.split('/').slice(2)[0]);

  const createTitle = (members: Member[]) => {
    switch (members?.length) {
      case 0:
        return 'Chat';
      case 1:
        return members[0]?.nickname || 'Chat';
      case 2:
        return members.find((member) => member.userId !== sendbirdInfo?.userId)?.nickname || 'Chat';
      default:
        return `Group ${members.length}`;
    }
  };

  return (
    <PageLayout title={currentChannel?.members ? createTitle(currentChannel.members) : 'Chat'}>
      <ChatComponent channel={currentChannel} />
    </PageLayout>
  );
}

export default Chat;
