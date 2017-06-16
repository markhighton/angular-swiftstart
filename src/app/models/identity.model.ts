import { TokenModel } from './token.model';

export class IdentityModel {
    constructor(public Success: boolean,
                public Messages: string[],
                public Token: TokenModel) {
    }
}
