import { useAtomValue } from 'jotai';
import { formatTimestamp } from '@/utils/convert-timestamp';
import { sendbirdInfoAtom } from '@/atom/store';

function Message({ message }: any) {
  const sendbirdInfo = useAtomValue(sendbirdInfoAtom);

  const isSender = message.sender?.userId === sendbirdInfo?.userId;

  return (
    <div className={`flex items-center ${isSender ? 'self-end' : 'self-start'}`}>
      <span className={`text-xs mr-2 ${!isSender ? 'hidden' : ''}`}>{formatTimestamp(message.createdAt)}</span>
      <div
        key={message.messageId}
        className={`border-2 border-solid ${isSender ? 'border-violet-600' : 'border-gray-300'} rounded-xl px-2 mb-2`}
      >
        {message.message}
      </div>
      <span className={`text-xs ml-2 ${isSender ? 'hidden' : ''}`}>{formatTimestamp(message.createdAt)}</span>
    </div>
  );
}

export default Message;
