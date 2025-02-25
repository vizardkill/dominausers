interface ImportMetaEnv {
    // import.meta.env.PUBLIC_FOO
    readonly PUBLIC_USER_API_URL: string;
    readonly PUBLIC_USER_API_TOKEN: string;
    readonly PUBLIC_USER_API_REF: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
