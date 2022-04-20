import {
    Column, Entity, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { IPost } from './interfaces/IPost';
import { User } from './user';
import { Comment } from './comment';
import { config } from '../configs/config';

@Entity('Posts', { database: config.MySQL_DB_NAME })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments: Comment[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: User;
}
