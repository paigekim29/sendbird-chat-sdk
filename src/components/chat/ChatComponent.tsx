'use client';

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Button, Input, SafeArea, Space, Toast } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import CustomSuspense from '@/components/parts/CustomSuspense';
import useGetMessages from '@/hooks/useGetMessages';

import { GroupChannel } from '@sendbird/chat/groupChannel';
import { BaseMessage, UserMessage } from '@sendbird/chat/message';

interface ChatComponentProps {
  channel?: GroupChannel;
}

function ChatComponent({ channel }: ChatComponentProps) {
  const [messageList, setMessageList] = useState<BaseMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');

  const channelRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const { isLoading } = useGetMessages(channel, setMessageList);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    channel
      ?.sendUserMessage({
        message: messageInput,
      })
      .onSucceeded((message) => {
        setMessageList([...messageList, message]);
        setMessageInput('');
      })
      .onFailed((error) => {
        console.error(error);
        Toast.show({
          content: 'An error occurred while sending a message.',
        });
      });
  };

  const scrollToBottom = (item: HTMLDivElement | null) => {
    item?.scrollTo({
      top: item.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom(channelRef.current);
  }, [channel]);

  useEffect(() => {
    scrollToBottom(channelRef.current);
  }, [messageList]);

  return (
    <>
      <div className="flex flex-col items-center justify-between mt-3 mx-2">
        <div className="w-full overflow-y-auto flex flex-col min-h-full" style={{ maxHeight: '84vh' }} ref={channelRef}>
          <CustomSuspense
            hasData={!!messageList.length}
            isLoading={isLoading}
            emptyContext="Let's connect with Sendbird :)"
          >
            <Space direction="vertical" className="flex flex-col w-fit p-2">
              {messageList.map((message, index) => (
                <span key={index} className="border-2 border-solid border-gray-300 rounded-xl px-2">
                  {(message as any).message}
                </span>
              ))}
            </Space>
          </CustomSuspense>
          <form
            className="absolute bottom-0 w-full max-w-xl flex justify-between items-center gap-3 mb-3 pr-2"
            onSubmit={sendMessage}
          >
            <Input
              value={messageInput}
              maxLength={10000}
              onChange={(val) => {
                setMessageInput(val);
              }}
              className="border-2 border-solid border-gray-400 rounded p-2"
            />
            <Button color="primary" fill="solid" size="large" disabled={!messageInput.length} type="submit">
              <RightOutline />
            </Button>
          </form>
        </div>
      </div>
      <SafeArea position="bottom" />
    </>
  );
}

export default ChatComponent;
