import { ConfigService } from "../../../services/config.service";
import { HttpService } from "../../../services/http.service";
import { UserAPIResponse } from "../domain/models/getUser.api.response";

export class UsersRepository {
    private httpService: HttpService;
    private configService: ConfigService;
    private cache: { data: UserAPIResponse | null, expiry: number };

    constructor() {
        this.configService = ConfigService.getInstance();
        this.httpService = new HttpService({
            baseURL: this.configService.getOrThrow("userApiUrl"),
        });
        this.cache = { data: null, expiry: 0 };
    }

    async getUsers() {
        const now = Date.now();
        if (this.cache.data && this.cache.expiry > now) {
            return this.cache.data;
        }

        const response = await this.httpService.get<UserAPIResponse>(`/api`, {
            params: {
                results: 1000
            }
        });

        this.cache.data = response;
        this.cache.expiry = now + 60 * 1000; // Cache expires in 1 minute

        return response;
    }
}