import fs from 'fs';
import path from 'path/posix';

import { targetPath } from '../const';
import type { TemplateData } from '../templates';

export const writeFile = (target: string, data: string) => {
    return new Promise<string>((resolve, reject) => {
        fs.writeFile(path.resolve(targetPath, target), data, { encoding: 'utf-8' }, (error) => {
            if (error) {
                reject(error);
            }

            resolve(target);
        });
    });
};

export const writeIconFile = (target: string, variant: TemplateData['type'], data: string) => {
    const fileName = `Icon${target}.${variant}.tsx`;
    return writeFile(fileName, data);
};

export const writeIndexFile = (data: string) => writeFile('index.ts', data);
