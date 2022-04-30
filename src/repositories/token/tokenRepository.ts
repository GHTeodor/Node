import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';

import { IToken } from '../../entities/interfaces';
import { Token } from '../../entities';
import { ITokenRepository } from './ITokenRepository';
import { ITokenDataToSave } from '../../interfaces';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token: ITokenDataToSave): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public findByParams(filterObject: Partial<IToken>): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne(filterObject);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async deleteByParams(findObject: Partial<IToken>): Promise<DeleteResult> {
        return getManager().getRepository(Token).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
