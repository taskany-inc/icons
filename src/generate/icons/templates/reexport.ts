import { iconNameConcatWithVariant } from './utils';

export const createIndexFile = (values: string[]) => {
    const data = values
        .map((name) => {
            const [iconName, variant] = name.split('.');
            return `export { ${iconNameConcatWithVariant(iconName, variant)} } from './${iconName}.${variant}';`;
        })
        .concat('')
        .join('\n');

    return data;
};
