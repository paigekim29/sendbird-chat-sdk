import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';

import { SENDBIRD_INFO } from '@/constants';

const Sendbird = async (id: string) => {
  const sendbirdChat = await SendbirdChat.init({
    appId: SENDBIRD_INFO.appId || '',
    localCacheEnabled: true,
    modules: [new GroupChannelModule()],
  });
  await sendbirdChat.connect(id);

  return sendbirdChat;
};

export default Sendbird;
