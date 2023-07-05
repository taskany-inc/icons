import path from 'path';
import fs from 'fs';

import { iconsPackage } from './const';
import { componentData, createIndexFile, TemplateData } from './templates';
import { writeIconFile, writeIndexFile } from './utils/writeFile';
import { readIconDir } from './readDir';

const generateIcons = () => {
    return new Promise<void>((resolve, reject) => {
        fs.readdir(iconsPackage, async (error, paths) => {
            if (error) {
                reject(error);
            }

            try {
                const data = await Promise.all(
                    paths
                        .filter((p) => fs.lstatSync(path.resolve(iconsPackage, p)).isDirectory())
                        .map((p) => readIconDir(p)),
                );

                const preparedData = data.reduce((acc, value) => {
                    acc[value.type as TemplateData['type']] = value.list;

                    return acc;
                }, {} as Record<TemplateData['type'], ReturnType<typeof componentData>[]>);

                const createdFiles = await Promise.all(
                    preparedData.outline
                        .map(({ name, template }) => writeIconFile(name, 'outline', template))
                        .concat(preparedData.solid.map(({ name, template }) => writeIconFile(name, 'solid', template))),
                );

                await writeIndexFile(createIndexFile(createdFiles));

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });
};

generateIcons().catch((error: NodeJS.ErrnoException) => {
    // eslint-disable-next-line no-console
    console.error({
        code: error.errno ?? 1,
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
    });
    process.exit(error.errno ?? 1);
});
