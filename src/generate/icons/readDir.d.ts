import { componentData } from './templates';
type ReadIconsDirResult<T extends string> = {
    list: ReturnType<typeof componentData>[];
    type: T;
};
interface ReadIconsDir {
    (dirPath: string): Promise<ReadIconsDirResult<typeof dirPath>>;
}
export declare const readIconDir: ReadIconsDir;
export {};
