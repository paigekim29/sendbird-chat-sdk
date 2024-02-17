'use client';

import { useRouter } from 'next/navigation';
import { Image, List } from 'antd-mobile';
import { useAtomValue } from 'jotai';
import { sendbirdInfoAtom } from '@/atom/store';
import createEllipsis from '@/utils/create-ellipsis';
import useGetInvitedChannels from '@/hooks/useGetInvitedChannels';
import FloatingButton from '@/components/parts/FloatingButton';
import CustomSuspense from '@/components/parts/CustomSuspense';

function ChannelComponent() {
  const { isLoading } = useGetInvitedChannels();
  const sendbirdInfo = useAtomValue(sendbirdInfoAtom);

  const router = useRouter();

  const handleDescription = (message: string) => {
    if (message && message.length > 20) {
      return message.slice(0, 20) + '...';
    } else {
      return message || '';
    }
  };

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
