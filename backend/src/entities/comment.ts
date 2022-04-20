import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { config } from '../configs/config';
import { IComment } from './interfaces/IComment';
import { Post } from './post';

@Entity('Comments', { database: config.MySQL_DB_NAME })
export class Comment extends CommonFields implements IComment {
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
        body: string;

    @Column({
        type: 'int',
    })
        postId: number;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: Post;
}
