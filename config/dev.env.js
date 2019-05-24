'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://test.dpqct.com"'
  // API_ROOT: '"http://172.18.58.40:8090"'
})
