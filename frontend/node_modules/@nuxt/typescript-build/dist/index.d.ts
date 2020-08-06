import { Module } from '@nuxt/types';
import { Options as TsLoaderOptions } from 'ts-loader';
import { Options as TsCheckerOptions } from 'fork-ts-checker-webpack-plugin';
declare module '@nuxt/types' {
    interface Configuration {
        typescript?: Options;
    }
}
export interface Options {
    ignoreNotFoundWarnings?: boolean;
    loaders?: {
        ts?: Partial<TsLoaderOptions>;
        tsx?: Partial<TsLoaderOptions>;
    };
    typeCheck?: Partial<TsCheckerOptions> | boolean;
}
declare const tsModule: Module<Options>;
export default tsModule;
