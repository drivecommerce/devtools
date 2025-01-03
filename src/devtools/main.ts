import { createApp } from 'vue';
import App from './DevTools.vue';
import { setupApp } from '@/logic/common-setup';
import '../styles';

if (window?.chrome?.devtools?.panels) {
    window.chrome.devtools.panels.create(
        'Drive Inspect',
        null,
        'dist/devtools/index.html',
        null
    );
}

const app = createApp(App);

setupApp(app);

app.mount('#app');
