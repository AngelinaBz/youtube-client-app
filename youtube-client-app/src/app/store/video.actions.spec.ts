import { VideoItem } from '../youtube/models/video-item.model';
import * as actions from './actions';

describe('Video Actions', () => {
  describe('addCustomVideo', () => {
    it('should create an action to add a custom video', () => {
      const video: VideoItem = { id: '1', title: 'Title', description: 'Description' };
      const action = actions.addCustomVideo({ video });

      expect(action.type).toBe('[Video] Add Custom Video');
      expect(action.video).toEqual(video);
    });
  });

  describe('deleteCustomVideo', () => {
    it('should create an action to delete a custom video', () => {
      const videoId = '1';
      const action = actions.deleteCustomVideo({ videoId });

      expect(action.type).toBe('[Video] Delete Custom Video');
      expect(action.videoId).toBe(videoId);
    });
  });

  describe('loadYoutubeVideos', () => {
    it('should create an action to load YouTube videos', () => {
      const query = 'angular';
      const pageToken = 'CAUQAA';
      const action = actions.loadYoutubeVideos({ query, pageToken });

      expect(action.type).toBe('[Videos] Load Videos');
      expect(action.query).toBe(query);
      expect(action.pageToken).toBe(pageToken);
    });
  });

  describe('addToFavorites', () => {
    it('should create an action to add a video to favorites', () => {
      const videoId = '1';
      const action = actions.addToFavorites({ videoId });

      expect(action.type).toBe('[Video] Add Video To Favorites');
      expect(action.videoId).toBe(videoId);
    });
  });

  describe('deleteFromFavorites', () => {
    it('should create an action to delete a video from favorites', () => {
      const videoId = '1';
      const action = actions.deleteFromFavorites({ videoId });

      expect(action.type).toBe('[Video] Delete Video From Favorites');
      expect(action.videoId).toBe(videoId);
    });
  });

  describe('changePage', () => {
    it('should create an action to change the page', () => {
      const page = 2;
      const action = actions.changePage({ page });

      expect(action.type).toBe('[Video] Change Page');
      expect(action.page).toBe(page);
    });
  });
});
