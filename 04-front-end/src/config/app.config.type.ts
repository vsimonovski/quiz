interface StyleConfiguration {
    colors: {
        backgroundColor: string;
        linkHover: string;
        link: string;
    };
    fonts: any;
}

interface BaseUrlConfiguration {
    baseUrl: string;
}

interface AppConfiguration {
    styles: StyleConfiguration;
    api: BaseUrlConfiguration;
    localhost: BaseUrlConfiguration;
}

export type { AppConfiguration, StyleConfiguration };
