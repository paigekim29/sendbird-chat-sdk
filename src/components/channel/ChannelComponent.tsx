'use client';

import { useRouter } from 'next/navigation';
import { Image, List } from 'antd-mobile';
import { useAtom, useAtomValue } from 'jotai';
import { sendbirdInfoAtom } from '@/atom/store';
import createEllipsis from '@/utils/create-ellipsis';
import useGetInvitedChannels from '@/hooks/useGetInvitedChannels';
import FloatingButton from '@/components/parts/FloatingButton';
import CustomSuspense from '@/components/parts/CustomSuspense';
import { GroupChannel } from '@sendbird/chat/groupChannel';

function ChannelComponent() {
  const { isLoading } = useGetInvitedChannels();
  const [sendbirdInfo, setSendbirdInfo] = useAtom(sendbirdInfoAtom);

  const router = useRouter();

  const handleDescription = (message: string) => {
    if (message && message.length > 20) {
      return message.slice(0, 20) + '...';
    } else {
      return message || '';
    }
  };

  const handleChannel = (channel: GroupChannel) => {
    setSendbirdInfo({
      ...sendbirdInfo,
      currentChannel: channel,
    });

    router.push(`/channel/${channel.url}`);
  };

  return (
    <>
      <CustomSuspense
        isLoading={isLoading}
        hasData={!!(sendbirdInfo?.channels || []).length}
        emptyContext="Connect with Sendbird :)"
      >
        <List>
          {(sendbirdInfo?.channels || []).map((channel: GroupChannel) => (
            <List.Item
              clickable
              key={channel.url}
              onClick={() => handleChannel(channel)}
              prefix={
                <Image
                  src={channel.coverUrl}
                  style={{ borderRadius: 20 }}
                  fit="cover"
                  width={40}
                  height={40}
                  className="my-3"
                />
              }
              description={handleDescription((channel.lastMessage as any)?.message || '')}
            >
              {createEllipsis(channel.members, 20)}
              {channel.members.length > 2 && <span className="text-gray-400 ml-4">{channel.members.length}</span>}
            </List.Item>
          ))}
        </List>
      </CustomSuspense>
      <FloatingButton handleRouter={() => router.push('channel/create')} />
    </>
  );
}

export default ChannelComponent;
