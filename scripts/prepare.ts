import { execSync } from 'node:child_process';
import fs from 'fs-extra';
import chokidar from 'chokidar';
import { isDev, log, port, r } from './utils';

async function stubIndexHtml() {
    const views = ['options', 'devtools'];

    for (const view of views) {
        await fs.ensureDir(r(`extension/dist/${view}`));
        let data = await fs.readFile(r(`src/${view}/index.html`), 'utf-8');
        data = data
            .replace('"./main.ts"', `"http://localhost:${port}/${view}/main.ts"`)
            .replace(
                '<div id="app"></div>',
                '<div id="app">Vite server did not start</div>'
            );
        await fs.writeFile(r(`extension/dist/${view}/index.html`), data, 'utf-8');
        log('PRE', `stub ${view}`);
    }

    // Handling for panel.html
    const panelPath = r('src/devtools/panel.html');
    if (await fs.pathExists(panelPath)) {
        let panelData = await fs.readFile(panelPath, 'utf-8');
        panelData = panelData.replace(
            '"./main.ts"',
            `"http://localhost:${port}/devtools/main.ts"`
        );
        await fs.writeFile(
            r('extension/dist/devtools/panel.html'),
            panelData,
            'utf-8'
        );
        log('PRE', 'stub devtools/panel');
    }
}

function writeManifest() {
    execSync('npx esno ./scripts/manifest.ts', { stdio: 'inherit' });
}

writeManifest();

if (isDev) {
    stubIndexHtml();
    chokidar.watch(r('src/**/*.html')).on('change', stubIndexHtml);
    chokidar
        .watch([r('src/manifest.ts'), r('package.json')])
        .on('change', writeManifest);
}
