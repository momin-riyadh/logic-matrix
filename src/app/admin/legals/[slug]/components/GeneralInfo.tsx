'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { LegalPageFormValues } from '@/schemas/legal';

export function GeneralInfo() {
    const { control } = useFormContext<LegalPageFormValues>();

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent>
                <FieldGroup>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='legal-title'>
                                        Page Title
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id='legal-title'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='e.g. Privacy Policy'
                                        autoComplete='off'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name='effectiveDate'
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Effective Date</FieldLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='outline'
                                                className={cn(
                                                    'w-full pl-3 text-left font-normal',
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                )}
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                {field.value ? (
                                                    format(
                                                        new Date(field.value),
                                                        'PPP',
                                                    )
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className='w-auto p-0'
                                            align='start'
                                        >
                                            <Calendar
                                                mode='single'
                                                selected={
                                                    field.value
                                                        ? new Date(field.value)
                                                        : undefined
                                                }
                                                onSelect={date =>
                                                    field.onChange(
                                                        date?.toISOString() ??
                                                            '',
                                                    )
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <Controller
                        name='introText'
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='legal-intro'>
                                    Introduction Text
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupTextarea
                                        {...field}
                                        id='legal-intro'
                                        placeholder='Brief intro about the policy...'
                                        rows={4}
                                        className='min-h-24 resize-none'
                                        aria-invalid={fieldState.invalid}
                                    />
                                </InputGroup>
                                <FieldDescription>
                                    This text appears at the top of the legal
                                    page.
                                </FieldDescription>
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
