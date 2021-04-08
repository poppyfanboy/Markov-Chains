import baseConfig from './webpack.base.config.mjs';

import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';

const prodConfig = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
            ignoreOrder: false,
        }),
    ],
    optimization: {
        minimize: true,
        usedExports: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
        ],
    },
    module: {
        rules: [
            {
                test: /\.p?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
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

export default prodConfig;
