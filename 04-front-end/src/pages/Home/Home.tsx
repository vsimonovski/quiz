import React, { useState } from 'react';
import { Title, HomeContainer } from './Home.style';
import AuthLink from '../../components/AuthLink/AuthLink';
import { LinkName } from '../../components/AuthLink/AuthLink.type';
import Auth from '../../components/Auth/Auth';

const Home = () => {
    const [activeLink, setActiveLink]: [number, (activeLink: number) => void] =
        useState(LinkName.PLAY);

    const handleActiveLinkChange = (activeLink: number) => {
        setActiveLink(activeLink);
    };

    return (
        <HomeContainer>
            <Title>Quiz</Title>
            <AuthLink
                activeLink={activeLink}
                onActiveLinkChange={handleActiveLinkChange}
            />
            <Auth activeLink={activeLink} />
        </HomeContainer>
    );
};

export default Home;
