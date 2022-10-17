/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import cx from 'clsx';
import { useController, useFormContext, Path } from 'react-hook-form';
import Label from '@/lib/components/inputs/Label/Label';
import styles from './Form.module.scss';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: Path<ObjectLiteral>;
    label?: string;
    validateOnChange?: boolean;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    formatValue?: (value: string) => string | number;
    formatErrorMessage?: (errorCode: string) => string | React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
    name,
    validateOnChange,
    label,
    leftElement,
    rightElement,
    className,
    ...props
}) => {
    const { control, clearErrors, setValue } = useFormContext();
    const {
        field: { onBlur, value = '', ref },
        fieldState: { error },
    } = useController({ name, control });

    const isInvalid = !!error;
    const errorMessage = isInvalid ? error?.message : '';
    const inputClassNames = cx(styles.input, className, {
        [styles.invalid]: isInvalid,
    });
    const additionalLeftClassNames = cx(styles.additionElement, styles.left);
    const additionalRightClassNames = cx(styles.additionElement, styles.right);

    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        const inputValue = e.currentTarget?.value ?? '';

        if (!validateOnChange && isInvalid) clearErrors(name);

        setValue(name, inputValue);
    };

    return (
        <div className={styles.formInput}>
            <Label htmlLabel>
                {!!label && <Label htmlLabel={false}>{label}</Label>}
                <span className={styles.inputWrapper}>
                    {!!leftElement && <span className={additionalLeftClassNames}>{leftElement}</span>}
                    <input
                        name={name}
                        id={name}
                        value={value}
                        onChange={handleChange}
                        onBlur={onBlur}
                        ref={ref}
                        className={inputClassNames}
                        {...props}
                    />
                    {!!rightElement && <span className={additionalRightClassNames}>{rightElement}</span>}
                </span>
            </Label>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        </div>
    );
};

export default FormInput;
