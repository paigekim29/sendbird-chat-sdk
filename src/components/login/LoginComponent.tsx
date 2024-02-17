'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Space, Toast } from 'antd-mobile';
import { useSetAtom } from 'jotai';
import { sendbirdInfoAtom } from '@/atom/store';
import Sendbird from '@/utils/sendbird';

function LoginComponent() {
  const setSendbirdInfo = useSetAtom(sendbirdInfoAtom);

  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');

  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const sendbirdChat = await Sendbird(id);
      await sendbirdChat.setChannelInvitationPreference(true);

      setSendbirdInfo({
        nickname: nickname,
        userId: id,
      });
      await sendbirdChat.updateCurrentUserInfo({
        nickname,
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
    <form className="flex h-screen" onSubmit={onSubmit}>
      <Space direction="vertical" className="m-auto" align="end">
        <Input
          placeholder="id"
          value={id}
          onChange={(val) => {
            setId(val);
          }}
          className="border-2 border-solid border-gray-400 rounded p-1"
        />
        <Input
          placeholder="nickname"
          value={nickname}
          onChange={(val) => {
            setNickname(val);
          }}
          className="border-2 border-solid border-gray-400 rounded p-1"
        />
        <Button color="primary" fill="solid" disabled={!id.length || !nickname.length} type="submit">
          CONNECT
        </Button>
      </Space>
    </form>
  );
}

export default LoginComponent;
