import { readdir, writeFile } from 'fs';
import { dirname, join as joinPath, relative } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const asyncReaddir = promisify(readdir);
const writeFileAsync = promisify(writeFile);

// Получаем правильный путь для __dirname в ES модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lokiDir = joinPath(__dirname, '..', '.loki');
const actualDir = joinPath(lokiDir, 'current');
const expectedDir = joinPath(lokiDir, 'reference');
const diffDir = joinPath(lokiDir, 'difference');

(async function main() {
    const diffs = await asyncReaddir(diffDir);

    await writeFileAsync(
        joinPath(lokiDir, 'report.json'),
        JSON.stringify({
            newItems: [],
            deletedItems: [],
            passedItems: [],
            failedItems: diffs,
            expectedItems: diffs,
            actualItems: diffs,
            diffItems: diffs,
            actualDir: relative(lokiDir, actualDir),
            expectedDir: relative(lokiDir, expectedDir),
            diffDir: relative(lokiDir, diffDir),
        }),
    );
})();
