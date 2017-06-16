import { UserModel } from './user.model';

export class TokenModel {
    constructor(
        public access_token: string,
        public expires_in: number,
        public expires_at: string,
        public user: UserModel) {
    }
}
