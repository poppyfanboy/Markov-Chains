import baseConfig from './webpack.base.config.mjs';

import { merge } from 'webpack-merge';
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';

const devConfig = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]',
    },
    module: {
        rules: [
            {
                test: /\.p?css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    nested(),
                                    autoprefixer(),
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
});

export default devConfig;
