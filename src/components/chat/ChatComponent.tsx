'use client';

import { useState } from 'react';

import { Button, Input, SafeArea, Space } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';

function ChatComponent() {
  const [value, setValue] = useState('');

  return (
    <>
      <div className="flex flex-col items-center justify-between mt-3 mx-2">
        <div className="w-full overflow-y-auto flex flex-col min-h-full" style={{ maxHeight: '86vh' }}>
          <Space direction="vertical" className="flex flex-col w-fit">
            {new Array(100).fill("Hello, I'm Paige.").map((n, index) => (
              <div key={index} className="border-2 border-solid border-gray-300 rounded-xl px-2">
                {n}
              </div>
            ))}
          </Space>
          <div className="absolute bottom-0 w-full max-w-xl flex justify-between items-center gap-3 mb-3 pr-2">
            <Input
              value={value}
              onChange={(val) => {
                setValue(val);
              }}
              className="border-2 border-solid border-gray-400 rounded p-2"
            />
            <Button color="primary" fill="solid" size="large" disabled={!value.length}>
              <RightOutline />
            </Button>
          </div>
        </div>
      </div>
      <SafeArea position="bottom" />
    </>
  );
}

export default ChatComponent;
