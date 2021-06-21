import styled from 'styled-components';
import { appConfiguration } from '../../config/app.config';
import { StyleConfiguration } from '../../config/app.config.type';

interface NavLinkProps {
    readonly primary: boolean;
}

const styles: StyleConfiguration = appConfiguration.styles;

const NavLink = styled.span<NavLinkProps>`
    text-transform: uppercase;
    font-family: ${styles.fonts.montserrat};
    font-size: 14px;
    color: ${(props) =>
        props.primary ? styles.colors.linkHover : styles.colors.link};

    &:hover {
        cursor: pointer;
        color: ${styles.colors.linkHover};
    }
`;

const NavLinkContainer = styled.div`
    min-width: 245px;
    display: flex;
    justify-content: space-between;
    margin: 23px 0;
`;

export { NavLinkContainer, NavLink };
