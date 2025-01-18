const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    mode: "production",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        // If you're using React and want to import the SVG as a React component
                        issuer: /\.[jt]sx?$/, // only process if it's being imported in JS/JSX or TS/TSX
                        use: ['@svgr/webpack'],
                    },
                    {
                        // Handle SVG as a URL/resource
                        type: 'asset/resource',
                    },
                ],
            },
        ],
    },
    devtool: 'source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true,
    },
};
