import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
// Vuetify theme configuration
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                dark: true,
                colors: {
                    primary: '#667eea',
                    secondary: '#764ba2',
                    accent: '#00d4ff',
                    error: '#ff5722',
                    warning: '#ff9800',
                    info: '#2196f3',
                    success: '#4caf50',
                    background: '#0f0f23',
                    surface: '#1a1a2e',
                    'on-background': '#ffffff',
                    'on-surface': '#ffffff',
                    'on-primary': '#ffffff',
                    'on-secondary': '#ffffff',
                    'grey-darken-4': '#212121',
                    'grey-darken-3': '#424242',
                    'grey-darken-2': '#616161',
                    'grey-darken-1': '#757575',
                    'grey': '#9e9e9e',
                    'grey-lighten-1': '#bdbdbd',
                    'grey-lighten-2': '#e0e0e0',
                    'grey-lighten-3': '#f5f5f5',
                    'grey-lighten-4': '#fafafa',
                    'grey-lighten-5': '#ffffff'
                }
            },
            light: {
                dark: false,
                colors: {
                    primary: '#667eea',
                    secondary: '#764ba2',
                    accent: '#00d4ff',
                    error: '#ff5722',
                    warning: '#ff9800',
                    info: '#2196f3',
                    success: '#4caf50',
                    background: '#fafafa',
                    surface: '#ffffff',
                    'on-background': '#000000',
                    'on-surface': '#000000',
                    'on-primary': '#ffffff',
                    'on-secondary': '#ffffff'
                }
            }
        }
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    },
    defaults: {
        VBtn: {
            style: 'text-transform: none; letter-spacing: normal;',
            rounded: 'lg'
        },
        VCard: {
            elevation: 8,
            rounded: 'lg'
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VChip: {
            rounded: 'lg'
        },
        VAvatar: {
            size: 40
        }
    },
    display: {
        mobileBreakpoint: 'sm',
        thresholds: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    }
});
const app = createApp(App);
app.use(vuetify);
app.mount('#app');
