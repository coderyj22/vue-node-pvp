module.exports = {
  devServer: {
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/admin/api/rest',
        },
      },
    },
  },
};
