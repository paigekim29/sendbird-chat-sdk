import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from 'antd-mobile';
import { useAtom } from 'jotai';
import { sendbirdInfoAtom } from '@/atom/store';

import {
  GroupChannel,
  MessageCollection,
  MessageCollectionEventHandler,
  MessageCollectionInitPolicy,
  MessageEventContext,
  MessageFilter,
} from '@sendbird/chat/groupChannel';
import { BaseMessage } from '@sendbird/chat/message';
import {FetchMoreInterface} from "@/components/chat/ChatComponent";

const useGetMessages = (
  channel: GroupChannel | undefined,
  setMessageList: React.Dispatch<React.SetStateAction<BaseMessage[]>>,
  fetchMore: FetchMoreInterface,
  setFetchMore: React.Dispatch<React.SetStateAction<FetchMoreInterface>>,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sendbirdInfo, setSendbirdInfo] = useAtom(sendbirdInfoAtom);

  const [collection, setCollection] = useState<MessageCollection | null>(null);
  const router = useRouter();

  const messageHandlers: MessageCollectionEventHandler = {
    onMessagesAdded: (context: MessageEventContext, channel: GroupChannel, messages: BaseMessage[]) => {
      setMessageList((prev) => {
        return [...prev, ...messages].filter(
          (message, index, self) => self.findIndex((m) => m.messageId === message.messageId) === index,
        );
      });
    },
  };

  const loadMessages = async (current: GroupChannel) => {
    try {
      if (!(current?.members || []).find((member) => member.userId === sendbirdInfo.userId)) {
        Toast.show({
          content: 'You are not authorized to view this channel.',
        });

        router.push('/channel');
        return;
      }

      const messageFilter = new MessageFilter();

      if (channel) {
        const messageCollection: MessageCollection = channel.createMessageCollection({
          filter: messageFilter,
          limit: 100,
          startingPoint: Number.MAX_SAFE_INTEGER,
        });

        messageCollection.setMessageCollectionHandler(messageHandlers);
        messageCollection
          .initialize(MessageCollectionInitPolicy.CACHE_AND_REPLACE_BY_API)
          .onCacheResult((err: Error | null, messages: BaseMessage[] | null) => {
            setSendbirdInfo({
              ...sendbirdInfo,
            });
            setMessageList((messages || []).reverse());
          })
          .onApiResult((err: Error | null, messages: BaseMessage[] | null) => {
            setSendbirdInfo({
              ...sendbirdInfo,
            });
            setMessageList((messages || []).reverse());
          });

        setCollection(messageCollection);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        content: 'An error occurred. Please refresh the page.',
      });
    }
  };

  const loadPrevious = async () => {
    try {
      if (collection?.hasPrevious) {
        collection.loadPrevious().then(function (messages) {
          const messageList = messages.reverse();
          setMessageList((prev) => [...messageList, ...prev]);
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        content: 'An error occurred. Please refresh the page.',
      });
    }finally {
      setFetchMore({previous: false, next: false});
    }
  }

  const loadNext = async () => {
    try {
      if (collection?.hasNext) {
        collection.loadNext().then(function (messages) {
          const messageList = messages.reverse();
          setMessageList((prev) => [...messageList, ...prev]);
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        content: 'An error occurred. Please refresh the page.',
      });
    } finally {
      setFetchMore({previous: false, next: false});
    }
  }

  useEffect(() => {
    if (!sendbirdInfo.userId || !channel) {
      return;
    } else {
      loadMessages(channel);
    }
  }, [sendbirdInfo.userId]);


  useEffect(() => {
    if(fetchMore.previous) {
      loadPrevious();
    }
    if(fetchMore.next) {
      loadNext();
    }
  }, [fetchMore]);

  return { isLoading };
};

export default useGetMessages;
