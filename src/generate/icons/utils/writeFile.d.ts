import type { TemplateData } from '../templates';
export declare const writeFile: (target: string, data: string) => Promise<string>;
export declare const writeIconFile: (target: string, variant: TemplateData['type'], data: string) => Promise<string>;
export declare const writeIndexFile: (data: string) => Promise<string>;
