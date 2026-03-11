'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group';
import { ContentBlockFormValues } from '@/schemas/content-block';

export function GeneralInfo() {
    const { control } = useFormContext<ContentBlockFormValues>();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent>
                <FieldGroup className='space-y-4'>
                    {/* Hero Title */}
                    <Controller
                        name='title'
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Hero Title</FieldLabel>
                                <Input
                                    {...field}
                                    placeholder='e.g. Our Approach'
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Hero Description */}
                    <Controller
                        name='heroDescription'
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Hero Description</FieldLabel>
                                <InputGroup>
                                    <InputGroupTextarea
                                        {...field}
                                        placeholder='Explain what this page is about...'
                                        rows={3}
                                        className='min-h-[100px] resize-none'
                                        aria-invalid={fieldState.invalid}
                                    />
                                </InputGroup>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </CardContent>
        </Card>
    );
}
