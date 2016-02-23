var fs = require('fs'),
    path = require('path'),
    webpack = require('webpack');

module.exports = {
    devtool:'inline-source-map',
    //entry : fs.readdirSync(__dirname).reduce(function(entries,dir){
    //    if(fs.statSync(path.join(__dirname,dir)).isDirectory){
    //        entries[dir] = path.join(__dirname,dir,'app.js');
    //    }
    //    return entries
    //},{}),
    entry:{
       app: './src/app.js'
    },
    output:{
        path:__dirname+'/_bulid_',
        filename:'[name].js',
        chunkFilename:'[id].chunk.js',
        publicPath:'/_build_/'
    },

    module:{
      loaders:[
          {test:/\.js$/, exclude:/node_modules/,loader:'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0'},
          {test:/\.css$/,loader:'style!css'}
      ]
    },
    //resolve:{
    //    alias:{
    //        'react-router':path.join(__dirname,'..','moudles')
    //    }
    //},
    plugins:[
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};
