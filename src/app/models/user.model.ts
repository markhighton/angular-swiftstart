export class UserModel {

    public password: string;
    public rememberMe: boolean;

    constructor(public email: string) {
    }
}
