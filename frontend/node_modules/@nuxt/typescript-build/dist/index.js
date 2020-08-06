import path from 'path';
import consola from 'consola';
const defaults = {
    ignoreNotFoundWarnings: false,
    typeCheck: true
};
const tsModule = function (moduleOptions) {
    // Combine options
    const options = Object.assign(defaults, this.options.typescript, moduleOptions);
    // Change color of CLI banner
    this.options.cli.bannerColor = 'blue';
    if (!this.options.extensions.includes('ts')) {
        this.options.extensions.push('ts');
    }
    // Extend Builder to handle .ts/.tsx files as routes and watch them
    this.options.build.additionalExtensions = ['ts', 'tsx'];
    if (options.ignoreNotFoundWarnings) {
        this.options.build.warningIgnoreFilters.push(warn => warn.name === 'ModuleDependencyWarning' && /export .* was not found in /.test(warn.message));
    }
    this.extendBuild((config, { isClient, isModern }) => {
        config.resolve.extensions.push('.ts', '.tsx');
        const jsxRuleLoaders = config.module.rules.find(r => r.test.test('.jsx')).use;
        const babelLoader = jsxRuleLoaders[jsxRuleLoaders.length - 1];
        config.module.rules.push(...['ts', 'tsx'].map(ext => ({
            test: new RegExp(`\\.${ext}$`, 'i'),
            use: [
                babelLoader,
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        [`append${ext.charAt(0).toUpperCase() + ext.slice(1)}SuffixTo`]: [/\.vue$/],
                        ...(options.loaders && options.loaders[ext])
                    }
                }
            ]
        })));
        if (options.typeCheck && isClient && !isModern) {
            const ForkTsCheckerWebpackPlugin = require(this.nuxt.resolver.resolveModule('fork-ts-checker-webpack-plugin'));
            config.plugins.push(new ForkTsCheckerWebpackPlugin(Object.assign({
                vue: true,
                tsconfig: path.resolve(this.options.rootDir, 'tsconfig.json'),
                formatter: 'codeframe',
                logger: consola.withScope('nuxt:typescript')
            }, options.typeCheck)));
        }
    });
};
export default tsModule;
//# sourceMappingURL=index.js.map