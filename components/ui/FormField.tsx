'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/utils/cn';

interface FormFieldProps {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'date' | 'datetime-local' | 'time';
    placeholder?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    inputClassName?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    min?: number | string;
    max?: number | string;
    step?: number | string;
}

export function FormField({
    name,
    label,
    type = 'text',
    placeholder,
    description,
    required = false,
    disabled = false,
    className,
    inputClassName,
    leftIcon,
    rightIcon,
    min,
    max,
    step,
}: FormFieldProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];
    const hasError = !!error;

    return (
        <div className={cn('space-y-2', className)}>
            <label
                htmlFor={name}
                className={cn(
                    'block text-sm font-medium text-gray-700 dark:text-gray-300',
                    required && "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
            >
                {label}
            </label>

            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className="text-gray-400 dark:text-gray-500">{leftIcon}</div>
                    </div>
                )}

                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            min={min}
                            max={max}
                            step={step}
                            className={cn(
                                'block w-full rounded-md border-gray-300 shadow-sm transition-colors duration-200',
                                'focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
                                'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed dark:disabled:bg-gray-800',
                                leftIcon && 'pl-10',
                                rightIcon && 'pr-10',
                                hasError && 'border-red-300 focus:border-red-500 focus:ring-red-500',
                                inputClassName
                            )}
                            value={field.value || ''}
                            onChange={(e) => {
                                const value = type === 'number' ? 
                                    (e.target.value === '' ? '' : Number(e.target.value)) : 
                                    e.target.value;
                                field.onChange(value);
                            }}
                        />
                    )}
                />

                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <div className="text-gray-400 dark:text-gray-500">{rightIcon}</div>
                    </div>
                )}
            </div>

            {description && !hasError && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}

            {hasError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {error?.message as string}
                </p>
            )}
        </div>
    );
}

interface FormTextareaProps {
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    className?: string;
    textareaClassName?: string;
}

export function FormTextarea({
    name,
    label,
    placeholder,
    description,
    required = false,
    disabled = false,
    rows = 4,
    className,
    textareaClassName,
}: FormTextareaProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];
    const hasError = !!error;

    return (
        <div className={cn('space-y-2', className)}>
            <label
                htmlFor={name}
                className={cn(
                    'block text-sm font-medium text-gray-700 dark:text-gray-300',
                    required && "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
            >
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <textarea
                        {...field}
                        id={name}
                        rows={rows}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={cn(
                            'block w-full rounded-md border-gray-300 shadow-sm transition-colors duration-200',
                            'focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
                            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed dark:disabled:bg-gray-800',
                            'resize-vertical',
                            hasError && 'border-red-300 focus:border-red-500 focus:ring-red-500',
                            textareaClassName
                        )}
                        value={field.value || ''}
                    />
                )}
            />

            {description && !hasError && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}

            {hasError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {error?.message as string}
                </p>
            )}
        </div>
    );
}

interface FormSelectProps {
    name: string;
    label: string;
    options: { value: string; label: string; disabled?: boolean }[];
    placeholder?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    selectClassName?: string;
}

export function FormSelect({
    name,
    label,
    options,
    placeholder = 'নির্বাচন করুন...',
    description,
    required = false,
    disabled = false,
    className,
    selectClassName,
}: FormSelectProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];
    const hasError = !!error;

    return (
        <div className={cn('space-y-2', className)}>
            <label
                htmlFor={name}
                className={cn(
                    'block text-sm font-medium text-gray-700 dark:text-gray-300',
                    required && "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
            >
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <select
                        {...field}
                        id={name}
                        disabled={disabled}
                        className={cn(
                            'block w-full rounded-md border-gray-300 shadow-sm transition-colors duration-200',
                            'focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
                            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed dark:disabled:bg-gray-800',
                            hasError && 'border-red-300 focus:border-red-500 focus:ring-red-500',
                            selectClassName
                        )}
                        value={field.value || ''}
                    >
                        <option value="">{placeholder}</option>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            />

            {description && !hasError && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}

            {hasError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {error?.message as string}
                </p>
            )}
        </div>
    );
}

interface FormCheckboxProps {
    name: string;
    label: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function FormCheckbox({
    name,
    label,
    description,
    required = false,
    disabled = false,
    className,
}: FormCheckboxProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];
    const hasError = !!error;

    return (
        <div className={cn('space-y-2', className)}>
            <div className="flex items-start">
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            id={name}
                            type="checkbox"
                            disabled={disabled}
                            className={cn(
                                'h-4 w-4 rounded border-gray-300 text-emerald-600 transition-colors duration-200',
                                'focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700',
                                'disabled:cursor-not-allowed disabled:opacity-50',
                                hasError && 'border-red-300 focus:ring-red-500'
                            )}
                            checked={field.value || false}
                            onChange={(e) => field.onChange(e.target.checked)}
                        />
                    )}
                />
                <div className="ml-3">
                    <label
                        htmlFor={name}
                        className={cn(
                            'text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer',
                            required && "after:content-['*'] after:ml-0.5 after:text-red-500",
                            disabled && 'cursor-not-allowed opacity-50'
                        )}
                    >
                        {label}
                    </label>
                    {description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                    )}
                </div>
            </div>

            {hasError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {error?.message as string}
                </p>
            )}
        </div>
    );
}

interface FormRadioGroupProps {
    name: string;
    label: string;
    options: { value: string; label: string; description?: string; disabled?: boolean }[];
    description?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
}

export function FormRadioGroup({
    name,
    label,
    options,
    description,
    required = false,
    disabled = false,
    className,
    orientation = 'vertical',
}: FormRadioGroupProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];
    const hasError = !!error;

    return (
        <div className={cn('space-y-2', className)}>
            <fieldset>
                <legend
                    className={cn(
                        'block text-sm font-medium text-gray-700 dark:text-gray-300',
                        required && "after:content-['*'] after:ml-0.5 after:text-red-500"
                    )}
                >
                    {label}
                </legend>

                {description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                )}

                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <div
                            className={cn(
                                'mt-2 space-y-2',
                                orientation === 'horizontal' && 'flex flex-wrap gap-4 space-y-0'
                            )}
                        >
                            {options.map((option) => (
                                <div key={option.value} className="flex items-start">
                                    <input
                                        id={`${name}-${option.value}`}
                                        type="radio"
                                        value={option.value}
                                        disabled={disabled || option.disabled}
                                        className={cn(
                                            'h-4 w-4 border-gray-300 text-emerald-600 transition-colors duration-200',
                                            'focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700',
                                            'disabled:cursor-not-allowed disabled:opacity-50',
                                            hasError && 'border-red-300 focus:ring-red-500'
                                        )}
                                        checked={field.value === option.value}
                                        onChange={() => field.onChange(option.value)}
                                    />
                                    <div className="ml-3">
                                        <label
                                            htmlFor={`${name}-${option.value}`}
                                            className={cn(
                                                'text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer',
                                                (disabled || option.disabled) && 'cursor-not-allowed opacity-50'
                                            )}
                                        >
                                            {option.label}
                                        </label>
                                        {option.description && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {option.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                />
            </fieldset>

            {hasError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {error?.message as string}
                </p>
            )}
        </div>
    );
}