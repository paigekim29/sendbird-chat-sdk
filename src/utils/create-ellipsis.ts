import { Member } from '@sendbird/chat/groupChannel';

const createEllipsis = (userId: string, members: Member[], length: number, type?: string) => {
  const membersList = (members || [])
    .filter((members) => members.userId !== userId)
    .map((member) => member?.nickname || 'unknown')
    .join(', ');

  return (type === 'typingMember' ? members.length : membersList.length) > length
    ? `${membersList.slice(0, 20)}...`
    : membersList;
};

export default createEllipsis;
