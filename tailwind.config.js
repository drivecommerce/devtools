/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.html',
        './src/**/*.{js,ts,vue}',
        'node_modules/preline/dist/*.js',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                gray: {
                    800: '#2a2f3a',
                },
                green: {
                    500: '#00a854',
                },
            },
        },
    },
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
        require('@tailwindcss/forms'),
        // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
        require('preline/plugin'),
    ],
};
