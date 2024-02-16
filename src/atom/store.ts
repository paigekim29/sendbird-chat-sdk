import { atomWithStorage } from 'jotai/utils';
import { User } from '@sendbird/chat';
import { GroupChannel } from '@sendbird/chat/groupChannel';

export interface SendbirdInfo {
  applicationUsers: User[];
  channels: GroupChannel[];
  nickname: string;
  userId: string;
}

export const sendbirdInfoAtom = atomWithStorage<SendbirdInfo>('sendbirdInfo', {
  applicationUsers: [],
  channels: [],
  nickname: '',
  userId: '',
});
