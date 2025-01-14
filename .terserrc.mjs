/** @type {import("terser").MinifyOptions} */
const options = {
  "compress": {
    "global_defs": {
      // remove dev and test specific code for production
      "process.env.NODE_ENV": process.env.NODE_ENV || "production",
      "process.env.BABEL_ENV": process.env.BABEL_ENV || process.env.NODE_ENV || "production",
    },
    "toplevel": false, // results in errors
    "hoist_vars": false,
    "hoist_funs": true,
    "pure_getters": true,
    "unsafe": true,
    "unsafe_arrows": false, // results in errors
    "unsafe_comps": true,
    "unsafe_Function": true,
    "unsafe_math": true,
    "unsafe_symbols": true,
    "unsafe_methods": false, // results in errors
    "unsafe_proto": true,
    "unsafe_regexp": true,
    "unsafe_undefined": true,
  },
  "format": {
    "comments": false,
  },
  "mangle": {
    "eval": true,
    // _flutter is a top-level variable defined by flutter.js
    "toplevel": false,
  },
  "sourceMap": false,
}
export default options
