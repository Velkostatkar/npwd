import { atom, useSetRecoilState, selector, useRecoilValue, useRecoilState } from 'recoil';
import { FormattedTweet, Profile, TwitterEvents } from '@typings/twitter';
import { fetchNui } from '../../../utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';

export const twitterState = {
  profile: atom({
    key: 'profile',
    default: selector<Profile>({
      key: 'defaultProfileValue',
      get: async () => {
        try {
          const resp = await fetchNui<ServerPromiseResp<Profile>>(
            TwitterEvents.GET_OR_CREATE_PROFILE,
          );
          return resp.data;
        } catch (e) {
          return null;
        }
      },
    }),
  }),
  defaultProfileNames: atom({
    key: 'defaultProfileNames',
    default: null,
  }),
  tweets: atom<FormattedTweet[]>({
    key: 'tweets',
    default: [],
  }),
  filteredTweets: atom({
    key: 'filteredTweets',
    default: [],
  }),
  showCreateTweetModal: atom({
    key: 'showCreateTweetModal',
    default: false,
  }),
  modalMessage: atom({
    key: 'modalMessage',
    default: '',
  }),
  unreadTweetsCount: atom({
    key: 'unreadTweetsCount',
    default: 0,
  }),
  tweetPageId: atom({
    key: 'tweetPageId',
    default: 0,
  }),
};

export const useTweetsState = () => useRecoilState(twitterState.tweets);
export const useTweetsValue = () => useRecoilValue(twitterState.tweets);
export const useSetTweets = () => useSetRecoilState(twitterState.tweets);

export const useTwitterProfile = () => useRecoilState(twitterState.profile);
export const useTwitterProfileValue = () => useRecoilValue(twitterState.profile);
export const useSetTwitterProfile = () => useSetRecoilState(twitterState.profile);

export const useFilteredTweets = () => useRecoilState(twitterState.filteredTweets);
export const useSetFilteredTweets = () => useSetRecoilState(twitterState.filteredTweets);
