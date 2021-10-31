module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '^/login': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '^/logout': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '^/sanctum': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
};
