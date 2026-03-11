'use client';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group';
import { LegalPageFormValues } from '@/schemas/legal';

export function SectionList() {
    const { control } = useFormContext<LegalPageFormValues>();

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'sections',
    });

    return (
        <div className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Document Sections</h2>
                <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => append({ heading: '', content: '' })}
                >
                    <Plus className='mr-2 h-4 w-4' /> Add Section
                </Button>
            </div>

            {fields.length === 0 && (
                <div className='text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground'>
                    {`No sections added yet. Click "Add Section" to start.`}
                </div>
            )}

            <FieldGroup className='space-y-4'>
                {fields.map((field, index) => (
                    <Card
                        key={field.id}
                        className='border-l-4 border-l-blue-500 hover:shadow-md transition-shadow'
                    >
                        <CardContent className='p-6 flex gap-6'>
                            <div className='bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0'>
                                {index + 1}
                            </div>

                            <div className='flex-1 space-y-4'>
                                <Controller
                                    control={control}
                                    name={`sections.${index}.heading`}
                                    render={({
                                        field: inputField,
                                        fieldState,
                                    }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel className='sr-only'>
                                                Section {index + 1} Heading
                                            </FieldLabel>
                                            <Input
                                                {...inputField}
                                                placeholder='Section Heading (e.g., 1. Introduction)'
                                                className='font-medium'
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Section Content */}
                                <Controller
                                    control={control}
                                    name={`sections.${index}.content`}
                                    render={({
                                        field: inputField,
                                        fieldState,
                                    }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel className='sr-only'>
                                                Section {index + 1} Content
                                            </FieldLabel>
                                            <InputGroup>
                                                <InputGroupTextarea
                                                    {...inputField}
                                                    placeholder='Enter the policy details for this section...'
                                                    rows={4}
                                                    className='min-h-24 resize-none'
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                />
                                            </InputGroup>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    disabled={index === 0}
                                    onClick={() => move(index, index - 1)}
                                    title='Move Up'
                                >
                                    <ArrowUp className='h-4 w-4' />
                                </Button>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    disabled={index === fields.length - 1}
                                    onClick={() => move(index, index + 1)}
                                    title='Move Down'
                                >
                                    <ArrowDown className='h-4 w-4' />
                                </Button>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    className='text-destructive hover:bg-destructive/10'
                                    onClick={() => remove(index)}
                                    title='Delete Section'
                                >
                                    <Trash2 className='h-4 w-4' />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </FieldGroup>
        </div>
    );
}
