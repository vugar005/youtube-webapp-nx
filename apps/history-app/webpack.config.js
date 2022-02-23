const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('../../package.json').dependencies;

const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

/**
 * We use the NX_TSCONFIG_PATH environment variable when using the @nrwl/angular:webpack-browser
 * builder as it will generate a temporary tsconfig file which contains any required remappings of
 * shared libraries.
 * A remapping will occur when a library is buildable, as webpack needs to know the location of the
 * built files for the buildable library.
 * This NX_TSCONFIG_PATH environment variable is set by the @nrwl/angular:webpack-browser and it contains
 * the location of the generated temporary tsconfig file.
 */
const tsConfigPath = process.env.NX_TSCONFIG_PATH ?? path.join(__dirname, '../../tsconfig.base.json');

const workspaceRootPath = path.join(__dirname, '../../');
const sharedMappings = new mf.SharedMappings();

sharedMappings.register(tsConfigPath, ['@youtube/common-ui'], workspaceRootPath);

module.exports = {
  output: {
    uniqueName: 'history-app',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: 'module' },
      name: 'history-app',
      filename: 'remoteEntry.js',
      exposes: {
        './web-components': 'apps/history-app/src/bootstrap.ts', // bootstrap --> main --> AppModule --> WebComp
      },
      shared: share({
        // Angular
        '@angular/core': { requiredVersion: deps['@angular/core'] },
        '@angular/common': { requiredVersion: deps['@angular/common'] },
        '@angular/common/http': { requiredVersion: deps['@angular/common'] },
        '@angular/router': { requiredVersion: deps['@angular/router'] },
        '@angular/forms': { requiredVersion: deps['@angular/forms'] },
        '@angular/platform-browser': { requiredVersion: deps['@angular/platform-browser'] },
        '@angular/platform-browser/animations': { requiredVersion: deps['@angular/platform-browser'] },
        '@angular/animations': { requiredVersion: deps['@angular/animations'] },

        // RxJs
        rxjs: { requiredVersion: deps['rxjs'] },
        'rxjs/operators': { requiredVersion: deps['rxjs'] },
        // Material
        '@angular/cdk': { requiredVersion: deps['@angular/cdk'] },
        '@angular/material/core': { requiredVersion: deps['@angular/material'] },
        '@angular/material/sidenav': { requiredVersion: deps['@angular/material'] },
        '@angular/material/icon': { requiredVersion: deps['@angular/material'] },
        '@angular/material/button': { requiredVersion: deps['@angular/material'] },
        '@angular/material/divider': { requiredVersion: deps['@angular/material'] },
        '@angular/material/input': { requiredVersion: deps['@angular/material'] },
        '@angular/material/form-field': { requiredVersion: deps['@angular/material'] },
        '@angular/material/autocomplete': { requiredVersion: deps['@angular/material'] },
        '@angular/material/menu': { requiredVersion: deps['@angular/material'] },
        '@angular/material/snack-bar': { requiredVersion: deps['@angular/material'] },
        // Ngrx
        '@ngrx/store': { requiredVersion: deps['@ngrx/store'] },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
