const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    welcome: "https://welcome-coral.vercel.app/remoteEntry.js", 
    home: "https://home-teddy.vercel.app/remoteEntry.js",  
    cliente: "https://cliente-teddyy.vercel.app/remoteEntry.js",
    produto: "https://produto-teddy.vercel.app/remoteEntry.js",
  },

  shared: {
    ... shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })
  },

});
