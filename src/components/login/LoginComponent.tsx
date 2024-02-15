'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Space } from 'antd-mobile';

function LoginComponent() {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');

  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('userInfo', JSON.stringify({ id, nickname }));
    router.push('/channel');
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
