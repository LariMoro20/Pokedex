/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file

import { configure } from "quasar/wrappers";

export default configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: true,

    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: ["axios"],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file#css
    css: ["app.sass"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'mdi-v5',
      "roboto-font",
      "material-icons",
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file#build
    build: {
      vueRouterMode: "history",

      // eslint configuration
      eslint: {
        warnings: true,
        errors: true,
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file#devserver
    devServer: {
      server: {
        type: "http",
      },
      port: 8080,
      open: true,
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file#framework
    framework: {
      config: {},
      plugins: ['Notify', 'Loading', 'Dialog'],
    },

    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
      prodPort: 3000,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      middlewares: [
        ctx.prod ? "compression" : "",
        "render",
      ],
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: "GenerateSW",
      manifest: {
        name: `Pokedex`,
        short_name: `Pokedex`,
        description: `Pokedex`,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#C10015',
        theme_color: '#b71c1c',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {},

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager",
      packager: {},
      builder: {
        appId: "pokedex",
      },
    },
  };
});
