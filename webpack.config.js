const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WorkboxPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


let mode = "development";
let target = "web";
let sourcemapMode = "eval-source-map";
let isProduction = false;

// ? Option - Configuration:
if (process.env.NODE_ENV === "production") {
    // Coupled with setting NODE_ENV via npm "scripts"
    mode = "production";
    // Temporary workaround for "browserslist" bug that is being patched in the near future
    // Bug: does not persist with webpack live server
    target = "browserslist";
    // Runs slow for setup, then fast
    sourcemapMode = "source-map";
    isProduction = true;
    // cleanFiles = ['**/*']
}

// Simple server setting
// for Manually testing current user experience
let isUserExp = false;
if (process.env.USER_EXP == "pass") {
    isUserExp = true;
}


module.exports = {
  mode: mode,
  entry: {
      index: "./src/index.ts",
      assets: "./src/assets.ts",
  },
  output: {
      // Single
      // filename: "[name].bundle.js",
      // Multiple
      filename: "[name].bundle.[chunkhash].js",
      path: path.resolve(__dirname, "dist"),
      // assetModuleFilename: "images/[hash][ext][query]"
  },
  devServer: {
      contentBase: "./dist",
      port: "3000",
      // ? Optional
      // to switch to Hot Module Reload
      // turn on hot to true, and liveReload to false
      // hot: true,
      // liveReload: fasle

      // Tells `devServer` to write generated assets to the disk. The output is written to the output.path directory.
      // Providing a Function to devServer.writeToDisk can be used for filtering.
      // Use with `http-server`, otherwise ... who knows, crash?
      writeToDisk: isUserExp,


      // ? Optional
      // If there's issue with React Router or similar
      // where you are on another url starting point,
      // this will redirect you to "index.html"
      // historyApiFallback: true
  },
  module: {
      rules: [
          // # Target: Image files
          // Method 1
          // {
          //     test: /\.(png|jpe?g|gif|svg|webp)$/i,
          //     use: [
          //         {
          //             loader: "file-loader",
          //             options: {
          //                 // name: "images/[name]-[hash:8].[ext]",
          //                 name: "images/[name].[ext]",
          //             }
          //         },
          //     ],
          // },
          // Method 2
          {
              test: /\.(png|jpe?g|gif|svg|webp)$/i,
              type: "asset/resource"
          },

          // # Target: Font files

          // {
          //     test: /\.(woff|woff2)$/,
          //     use: {
          //         loader: "url-loader"
          //     }
          // },

          // resolve-url-loader

          // {
          //     test: /\.(woff|woff2|eot|ttf|otf)$/,
          //     use: [
          //         {
          //             // loader: "url-loader",
          //             loader: "file-loader",
          //             options: {
          //                 name: "fonts/[name].[ext]"
          //             }
          //         },
          //     ],
          // },


          // # Target: favicon
          // {
          //     test: /\.ico$/i,
          //     type: "asset",
          //     parser: {
          //         dataUrlCondition: {
          //             maxSize: 30 * 1024,
          //         }
          //     },
          //     generator: {
          //         filename: "[name][ext][query]"
          //     }
          // },


          // # Target: webmanifest
          // {
          //     test: /\.webmanifest$/i,
          //     use: {
          //         loader: "file-loader",
          //         options: {
          //             name: "[name].[ext]"
          //         }
          //     }
          // },

          // # Target: JavaScript / TypeScript
          {
              test: /\.(js|ts)x?$/,
              exclude: /node_modules/,
              use: "babel-loader"
              // use: {
              //     loader: "ts-loader",
              //     // loader: "babel-loader",
              //     // options: {
              //     //     // disable type checker - we will use it in fork plugin
              //     //     transpileOnly: true
              //     //   }
              // }
          },

          // // # Target: JavaScript
          // {
          //     test: /\.(js|ts)x?$/,
          //     exclude: /node_modules/,
          //     use: {
          //         loader: "babel-loader",
          //         options: {
          //             cacheDirectory: true,
          //         }
          //     }
          // },

          // # Target: Styles
          {
              test: /\.(s[ac]|c)ss$/i,
              use: [
                //   "style-loader", // for inline CSS injection
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "postcss-loader",
                  "resolve-url-loader",
                  "sass-loader",
              ]
          }
      ]
  },


  // # Plugins
  /**
   * Plugin order is important.
   * A wrong order will cause some hooks to be undefined
   * and the build to fail
   */
  plugins: [
      // Be aware it will run every time webpack is run
      // Comment `BundleAnalyzerPlugin` for testing purposes ONLY
      // new BundleAnalyzerPlugin(),

      new CleanWebpackPlugin(
          // ? Optional - exlucde files to recompiled
          // e.g. UNCHANGE images
          // cleanOnceBeforeBuildPatterns: cleanFiles
      ),

      // ! comment
      // new ImageMinimizerPlugin({
      //     exclude: /\.ico$/i,
      //     minimizerOptions: {
      //         plugins: [
      //             // ! Configure - imagemin plugins must be installed before use
      //             // ["<title>", {<options>}],
      //             // ["<title>", {<options>}],
      //             // ["<title>", {<options>}],
      //         ],
      //     },
      //     loader: true
      // }),

      new MiniCssExtractPlugin(),

      // ! Production Ready... uncomment
      // new webpack.ids.HashedModuleIdsPlugin(),

      new HtmlWebpackPlugin({
          title: "Workbox Demo",
          template: "./src/index.html",
          filename: "index.html",
          inject: "body",
      }),
      new HtmlWebpackPlugin({
          title: "Workbox Demo",
          template: "./src/about.html",
          filename: "about.html",
          chunks: ["about"]
      }),

      // * Used with TypeScript
      // Runs typescript type checker on a separate process
      new ForkTsCheckerWebpackPlugin(),

      // ! Production Ready... uncomment
      new WorkboxPlugin.GenerateSW({
          // Rename
          swDest: "sw.js",
          // these options encourage the ServiceWorkers to get in there fast
          // and not allow any straggling "old" SWs to hang around
        //   clientsClaim: true,
        //   skipWaiting: true,
        //   maximumFileSizeToCacheInBytes: 5*1024*1024
        runtimeCaching: [
            // Cache Assets - styles, scripts
            {
                urlPattern: /\.(?:css|js)/,
                handler: "CacheFirst",

                options: {
                    cacheName: "assets",
                    expiration: {
                        maxAgeSeconds: 60 * 60,
                        maxEntries: 10
                    }
                }
            },

            // Cache API
            {
                urlPattern: new RegExp("https://jsonplaceholder.typicode.com/users"),
                handler: "NetworkFirst",

                options: {
                    cacheName: "json-placeholder-api",
                    expiration: {
                        maxAgeSeconds: 60 * 60,
                        maxEntries: 3
                    }
                }
            },

            // Cache Fonts
            {
                urlPattern: new RegExp("https://fonts.googleapis.com"),
                handler: "StaleWhileRevalidate",

                options: {
                    cacheName: "google-fonts-stylesheets"
                }
            },
            {
                urlPattern: new RegExp("https://fonts.gstatic.com"),
                handler: "CacheFirst",
                options: {
                    cacheableResponse: {
                        statuses: [0, 200]
                    },
                    cacheName: "google-fonts-webfonts"
                }
            },

            // Cache Images
            {
                urlPattern: new RegExp("https://jsonplaceholder.typicode.com/photos"),
                handler: "StaleWhileRevalidate",

                options: {
                    cacheName: "photos"
                }
            }

            // Navigate fallback
        ]
      }),

      // ? Optional
      // Provide different environment build in development and production
      // with process.env.NODE_ENV
      // new webpack.DefaultPlugin({
      //     "process.env": {
      //         "NODE_ENV": JSON.stringify('process.env.NODE_ENV')
      //     }
      // })
  ],

  // # File Extensions Options
  resolve: {
      // extensions: [".js", ".jsx"]
      extensions: [".tsx", ".ts",".js"]
  },

  // # Optimization - Treeshaking Options
  // optimization: {

      // Similar to "new webpack.ids.HashedModuleIdsPlugin()"
      // ... Not sure what's the difference
      // moduleIds: "deterministic",

      // providedExports: true, // default - true
      // usedExports: false, // dev - true; prod - false
      // sideEffects: true,

      // splitChunks: {
      //     cacheGroups: {
              // defaultVendors: {
              //     test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
              //     name: "defaultVendors",
              //     chunks: "all"
              // }
      //     }
      // }

      // runtimeChunk: "single"
      // splitChunks: {
      //     chunks: "all"
      // }
  // },

  // # Misc.
  target: target,
  devtool: sourcemapMode
};