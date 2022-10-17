import React from 'react';
import cx from 'clsx';
import styles from './Form.module.scss';

interface FormRowProps {
    children: React.ReactNode;
    className?: string;
}

const FormRow: React.FC<FormRowProps> = ({ children, className }) => (
    <div className={cx(styles.formRow, className)}>{children}</div>
);

export default FormRow;
