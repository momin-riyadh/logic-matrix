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
import { ContentBlockFormValues } from '@/schemas/content-block';

export function BlockList() {
    const { control } = useFormContext<ContentBlockFormValues>();
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'blocks',
    });

    return (
        <div className='space-y-4'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>
                    Content Blocks
                </h2>
                <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() =>
                        append({
                            title: '',
                            description: '',
                            alignment: 'auto',
                        })
                    }
                >
                    <Plus className='mr-2 h-4 w-4' /> Add Block
                </Button>
            </div>

            <FieldGroup className='space-y-6'>
                {fields.map((item, index) => (
                    <Card
                        key={item.id}
                        className='border-l-4 border-l-blue-500 hover:shadow-md transition-shadow'
                    >
                        <CardContent className='p-6 flex gap-6'>
                            <div className='bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0'>
                                {index + 1}
                            </div>

                            <div className='flex-1 space-y-4'>
                                <Controller
                                    name={`blocks.${index}.title`}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>
                                                Block Heading
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                placeholder='Heading...'
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
                                    name={`blocks.${index}.description`}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>Description</FieldLabel>
                                            <InputGroup>
                                                <InputGroupTextarea
                                                    {...field}
                                                    rows={4}
                                                    placeholder='Description...'
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

                            <div className='flex flex-col gap-2'>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    disabled={index === 0}
                                    onClick={() => move(index, index - 1)}
                                >
                                    <ArrowUp className='h-4 w-4' />
                                </Button>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    disabled={index === fields.length - 1}
                                    onClick={() => move(index, index + 1)}
                                >
                                    <ArrowDown className='h-4 w-4' />
                                </Button>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    className='text-destructive'
                                    onClick={() => remove(index)}
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
