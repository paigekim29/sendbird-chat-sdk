'use client';

import { useRouter } from 'next/navigation';
import { List } from 'antd-mobile';
import FloatingButton from '@/components/parts/FloatingButton';

function ChannelComponent() {
  const router = useRouter();

  const handleChannel = (i: number) => {
    router.push(`/channel/${i}`);
  };

  return (
    <>
      <List>
        {new Array(100).fill('Channel').map((n, i) => (
          <List.Item clickable key={i} onClick={() => handleChannel(i)}>
            {n}-{i}
          </List.Item>
        ))}
      </List>
      <FloatingButton handleRouter={() => router.push('channel/create')} />
    </>
  );
}

export default ChannelComponent;
