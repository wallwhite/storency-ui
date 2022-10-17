import React from 'react';
import config from '@/configs/site-config.json';
import { Heading, Text, Button, Container, GithubIcon, ArrowRightLineIcon } from '@/lib/components';
import { ROUTE_PATHS } from '@/lib/constants';
import styles from '@/features/Home/styles/Hero.module.scss';

const Hero: React.FC = () => (
    <div className={styles.hero}>
        <Container className={styles.container}>
            <Heading className={styles.title}>{config.seo.title}</Heading>
            <Text size="l" className={styles.subtitle}>
                {config.seo.description}
            </Text>
            <div className={styles.buttons}>
                <Button type="link" size="l" to={ROUTE_PATHS.gettingStarted}>
                    Get Started
                    <ArrowRightLineIcon />
                </Button>
                <Button size="l" type="link" target="_blank" colorMode="line" to={config.repo.url}>
                    <GithubIcon />
                    GitHub
                </Button>
            </div>
        </Container>
    </div>
);

export default Hero;
