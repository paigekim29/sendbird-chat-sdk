'use client';

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { sendbirdInfoAtom } from '@/atom/store';
import useGetMessages from '@/hooks/useGetMessages';
import createEllipsis from '@/utils/create-ellipsis';
import CustomSuspense from '@/components/parts/CustomSuspense';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';

import { GroupChannel } from '@sendbird/chat/groupChannel';
import { BaseMessage } from '@sendbird/chat/message';
import { DotLoading } from 'antd-mobile';

interface ChatComponentProps {
  channel?: GroupChannel;
}

export interface FetchMoreInterface {
  previous: boolean;
  next: boolean;
}

function ChatComponent({ channel }: ChatComponentProps) {
  const [messageList, setMessageList] = useState<BaseMessage[]>([]);
  const [fetchMore, setFetchMore] = useState<FetchMoreInterface>({
    previous: false,
    next: false,
  });

  const sendbirdInfo = useAtomValue(sendbirdInfoAtom);
  const typingMembers = sendbirdInfo?.typingMembers;

  const channelRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const { isLoading } = useGetMessages(channel, setMessageList, fetchMore, setFetchMore);

  const scrollToBottom = (item: HTMLDivElement | null) => {
    item?.scrollTo({
      top: item.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom(channelRef.current);
  }, [channel, messageList, typingMembers]);

  const handleScroll = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop === 0) {
      setFetchMore({
        previous: true,
        next: false,
      });
    }
    if (scrollTop + clientHeight >= scrollHeight) {
      setFetchMore({
        previous: false,
        next: true,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between mt-3 mx-2">
      <div
        className="w-full overflow-y-auto flex flex-col min-h-full"
        style={{ maxHeight: '84vh' }}
        ref={channelRef}
        onScroll={handleScroll}
      >
        <CustomSuspense
          hasData={!!messageList.length}
          isLoading={isLoading}
          emptyContext="Let's connect with Sendbird :)"
        >
          <MessageList messageList={messageList} />
        </CustomSuspense>
        {!!sendbirdInfo?.typingMembers?.length && (
          <div className="mx-2">
            {createEllipsis(sendbirdInfo?.userId || '', sendbirdInfo?.typingMembers || [], 2, 'typingMember')} is typing
            <DotLoading />
          </div>
        )}
        <MessageInput channel={channel} messageList={messageList} setMessageList={setMessageList} />
      </div>
    </div>
  );
}

export default ChatComponent;
