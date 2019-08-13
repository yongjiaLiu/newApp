// 全局过滤器
import Vue from 'vue';
import Moment from 'moment';
/*
 * 金额格式化
 * @param {string|number} money 金额
 * @param {integer} decimal 小数位数，默认为两位
 * @param {string} currency 货币符号
 * @return {string} 格式化后的金额，如：12,312.00
 * */
Vue.filter('fmMoney', function(money, decimal, currency) {
	if (isNaN(money)) {
		return money;
	}
	if (!money) {
		money = '0.0';
	}
	decimal = decimal > 0 && decimal <= 20 ? decimal : 2;
	money = parseFloat((money + '').replace(/[^\d.-]/g, '')).toFixed(decimal) + '';
	let l = money.split('.')[0].split('').reverse();
	let r = money.split('.')[1];
	let t = '';
	for (let i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
	}
	return (currency !== undefined ? currency : '') + t.split('').reverse().join('') + '.' + r;
});
/*
 * 金额反格式化
 * @param {string|number} money 金额
 * @return {string} 反格式化后的金额，如：12312.00
 * */
Vue.filter('rmMoney', function(money) {
	return parseFloat(money.replace(/[^\d.-]/g, ''));
});

/*
 * 取整
 */
Vue.filter('parseIntFilter', function(value) {
	if (!isNaN(value)) {
		value = Math.round(value);
	}
	return value;
});

/*
 * 百分比
 */
Vue.filter('percentFilter', function(value, decimals) {
	if (!isNaN(value)) {
		value = value * 100 + '';
		let idec = value.split('.');
		if (idec[1] && idec[1].length > decimals) {
			value = idec[0] + '.' + idec[1].substring(0, decimals);
		}
		value += '%';
	}
	return value;
});

/*
 * 千分表达式转换
 * num 要格式化的数字 n 保留小数位
 */
Vue.filter('formatNum', function(num, n) {
	if (!n) {
		n = 2;
	}
	if (num === null || num === 'null' || num === undefined || num === 'undefined') {
		return '';
	}
	if (isNaN(num)) {
		return num;
	}
	let data = (num + '').split('.');
	num = data[0];
	if (n) {
		num = Number(num);
		num.toFixed(n);
	}
	num = String(num);
	var re = /(-?\d+)(\d{3})/;
	while (re.test(num)) {
		num = num.replace(re, '$1,$2');
	}
	if (data[1] !== '' && data[1] !== null && data[1] !== undefined) {
		num = num + '.' + data[1];
	}
	return num;
});

Vue.filter('floatComputed', function(arg1, arg2, sign) {
	let val1 = arg1 + '';
	let val2 = arg2 + '';
	let rate = 1;
	let rate1 = 1;
	let rate2 = 1;
	if (val1.indexOf('.') < 0) {
		rate1 = 0;
	} else {
		rate1 = val1.length - val1.indexOf('.') - 1;
	}
	if (val2.indexOf('.') < 0) {
		rate2 = 0;
	} else {
		rate2 = val2.length - val2.indexOf('.') - 1;
	}
	rate = rate2;
	val2 = val2.replace('.', '');
	val1 = val1.replace('.', '');
	if (rate1 > rate2) {
		rate = rate1;
		for (let i = 0; i < rate1 - rate2; i++) {
			val2 = val2 + '0'
		}
	} else {
		for (let i = 0; i < rate2 - rate1; i++) {
			val1 = val1 + '0';
		}
	}
	let rateNum = Math.pow(10, rate);
	if (sign === '-') {
		return (Number(val1) - Number(val2)) / rateNum
	}
	if (sign === '+') {
		return (Number(val1) + Number(val2)) / rateNum
	}
	if (sign === '*') {
		return (Number(val1) * Number(val2)) / (rateNum * rateNum)
	}
	return null;
})

/**
 * 时间过滤
 * */
Vue.filter('moment', function(date, format) {
	if (!date) {
		return '';
	}
	format = format || 'YYYY-MM-DD HH:mm:ss';
	return Moment(date).format(format);
});
Vue.filter('minTime', function(date, format) {
	if (!date) {
		return '';
	}
	format = format || 'YYYY-MM-DD';
	return Moment(date).format(format);
});
Vue.filter('ellipsis', function(value) {
	if (!value) return ''
	if (value.length > 20) {
		return value.slice(0, 20) + '...'
	}
	return value
});
