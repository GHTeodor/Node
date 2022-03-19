import { IToken } from '../../entity';
import { ITokenDataToSave } from '../../interfaces';

export interface ITokenRepository {
    createToken(token: ITokenDataToSave): Promise<IToken>;
    findTokenByUserId(userId: number): Promise<IToken | undefined>;
}
