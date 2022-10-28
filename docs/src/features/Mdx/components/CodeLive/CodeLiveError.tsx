import React, { useContext } from 'react';
import { LiveError, LiveContext } from 'react-live';
import { WarningIcon } from '@/lib/components';
import { EDITOR_LIVE_ERROR_STYLES } from '@/features/Mdx/constants';
import styles from '@/features/Mdx/styles/CodeLiveError.module.scss';

const CodeLiveError: React.FC = () => {
    const { error } = useContext(LiveContext);

    if (!error) return null;

    return (
        <div className={styles.error}>
            <WarningIcon />
            <div className={styles.message}>
                <LiveError style={EDITOR_LIVE_ERROR_STYLES} />
            </div>
        </div>
    );
};

export default CodeLiveError;
