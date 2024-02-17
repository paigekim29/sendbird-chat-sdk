import { Member } from '@sendbird/chat/groupChannel';

const createTitle = (members: Member[], userId: string) => {
  switch (members?.length) {
    case 0:
      return 'Chat';
    case 1:
      return members?.[0]?.nickname || 'Chat';
    case 2:
      return members.find((member) => member.userId !== userId)?.nickname || 'Chat';
    default:
      return `Group ${members.length}`;
  }
};

export default createTitle;
