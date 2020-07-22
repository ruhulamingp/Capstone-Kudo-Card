
import { Connection } from 'typeorm';
import { Posts } from '../Entity/post.entity';

export const postsProviders = [
  {
    provide: 'POSTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Posts),
    inject: ['DATABASE_CONNECTION'],
  },
];