// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: 'https://knowledgesoftware.kinghost.net/apps_nodejs/droid/dist/',
            destination: 'https://knowledgesoftware.kinghost.net/apps_nodejs/droid/dist/',
          },
        ]
      },
  };
