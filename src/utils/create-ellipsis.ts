import { User } from '@sendbird/chat';
import { Member } from '@sendbird/chat/groupChannel';

const createEllipsis = (members: (User | Member)[], length: number) => {
  const membersList = (members || []).map((member) => member?.nickname || 'unknown').join(', ');

  return membersList.length > length ? `${membersList.slice(0, 20)}...` : membersList;
};

export default createEllipsis;
