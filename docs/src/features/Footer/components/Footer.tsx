import React from 'react';
import { Container } from '@/lib/components';
import FooterSocial from '@/features/Footer/components/FooterSocial';
import siteConfig from '@/configs/site-config.json';
import styles from '@/features/Footer/styles/Footer.module.scss';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear().toString();

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footerContent}>
                    <div className={styles.copyright}>{siteConfig.copyright.replace('{{date}}', currentYear)}</div>
                    <div className={styles.social}>
                        <FooterSocial />
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
