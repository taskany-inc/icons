export const fileNameToCamelCase = (filename: string): string => {
    const [name] = filename.split('.');
    const parts = name.split('-');
    return parts
        .map((part) => {
            return `${part[0].toUpperCase()}${part.slice(1)}`;
        })
        .join('');
};

export const iconNameConcatWithVariant = (name: string, variant: string) => {
    return `${name}${fileNameToCamelCase(variant)}`;
};
