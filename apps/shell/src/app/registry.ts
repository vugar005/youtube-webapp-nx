import { loadRemoteModule } from '@angular-architects/module-federation';

export const registry: any = {
  watchApp: (): Promise<any> =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './web-components',
    }),
};