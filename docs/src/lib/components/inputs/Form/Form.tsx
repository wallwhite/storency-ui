import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

type FormValidateMode = 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';

interface FormProps {
    children: React.ReactNode;
    validationSchema?: AnyObjectSchema;
    initialValues?: ObjectLiteral;
    validateMode?: FormValidateMode;
    className?: string;
    reValidateMode?: Exclude<FormValidateMode, 'onTouched' | 'all'>;

    onSubmit?: (values: ObjectLiteral) => void;
}
const Form: React.FC<FormProps> = ({
    onSubmit = (): void => {},
    validationSchema,
    validateMode = 'onChange',
    reValidateMode = 'onChange',
    initialValues,
    children,
    className,
}) => {
    const form = useForm({
        mode: validateMode,
        reValidateMode,
        defaultValues: initialValues,
        ...(validationSchema ? { resolver: yupResolver(validationSchema) } : {}),
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
                {children}
            </form>
        </FormProvider>
    );
};

export default Form;
