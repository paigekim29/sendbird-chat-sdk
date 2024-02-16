'use client';

import { useRouter } from 'next/navigation';
import { Image, List } from 'antd-mobile';
import { useAtomValue } from 'jotai';
import { sendbirdInfoAtom } from '@/atom/store';
import createChannelName from '@/utils/create-channel-name';
import useGetInvitedChannels from '@/hooks/useGetInvitedChannels';
import FloatingButton from '@/components/parts/FloatingButton';
import CustomSuspense from '@/components/parts/CustomSuspense';

function ChannelComponent() {
  const { isLoading } = useGetInvitedChannels();
  const sendbirdInfo = useAtomValue(sendbirdInfoAtom);

  const router = useRouter();

  return (
    <>
      <CustomSuspense
        isLoading={isLoading}
        hasData={!!sendbirdInfo.channels.length}
        emptyContext="Connect with Sendbird :)"
      >
        <List>
          {sendbirdInfo.channels.map((channel) => (
            <List.Item
              clickable
              key={channel.url}
              onClick={() => router.push(`/channel/${channel.url}`)}
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
              description={(channel.lastMessage as any)?.message || ''}
            >
              {createChannelName(channel.members)}
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
