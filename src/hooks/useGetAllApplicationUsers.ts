import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Toast } from 'antd-mobile';
import Sendbird from '@/utils/sendbird';
import { sendbirdInfoAtom } from '@/atom/store';

import { User } from '@sendbird/chat';

const useGetAllApplicationUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [applicationUsers, setApplicationUsers] = useState<User[]>([]);

  const sendbirdInfo = useAtomValue(sendbirdInfoAtom);

  const handleSendbirdInfo = async () => {
    try {
      const sendbirdChat = await Sendbird(sendbirdInfo?.userId || '');

      const userQuery = sendbirdChat.createApplicationUserListQuery({ limit: 100 });
      const users = await userQuery.next();
      setApplicationUsers(users);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Toast.show({
        content: 'An error occurred. Please refresh the page.',
        position: 'top',
      });
    }
  };

  useEffect(() => {
    if (!sendbirdInfo.userId) {
      return;
    }
    handleSendbirdInfo();
  }, [sendbirdInfo.userId]);

  return { isLoading, applicationUsers };
};

export default useGetAllApplicationUsers;
