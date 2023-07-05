import fs from 'fs';
import path from 'path/posix';

import { iconsPackage } from './const';
import { componentData, TemplateData } from './templates';

type ReadIconsDirResult<T extends string> = { list: ReturnType<typeof componentData>[]; type: T };

interface ReadIconsDir {
    (dirPath: string): Promise<ReadIconsDirResult<typeof dirPath>>;
}

export const readIconDir: ReadIconsDir = (dirPath) => {
    return new Promise<ReadIconsDirResult<typeof dirPath>>((resolve, reject) => {
        fs.readdir(path.resolve(iconsPackage, dirPath), (error, files) => {
            if (error) {
                reject(error);
            }

            const dataObjectArray: ReadIconsDirResult<typeof dirPath> = {
                list: [],
                type: dirPath,
            };

            for (const file of files) {
                const data = componentData({
                    name: file,
                    type: dirPath as TemplateData['type'],
                });

                dataObjectArray.list.push(data);
            }

            resolve(dataObjectArray);
        });
    });
};
