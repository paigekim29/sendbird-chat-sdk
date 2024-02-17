import { atomWithReset } from 'jotai/utils';
import { User } from '@sendbird/chat';
import { GroupChannel, Member } from '@sendbird/chat/groupChannel';

export interface SendbirdInfo {
  applicationUsers?: User[];
  channels?: GroupChannel[];
  nickname?: string;
  userId?: string;
  isNewChannelCreated?: boolean;
  currentChannel?: GroupChannel | null;
  typingMembers?: Member[];
}

export const sendbirdInfoAtom = atomWithReset<SendbirdInfo>({
  applicationUsers: [],
  channels: [],
  nickname: '',
  userId: '',
  isNewChannelCreated: false,
  currentChannel: null,
  typingMembers: [],
});
