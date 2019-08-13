/*
* rule
* {"trigger":"change","max":10,"min":20,"field":"telegrpNo","fullField":"telegrpNo","type":"string", ...}
*  可自定义属性
*/
// 定义默认中文所占字符长度，由个项目使用的数据库决定
// 正常 utf-8以三个字节存储中文；gbk以二个字节存储中文。
const _chineseLength = 3;
// number校验
/*
 处理属性:
 length tip isPositive: 是否为正数
 */
export const checkNumber = (rule, value, callback) => {
  if (typeof value === 'number') {
    value = value.toString().trim()
  }
  if (value) {
    if (isNaN(value) || value.toString().trim() === '') {
      return callback(new Error('请输入数字'));
    }
    if (typeof rule.length === 'undefined') {
      if (typeof rule.isPositive !== 'undefined') {
        if (value < 0) {
          return callback(new Error('请输入正数'))
        }
      }
      return callback()
    }
    let arry = rule.length.toString().split('.')
    let integer = arry[0]
    let decimal = arry[1]
    let str = null, reg = null
    if (typeof decimal === 'undefined') {
      str = '\\d{0,' + integer + '}'
      reg = new RegExp('^' + str + '$', 'g');
      if (!reg.test(value)) {
        return callback(new Error(integer + ' 位整数'));
      }
    } else {
      integer = integer - decimal;
      str = '(([1-9]{1}\\d{0,' + (integer - 1) + '}(\\.\\d{1,' + decimal + '})?)|(0(\\.\\d{1,' + decimal + '})?))'
      reg = new RegExp('^' + str + '$', 'g');
      if (!reg.test(value)) {
        return callback(new Error(integer + ' 位整数,小数点后' + decimal + '位'));
      }
    }
  } else {
    if (rule.required) {
      return callback(new Error('不能为空'));
    }
  }
  callback();
};

export const checkPercent = (rule, value, callback) => {
  if (value) {
    if (value) {
      if (isNaN(value)) {
        return callback(new Error('请输入数字'));
      }
      let exact = rule.exact
      let item = '100'
      let max = '100|'
      if (exact) {
        item += '.'
      }
      for (let i = 0; i < exact; i++) {
        item += '0'
        max += item + '|'
      }
      let str = '(' + max + '(0(\\.\\d{0,' + exact + '})?)|([1-9]?\\d{0,1}(\\.\\d{0,' + exact + '})?))'
      let reg = new RegExp('^' + str + '$', 'g');
      if (!reg.test(value)) {
        return callback(new Error('0~100,可保留' + exact + '位小数'))
      }
    }
  } else {
    if (rule.required) {
      return callback(new Error('请输入'));
    }
  }
  callback();
}
// 是否为整数包含0
export const checkInteger = (rule, value, callback) => {
  if (value) {
    if (isNaN(value)) {
      return callback(new Error('请输入数字'));
    }
    let str = /^([1-9][0-9]*)$|^0$/
    if (!str.test(value)) {
      return callback(new Error('请输入自然数'))
    }
  }
  callback();
}

// 电话手机号码验证
export const checkTel = (rule, value, callback) => {
  if (value) {
    let reg = /^1[34578]\d{9}$/
    let reg1 = /^(\d{3,4}|\d{3,4}-)?\d{7,8}$/

    let result = false, result1 = false
    if (reg.test(value)) {
      result = true
    }

    if (reg1.test(value)) {
      result1 = true
    }
    if (result || result1) {
      callback()
    } else {
      return callback(new Error('格式验证有误...'))
    }
  } else {
    if (rule.required) {
      return callback(new Error('请输入'));
    }
  }
  callback()
}

// 传真验证
export const checkFax = (rule, value, callback) => {
  if (value) {
    let reg1 = /^(\d{3,4}|\d{3,4}-)?\d{7,8}$/
    let result1 = false
    if (reg1.test(value)) {
      result1 = true
    }
    if (result1) {
      return callback()
    } else {
      return callback(new Error('格式验证有误...'))
    }
  }
  callback()
}

export const chekPercent = (rule, value, callback) => {
  if (value) {
    let reg = new RegExp('^(\\d|[1-9]\\d|100)$');
    if (!reg.test(value)) {
      return callback(new Error('数值在0~100之间'))
    }
  }
  callback()
}

// 校验只能输入英文 和 数字
export const checkEnglish = (rule, value, callback) => {
  if (value) {
    let reg = /^[A-Za-z0-9\s]+$/
    if (!reg.test(value)) {
      return callback(new Error('请输入英文和数字'));
    }
    if (rule.max < value.length) {
      return callback(new Error('最多输入' + rule.max + '个字符'));
    }
  } else {
    if (rule.required) {
      return callback(new Error('请输入'));
    }
  }
  callback();
};

// 价格校验(大于0)
export const checkPositiveNumber = (rule, value, callback) => {
  if (value) {
    if (isNaN(value)) {
      return callback(new Error('请输入数字'));
    } else if (!(value > 0)) {
      return callback(new Error('请输入正数'));
    }
  }
  callback();
};
// 文本校验（综合）
/*
* 处理属性：
* required max min fieldName chineseLength
*/
export const checkText = (rule, value, callback) => {
  if (value) {
    let reg = /^[-_a-zA-Z0-9\u4e00-\u9fa5]+$/;
    if (!reg.test(value)) {
      return callback(new Error('请输入中文、英文字母、数字、下划线（_）或横线（-）的组合'));
    }
    let chineseLen = _chineseLength;
    if (rule.chineseLength && rule.chineseLength > 0) {
      chineseLen = rule.chineseLength;
    }
    let iLen = chineseLen > 1 ? _charLength(value, chineseLen) : value.length;
    if (rule.min && rule.min > 0 && iLen < rule.min) {
      return callback(new Error('最少输入' + rule.min + '个字符（一个中文占' + chineseLen + '个字符）'));
    }
    if (rule.max && rule.max > 0 && iLen > rule.max) {
      return callback(new Error('最多输入' + rule.max + '个字符（一个中文占' + chineseLen + '个字符）'));
    }
  } else {
    if (rule.required) {
      let sfield = rule.fieldName ? rule.fieldName : '';
      return callback(new Error('请输入' + sfield));
    }
  }
  callback();
};

/*
 * 处理属性：
 * required max min fieldName chineseLength
 */
export const checkComplexText = (rule, value, callback) => {
  if (value) {
    let chineseLen = _chineseLength;
    if (rule.chineseLength && rule.chineseLength > 0) {
      chineseLen = rule.chineseLength;
    }
    let iLen = chineseLen > 1 ? _charLength(value, chineseLen) : value.length;
    if (rule.min && rule.min > 0 && iLen < rule.min) {
      return callback(new Error('最少输入' + rule.min + '个字符（一个中文占' + chineseLen + '个字符）'));
    }
    if (rule.max && rule.max > 0 && iLen > rule.max) {
      return callback(new Error('最多输入' + rule.max + '个字符（一个中文占' + chineseLen + '个字符）'));
    }
  } else {
    if (rule.required) {
      let sfield = rule.fieldName ? rule.fieldName : '';
      return callback(new Error('请输入' + sfield));
    }
  }
  callback();
};
// 中文校验
export const checkChinese = (rule, value, callback) => {
  let reg = /^[\u4e00-\u9fa5]+$/;
  if (!reg.test(value)) {
    return callback(new Error('请输入中文'));
  }
  callback();
};
// 字符校验（含中文）
export const checkChar = (rule, value, callback) => {
  let reg = /^[-_a-zA-Z0-9\u4e00-\u9fa5]+$/;
  if (!reg.test(value)) {
    return callback(new Error('请输入中文、英文字母、数字、下划线（_）或横线（-）的组合'));
  }
  callback();
};
// 字符校验（不含中文）
export const checkCharNoChinese = (rule, value, callback) => {
  let reg = /^[-_a-zA-Z0-9]+$/;
  if (value && !reg.test(value)) {
    return callback(new Error('请输入英文字母、数字、下划线（_）或横线（-）的组合'));
  }
  callback();
};
// 字符长度校验（包含对中文的处理）rule需至少有 min 或 max
export const checkCharLength = (rule, value, callback) => {
  if (value) {
    let chineseLen = _chineseLength;
    if (rule.chineseLength && rule.chineseLength > 0) {
      chineseLen = rule.chineseLength;
    }
    let iLen = chineseLen > 1 ? _charLength(value, chineseLen) : value.length;
    if (rule.min && rule.min > 0 && iLen < rule.min) {
      return callback(new Error('最少输入' + rule.min + '个字符（一个中文占' + chineseLen + '个字符）'));
    }
    if (rule.max && rule.max > 0 && iLen > rule.max) {
      return callback(new Error('最多输入' + rule.max + '个字符（一个中文占' + chineseLen + '个字符）'));
    }
  } else {
    if (rule.required) {
      return callback(new Error('请输入'));
    }
  }
  callback();
};

export const checkCharLength2 = (rule, value, callback) => {
  if (value) {
    let chineseLen = _chineseLength;
    if (rule.chineseLength && rule.chineseLength > 0) {
      chineseLen = rule.chineseLength;
    }
    let iLen = chineseLen > 1 ? _charLength(value, chineseLen) : value.length;
    if (rule.min && rule.min > 0 && iLen < rule.min) {
      return callback(new Error('最少输入' + rule.min + '个字符'));
    }
    if (rule.max && rule.max > 0 && iLen > rule.max) {
      return callback(new Error('最多输入' + rule.max + '个字符'));
    }
  } else {
    if (rule.required) {
      return callback(new Error('请输入'));
    }
  }
  callback();
};
// 校验邮编
export const checkZIP = (rule, value, callback) => {
  if (value) {
    let reg = /^\d{6}$/;
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入邮编（6位数字）'));
    }
  }
  callback();
}
// 校验internet URL
export const checkURL = (rule, value, callback) => {
  if (value) {
    let reg = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入网址'));
    }
  }
  callback()
}

/**
 * 字符长度，处理中文
 * utf-8以三个字节存储中文；gbk以二个字节存储中文。
 */
export function _charLength (str, chineseLen) {
  if (!str || str.length <= 0) { return 0; };
  // str = mytrim(str);
  let chineseLength = 3; // utf-8编码，中文长度
  if (chineseLen && chineseLen > 0) {
    chineseLength = chineseLen
  }
  let objValue = str;
  let objLength = 0;
  let compareChar = '';
  let regExp = new RegExp("^[A-Za-z0-9 -_`~!@#$%^&*()-+=|,<.>/?;:'\\\"]$");
  for (let count = 0; count < objValue.length; count++) {
    compareChar = objValue.substring(count, count + 1);
    if (regExp.test(compareChar)) {
      objLength += 1;
    } else if (compareChar === '\\') {
      objLength += 1;
    } else {
      objLength += chineseLength;
    }
  }
  return objLength;
}

/**
 * 判断不能为数字
 */
export const checkDigital = (rule, value, callback) => {
  var re = /^[0-9]+.?[0-9]*/; // 判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
  if (re.test(value)) {
    return callback(new Error('不能全部输入数字'));
  }
  callback();
}
