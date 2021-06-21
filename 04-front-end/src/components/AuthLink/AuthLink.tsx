import React from 'react';
import { NavLink, NavLinkContainer } from './AuthLink.style';
import LINK_NAMES from './AuthLink.constant';
import { AuthLinkProps } from './AuthLink.type';

const AuthLink = React.memo(
    ({ activeLink, onActiveLinkChange }: AuthLinkProps) => {
        return (
            <NavLinkContainer>
                <NavLink
                    onClick={() => onActiveLinkChange(LINK_NAMES.PLAY)}
                    primary={activeLink === LINK_NAMES.PLAY}
                >
                    Play
                </NavLink>
                <NavLink
                    onClick={() => onActiveLinkChange(LINK_NAMES.REGISTER)}
                    primary={activeLink === LINK_NAMES.REGISTER}
                >
                    Register
                </NavLink>
                <NavLink
                    onClick={() => onActiveLinkChange(LINK_NAMES.LOGIN)}
                    primary={activeLink === LINK_NAMES.LOGIN}
                >
                    Login
                </NavLink>
            </NavLinkContainer>
        );
    }
);

export default AuthLink;
