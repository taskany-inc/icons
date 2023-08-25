import { TemplateData } from './types';
import { iconNameConcatWithVariant, fileNameToCamelCase } from './utils';
import { now } from './const';

const tsTemplate = (values: TemplateData) => `/**
 * This file was generated automatically at ${now}
 * Don't edit this file
 */
import React, { forwardRef } from 'react';
import icon from 'teenyicons/${values.type}/${values.name}';
import { BaseIcon, BaseIconProps } from '../components/BaseIcon';

export const Icon${iconNameConcatWithVariant(
    fileNameToCamelCase(values.name),
    values.type,
)} = forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));
`;

export const componentData = (values: TemplateData) => {
    return {
        name: fileNameToCamelCase(values.name),
        template: tsTemplate(values),
    };
};
