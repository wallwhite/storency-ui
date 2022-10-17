import React from 'react';
import { Link } from '@/lib/components';
import { FOOTER_SOCIAL_ICONS_CONFIG } from '@/features/Footer/constants';
import siteConfig from '@/configs/site-config.json';
import styles from '@/features/Footer/styles/FooterSocial.module.scss';

const FooterSocial: React.FC = () => {
    const configuredSocialLinks = Object.entries(siteConfig.social)
        .map(([socialKey, socialLink]) => {
            const icon = FOOTER_SOCIAL_ICONS_CONFIG?.[socialKey as keyof typeof FOOTER_SOCIAL_ICONS_CONFIG];

            if (!icon || !socialLink) return null;

            return (
                <li key={socialKey} className={styles.listItem}>
                    <Link to={socialLink} target="_blank">
                        {icon}
                    </Link>
                </li>
            );
        })
        .filter(Boolean);

    return <ul className={styles.list}>{configuredSocialLinks}</ul>;
};

export default FooterSocial;
