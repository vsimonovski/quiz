import React from 'react';
import { NavLink, NavLinkContainer } from './AuthLink.style';
import { AuthLinkProps, LinkName } from './AuthLink.type';

const AuthLink = React.memo(
    ({ activeLink, onActiveLinkChange }: AuthLinkProps) => {
        return (
            <NavLinkContainer>
                <NavLink
                    onClick={() => onActiveLinkChange(LinkName.PLAY)}
                    primary={activeLink === LinkName.PLAY}
                >
                    Play
                </NavLink>
                <NavLink
                    onClick={() => onActiveLinkChange(LinkName.REGISTER)}
                    primary={activeLink === LinkName.REGISTER}
                >
                    Register
                </NavLink>
                <NavLink
                    onClick={() => onActiveLinkChange(LinkName.LOGIN)}
                    primary={activeLink === LinkName.LOGIN}
                >
                    Login
                </NavLink>
            </NavLinkContainer>
        );
    }
);

export default AuthLink;
