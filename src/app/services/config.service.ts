const env = import.meta.env;

export interface EnvConfigurationModel {
    userApiUrl?: string;
    userApiToken?: string;
    userApiRef?: string;
}

export const EnvConfiguration = (): EnvConfigurationModel => ({
    userApiUrl: env?.PUBLIC_USER_API_URL || "https://randomuser.me",
    userApiToken: env?.PUBLIC_USER_API_TOKEN || "BUC6-WP98-B4WF-5959",
    userApiRef: env?.PUBLIC_USER_API_REF || "byhlg4jl",
});

export class ConfigService {
    private static instance: ConfigService;
    private readonly environment: EnvConfigurationModel;

    private constructor() {
        this.environment = EnvConfiguration();
    }

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }

    get(env: keyof EnvConfigurationModel) {
        return this.environment[env];
    }

    getOrThrow(env: keyof EnvConfigurationModel) {
        const value = this.get(env);
        if (!value) {
            throw new Error(`Environment : ${env} not found or not loaded`);
        }
        return value;
    }
}
