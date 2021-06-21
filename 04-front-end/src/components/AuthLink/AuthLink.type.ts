interface AuthLinkProps {
    activeLink: number;
    onActiveLinkChange: (activeLink: number) => void;
}

export enum LinkName {
    PLAY = 0,
    LOGIN,
    REGISTER,
}

export type { AuthLinkProps };
