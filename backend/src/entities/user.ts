import { Column, Entity, OneToMany } from 'typeorm';

import { CommonFields } from './commonFields';
import { IUser } from './interfaces/IUser';
import { Post } from './post';
import { config } from '../configs/config';

@Entity('Users', { database: config.MySQL_DB_NAME })
export class User extends CommonFields implements IUser {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'int',
    })
        age?: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        password: string;

    @OneToMany(() => Post, (post) => post.user)
        posts: Post[];
}
