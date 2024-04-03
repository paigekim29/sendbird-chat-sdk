import { atomWithReset } from 'jotai/utils';
import { GroupChannel, Member } from '@sendbird/chat/groupChannel';

export interface SendbirdInfo {
  channels?: GroupChannel[];
  nickname?: string;
  userId?: string;
  isNewChannelCreated?: boolean;
  currentChannel?: GroupChannel | null;
  typingMembers?: Member[];
}

export const sendbirdInfoAtom = atomWithReset<SendbirdInfo>({
  channels: [],
  nickname: '',
  userId: '',
  isNewChannelCreated: false,
  currentChannel: null,
  typingMembers: [],
});
