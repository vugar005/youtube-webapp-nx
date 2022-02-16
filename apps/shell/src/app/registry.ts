import { loadRemoteModule } from '@angular-architects/module-federation';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const registry: any = {
  watchApp: (): Promise<any> =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './web-components',
    }),
  likesApp: (): Promise<any> =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './web-components',
    }),
};
