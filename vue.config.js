// module.exports = {
//     devServer: {
//         port: 8000
//     },
//     configureWebpack: {
//         name: projectName,
//         resolve: {
//             alias: {
//                 '@': resolve('src'),
//                 'views': resolve('src/views')
//             }
//         }
//     },
//     chainWebpack(config) {
//         config.module
//             .rule('svg')
//             .exclude.add(resolve('src/icons'))
//             .end()
//         config.module
//             .rule('icons')
//             .test(/\.svg$/)
//             .include.add(resolve('src/icons'))
//             .end()
//             .use('svg-sprite-loader')
//             .loader('svg-sprite-loader')
//             .options({
//                 symbolId: 'icon-[name]'
//             })
//             .end()
//     }
// }