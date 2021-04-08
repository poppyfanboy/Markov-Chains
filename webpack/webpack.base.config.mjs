import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';

export default {
    target: 'web',
    entry: {
        app: './src/index.ts',
    },
    devServer: {
        port: 8080,
        hot: true,
        liveReload: true,
    },
    plugins: [
        new HtmlPlugin({
            template: './src/index.html',
            chunks: [ 'app' ],
            filename: 'index.html',
        }),
    ],
    output: {
        clean: true,
        path: path.join(path.resolve('.'), 'public'),
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: [ 'babel-loader' ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpe?g|gif|vert|frag)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: [ '.js', '.ts', '.d.ts', '.wasm', '.json', '.mjs' ],
    },
};
