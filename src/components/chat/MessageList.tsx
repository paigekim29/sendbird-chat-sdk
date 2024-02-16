import dayjs from 'dayjs';
import Message from '@/components/chat/Message';
import { startOfDay } from '@/utils/convert-timestamp';

import { BaseMessage } from '@sendbird/chat/message';

interface MessageListProps {
  messageList: BaseMessage[];
}

function MessageList({ messageList }: MessageListProps) {
  const groupedMessages = messageList.reduce((acc, message) => {
    const messageDate = startOfDay(message.createdAt);

    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }
    acc[messageDate].push(message);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <div key={date} className="flex flex-col p-2">
          <h2 className="text-center font-medium mb-2">{dayjs(date).format('dddd, ll')}</h2>
          {messages.map((message) => (
            <Message message={message} key={message.messageId} />
          ))}
        </div>
      ))}
    </>
  );
}

export default MessageList;
