import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();
      expect(result).toEqual(posts);
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2 });
      expect(result).toEqual(posts.slice(1, 3));
    });

    it('should return empty array when skip exceeds posts count', () => {
      const result = postsService.findMany({ skip: 10 });
      expect(result).toEqual([]);
    });

    it('should return all posts when limit exceeds posts count', () => {
      const result = postsService.findMany({ limit: 10 });
      expect(result).toEqual(posts);
    });

    it('should return limited posts when limit is provided', () => {
      const result = postsService.findMany({ limit: 2 });
      expect(result).toEqual(posts.slice(0, 2));
    });
  });
});