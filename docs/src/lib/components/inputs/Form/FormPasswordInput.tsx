/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import Button from '../Button/Button';
import EyeDisableIcon from '../../icons/EyeDisableIcon';
import EyeIcon from '../../icons/EyeIcon';
import FormInputComponent, { type FormInputProps } from './FormInput';
import styles from './Form.module.scss';

const FormPasswordInput: React.FC<FormInputProps> = ({ ...props }) => {
    const [isVisible, setIsVisible] = useState(false);

    const inputType = isVisible ? 'text' : 'password';
    const buttonIcon = isVisible ? <EyeDisableIcon /> : <EyeIcon />;

    const toggleVisibility = (): void => {
        setIsVisible((current) => !current);
    };

    return (
        <FormInputComponent
            {...props}
            type={inputType}
            className={styles.inputPassword}
            rightElement={
                <Button colorMode="none" className={styles.passwordVisibilityToggle} onClick={toggleVisibility}>
                    {buttonIcon}
                </Button>
            }
        />
    );
};

export default FormPasswordInput;
