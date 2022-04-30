import { DeleteResult } from 'typeorm';

import { IToken } from '../../entities/interfaces';
import { ITokenDataToSave } from '../../interfaces';

export interface ITokenRepository {
    createToken(token: ITokenDataToSave): Promise<IToken>;
    findTokenByUserId(userId: number): Promise<IToken | undefined>;
    deleteByParams(findObject: Partial<IToken>): Promise<DeleteResult>;
}
