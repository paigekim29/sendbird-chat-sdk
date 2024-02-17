import {useEffect, useState} from 'react';
import {Toast} from 'antd-mobile';
import {useAtom} from 'jotai';
import Sendbird from '@/utils/sendbird';
import {sendbirdInfoAtom} from '@/atom/store';

import {
	GroupChannel,
	GroupChannelCollection,
	GroupChannelCollectionEventHandler,
	GroupChannelEventContext,
	GroupChannelFilter,
	GroupChannelListOrder
} from '@sendbird/chat/groupChannel';

const useGetInvitedChannels = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [sendbirdInfo, setSendbirdInfo] = useAtom(sendbirdInfoAtom);

	const channelHandlers: GroupChannelCollectionEventHandler = {
		// @ts-ignore
		onChannelsAdded: (context: GroupChannelEventContext, channels: GroupChannel[]) => {
			const updatedChannels = [...channels, ...sendbirdInfo.channels];
			setSendbirdInfo({...sendbirdInfo, channels: updatedChannels, isNewChannelCreated: true});
		},
	};

	const loadChannels = async (id: string) => {
		try {
			const sendbirdChat = await Sendbird(id);
			const groupCollection: GroupChannelCollection = sendbirdChat.groupChannel.createGroupChannelCollection({
				filter: new GroupChannelFilter({
					includeEmpty: true,
				}),
				order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
			});

			groupCollection.setGroupChannelCollectionHandler(channelHandlers);

			const channels = await groupCollection.loadMore();

			setSendbirdInfo({
				...sendbirdInfo,
				channels,
				isNewChannelCreated: false,
			});
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			Toast.show({
				content: 'An error occurred. Please refresh the page.',
			});
		}
	};

	useEffect(() => {
		if (!sendbirdInfo.userId) {
			return;
		}
		loadChannels(sendbirdInfo.userId);
	}, [sendbirdInfo.userId, sendbirdInfo.isNewChannelCreated]);

	return {isLoading};
};

export default useGetInvitedChannels;
