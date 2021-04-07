// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://knowledgesoftware.kinghost.net/apps_nodejs/droid/dist/',
          },
        ]
      },
  };
