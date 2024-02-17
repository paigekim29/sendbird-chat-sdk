import { useState } from 'react';
import { Button, Input, Toast } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';

import { GroupChannel } from '@sendbird/chat/groupChannel';
import { BaseMessage } from '@sendbird/chat/message';

interface MessageInputProps {
  channel?: GroupChannel;
  messageList: BaseMessage[];
  setMessageList: React.Dispatch<React.SetStateAction<BaseMessage[]>>;
}

function MessageInput({ channel, messageList, setMessageList }: MessageInputProps) {
  const [messageInput, setMessageInput] = useState('');

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

  const handleMessageInput = (val: string) => {
    if (!!val.length) {
      channel?.startTyping();
    } else {
      channel?.endTyping();
    }
    setMessageInput(val);
  };

  return (
    <form
      className="absolute bottom-0 w-full max-w-xl flex justify-between items-center gap-3 mb-3 pr-2"
      onSubmit={sendMessage}
    >
      <Input
        value={messageInput}
        maxLength={10000}
        onChange={handleMessageInput}
        className="border-2 border-solid border-gray-400 rounded p-2"
      />
      <Button color="primary" fill="solid" size="large" disabled={!messageInput.length} type="submit">
        <RightOutline />
      </Button>
    </form>
  );
}

export default MessageInput;
