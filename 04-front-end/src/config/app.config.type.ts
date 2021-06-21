interface StyleConfiguration {
    colors: {
        backgroundColor: string;
        linkHover: string;
        link: string;
    };
    fonts: any;
}

interface AppConfiguration {
    styles: StyleConfiguration;
}

export type { AppConfiguration, StyleConfiguration };
