'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckList, Toast } from 'antd-mobile';
import { useAtomValue } from 'jotai';
import { sendbirdInfoAtom } from '@/atom/store';
import Sendbird from '@/utils/sendbird';
import useGetAllApplicationUsers from '@/hooks/useGetAllApplicationUsers';
import FloatingButton from '@/components/parts/FloatingButton';
import CustomSuspense from '@/components/parts/CustomSuspense';

import { CheckListValue } from 'antd-mobile/es/components/check-list';

function CreateChannelComponent() {
  const sendbirdInfo = useAtomValue(sendbirdInfoAtom);

  const [selected, setSelected] = useState<string[]>([sendbirdInfo?.userId || '']);
  const { isLoading, applicationUsers } = useGetAllApplicationUsers();

  const usersList = applicationUsers.filter((user) => user.userId !== sendbirdInfo?.userId);

  const router = useRouter();

  const handleSelectedUsers = (val: CheckListValue[]) => {
    setSelected(val.map(String));
  };

  const handleCreateChannel = async () => {
    const randomChannelName = Math.random().toString(36).substring(7);
    try {
      const sendbirdChat = await Sendbird(sendbirdInfo?.userId || '');

      const selectedWithUser = [...selected, sendbirdInfo?.userId];
      const groupChannelParams = {
        name: randomChannelName,
        invitedUserIds: selectedWithUser,
        operationUserIds: selectedWithUser,
      };

      await sendbirdChat.groupChannel.createChannel(groupChannelParams);

      Toast.show({
        content: 'A new channel has been created.',
        position: 'top',
      });

      router.push('/channel');
    } catch (error) {
      console.error(error);
      Toast.show({
        content: 'An error occurred. Please try again.',
        position: 'top',
      });
    }
  };

  return (
    <CustomSuspense isLoading={isLoading} hasData={!!applicationUsers.length} emptyContext="Please refresh the page.">
      <CheckList multiple onChange={(val) => handleSelectedUsers(val)}>
        {usersList.map((user) => (
          <CheckList.Item key={user.userId} value={user.userId}>
            {user?.nickname || user.userId}
          </CheckList.Item>
        ))}
      </CheckList>
      <FloatingButton handleRouter={handleCreateChannel} />
    </CustomSuspense>
  );
}

export default CreateChannelComponent;
