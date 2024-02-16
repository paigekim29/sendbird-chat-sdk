import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Toast } from 'antd-mobile';
import Sendbird from '@/utils/sendbird';
import { sendbirdInfoAtom } from '@/atom/store';

const useGetAllApplicationUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sendbirdInfo, setSendbirdInfo] = useAtom(sendbirdInfoAtom);

  const handleSendbirdInfo = async () => {
    try {
      const sendbirdChat = await Sendbird(sendbirdInfo.userId);

      const userQuery = sendbirdChat.createApplicationUserListQuery({ limit: 100 });
      const users = await userQuery.next();
      setSendbirdInfo({
        ...sendbirdInfo,
        applicationUsers: users,
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Toast.show({
        content: 'An error occurred. Please refresh the page.',
      });
    }
  };

  useEffect(() => {
    if (!sendbirdInfo.userId) {
      return;
    }
    handleSendbirdInfo();
  }, [sendbirdInfo.userId]);

  return { isLoading };
};

export default useGetAllApplicationUsers;
