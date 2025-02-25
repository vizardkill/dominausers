import { moduleFederationPlugin } from '@module-federation/sdk';

export const mfConfig: moduleFederationPlugin.ModuleFederationPluginOptions = {
  name: "dominausers",
  filename: "remoteEntry.js",
  exposes: {'./UserMicroFrontEnd': './src/app/core/users/index.tsx'},
  shared: [
    "react",
    "react-dom",
    "tailwindcss",
    "postcss-loader",
  ],
};
