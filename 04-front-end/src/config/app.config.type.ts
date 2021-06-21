interface StyleConfiguration {
    colors: {
        backgroundColor: string;
        linkHover: string;
        link: string;
    };
    fonts: any;
}

interface ApiConfiguration {
    baseUrl: string;
}

interface AppConfiguration {
    styles: StyleConfiguration;
    api: ApiConfiguration;
}

export type { AppConfiguration, StyleConfiguration };
