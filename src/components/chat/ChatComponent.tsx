'use client';

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import useGetMessages from '@/hooks/useGetMessages';
import CustomSuspense from '@/components/parts/CustomSuspense';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';

import { GroupChannel } from '@sendbird/chat/groupChannel';
import { BaseMessage } from '@sendbird/chat/message';

interface ChatComponentProps {
  channel?: GroupChannel;
}

function ChatComponent({ channel }: ChatComponentProps) {
  const [messageList, setMessageList] = useState<BaseMessage[]>([]);

  const channelRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const { isLoading } = useGetMessages(channel, setMessageList);

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
    <div className="flex flex-col items-center justify-between mt-3 mx-2">
      <div className="w-full overflow-y-auto flex flex-col min-h-full" style={{ maxHeight: '84vh' }} ref={channelRef}>
        <CustomSuspense
          hasData={!!messageList.length}
          isLoading={isLoading}
          emptyContext="Let's connect with Sendbird :)"
        >
          <MessageList messageList={messageList} />
        </CustomSuspense>
        {channel && <MessageInput channel={channel} messageList={messageList} setMessageList={setMessageList} />}
      </div>
    </div>
  );
}

export default ChatComponent;
