import React, { useState } from 'react';
import { Title, HomeContainer } from './Home.style';
import AuthLink from '../../components/AuthLink/AuthLink';
import LINK_NAMES from "../../components/AuthLink/AuthLink.constant";

const Home = () => {
    const [activeLink, setActiveLink] = useState(LINK_NAMES.PLAY);

    const handleActiveLinkChange = (e: string) => {
        setActiveLink(e);
    };

    return (
        <HomeContainer>
            <Title>Quiz</Title>
            <AuthLink
                activeLink={activeLink}
                onActiveLinkChange={handleActiveLinkChange}
            />
        </HomeContainer>
    );
};

export default Home;
