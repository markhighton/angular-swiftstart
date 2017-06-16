import { environment } from '../environments/environment';

export class AppSettings {

    public static get API_URL(): string {
        return environment.api_endpoint;
    }

    public static get ACCOUNT_URL(): string {
        return `${this.API_URL}account`;
    };

};
