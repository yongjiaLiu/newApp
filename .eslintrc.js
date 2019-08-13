// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jquery: true // 添加对jquery的支持
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // 指定你所要使用的全局变量，true代表允许重写、false代表不允许重写
  globals: {
    Swiper: true, // Swiper
    Steer: true // Steer
  },
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  // 系数0为不提示(off)、1为警告(warn)、2为错误抛出(error)
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // allow / 强制 语句结束以分号结束
    'semi': 0,
    // allow 连续声明 let a=1,b=2,....;
    'one-var': 0,
    // allow new Object()
    'no-new': 0,
    // 在创建对象字面量时不允许键重复 {a:1, a:1}
    'no-dupe-keys': 2,
    // 函数参数不能重复
    'no-dupe-args': 2,
    // 不能有声明后未被使用的变量或参数
    'no-unused-vars': 0
  }
};
