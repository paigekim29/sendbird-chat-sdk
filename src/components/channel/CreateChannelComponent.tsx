'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckList, List } from 'antd-mobile';
import FloatingButton from '@/components/parts/FloatingButton';

function CreateChannelComponent() {
  const [selected, setSelected] = useState(1);

  const router = useRouter();

  const handleCreateChannel = () => {
    // TODO Add create channel logic
    router.push(`/channel/1`);
  };

  return (
    <>
      <CheckList multiple defaultValue={selected ? [selected] : []} onChange={(val) => setSelected(val)}>
        {new Array(100).fill('user').map((n, i) => (
          <CheckList.Item key={i} value={i}>
            {n}-{i}
          </CheckList.Item>
        ))}
      </CheckList>
      <List>
        {new Array(100).fill('Users').map((n, i) => (
          <List.Item key={i}>
            {n}-{i}
          </List.Item>
        ))}
      </List>
      <FloatingButton handleRouter={handleCreateChannel} />
    </>
  );
}

export default CreateChannelComponent;
