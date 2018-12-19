const path= require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const html= require('html-webpack-plugin');

module.exports={
    entry:{
        'app':'./src/index.js'
        
    ,
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/',
        filename: 'bundle.js'
        
    },
    
    
    resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        
        
    },
   
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        

    },
    module:{

        rules:[
            {
                test:/.jsx?$/,
                loader:'babel-loader',
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
                ]
            },
            { 
                test: /\.tsx?$/, loader: "awesome-typescript-loader" 
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new html({
            filename: 'index.html',
            template:'template.html'
        })
   
    ],


};