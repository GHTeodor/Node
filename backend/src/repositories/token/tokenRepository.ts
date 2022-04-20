import { EntityRepository, getManager } from 'typeorm';

import { IToken } from '../../entities/interfaces/IToken';
import { Token } from '../../entities/token';

@EntityRepository(Token)
class TokenRepository {
    public async createToken(token: any): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }
}

export default new TokenRepository();
