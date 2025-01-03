import fs from 'fs-extra';

import type { Manifest } from 'webextension-polyfill';
import type PkgType from '../package.json';

import {
    isDev, port, r,
} from '../scripts/utils';

export async function getManifest() {
    const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType;

    const manifest: Manifest.WebExtensionManifest = {
        manifest_version: 3,

        name: pkg.displayName || pkg.name,
        version: pkg.version,
        description: pkg.description,

        action: {
            default_icon: './assets/icon-512.png',
        },

        options_ui: {
            page: './dist/options/index.html',
            open_in_tab: true,
        },

        background: null,

        icons: {
            16: './assets/drive-favicon.png',
            48: './assets/drive-favicon.png',
            128: './assets/drive-favicon.png',
        },

        permissions: [
        ],

        host_permissions: [
            'https://*.drivecommerce.com/*',
            'https://*.drrv.co/*'
        ],

        devtools_page: './dist/devtools/index.html',

        content_scripts: [
        ],

        web_accessible_resources: [
        ],

        content_security_policy: {
            extension_pages: isDev
                // this is required on dev for Vite script to load
                ? `script-src \'self\' http://localhost:${port}; object-src \'self\'`
                : 'script-src \'self\'; object-src \'self\'',
        },
    };

    // FIXME: not work in MV3
    // eslint-disable-next-line no-constant-condition
    if (isDev && false) {
        // for content script, as browsers will cache them for each reload,
        // we use a background script to always inject the latest version
        // see src/background/contentScriptHMR.ts
        delete manifest.content_scripts
        manifest.permissions?.push('webNavigation')
    }

    return manifest;
}
