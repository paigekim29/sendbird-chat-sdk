import { User } from '@sendbird/chat';

const createChannelName = (members: User[]) => {
  const membersList = members.map((member) => member?.nickname || 'unknown').join(', ');

  return membersList.length > 20 ? `${membersList.slice(0, 20)}...` : membersList;
};

export default createChannelName;
