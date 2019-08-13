/**
 * Created by onlyang on 2018/4/19.
 * es5
 */
var Aorise = {};
(function ($, window, document) {
  Aorise.utils = {
    // 参数Split
    paramsSplit: function (sparam, ssplit) {
      var sp = '', spd = '';
      if (sparam && sparam.length > 0) {
        if (!ssplit) { ssplit = ';;'; }
        var atp = sparam.split(ssplit);
        sp = atp[0];
        if (atp.length > 1) { spd = atp[1]; }
      }
      return [sp, spd];
    }
  };
}(jQuery, window, document));

/*
* 验证码
* */
(function () {
  var randstr = function (length) {
    var key = {
      str: [
        // 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        // 'o', 'p', 'q', 'r', 's', 't', 'x', 'u', 'v', 'y', 'z', 'w', 'n',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ],
      randint: function (n, m) {
        var c = m - n + 1;
        var num = Math.random() * c + n;
        return Math.floor(num);
      },
      randStr: function () {
        var _this = this;
        var leng = _this.str.length - 1;
        var randkey = _this.randint(0, leng);
        return _this.str[randkey];
      },
      create: function (len) {
        var _this = this;
        var l = len || 10;
        var str = '';
        for (var i = 0; i < l; i++) {
          str += _this.randStr();
        }
        return str;
      }
    };
    length = length > 0 ? length : 10;
    return key.create(length);
  };
  var randint = function (n, m) {
    var c = m - n + 1;
    var num = Math.random() * c + n;
    return Math.floor(num);
  };
  var VCode = function (dom, options) {
    this.codeDoms = [];
    this.lineDoms = [];
    this.initOptions(options);
    this.dom = dom;
    this.init();
    this.addEvent();
    this.update();
    this.mask();
  };
  VCode.prototype.init = function () {
    this.dom.style.position = 'relative';
    this.dom.style.overflow = 'hidden';
    this.dom.style.cursor = 'pointer';
    this.dom.title = '点击更换验证码';
    this.dom.style.background = this.options.bgColor;
    /*
      alert(this.options.width);
      alert(this.dom.clientWidth>0?this.dom.clientWidth:40); clientHeight
    */
    this.w = this.options.width > 0 ? this.options.width : (this.dom.clientWidth > 0 ? this.dom.clientWidth > 0 : 100);
    this.h = this.options.height > 0 ? this.options.height : (this.dom.clientHeight > 0 ? this.dom.clientHeight > 0 : 40);
    this.uW = this.w / this.options.len;
  };
  VCode.prototype.mask = function () {
    var dom = document.createElement('div');
    dom.style.cssText = [
      'width: 100%',
      'height: 100%',
      'left: 0',
      'top: 0',
      'position: absolute',
      'cursor: pointer',
      'z-index: 9999999'
    ].join(';');
    dom.title = '点击更换验证码';
    this.dom.appendChild(dom);
  };
  VCode.prototype.addEvent = function () {
    var _this = this;
    _this.dom.addEventListener('click', function () {
      // _this.update.call(_this);
      _this.update();
    });
  };
  VCode.prototype.initOptions = function (options) {
    var FunctionOptons = function () {
      this.len = 4;
      this.fontSizeMin = 24;
      this.fontSizeMax = 28;
      this.colors = [
        'green',
        'red',
        'blue',
        '#53da33',
        '#AA0000',
        '#FFBB00'
      ];
      this.bgColor = '#f6f6f6';
      this.fonts = [
        'Times New Roman',
        'Georgia',
        'Serif',
        'sans-serif',
        'arial',
        'tahoma',
        'Hiragino Sans GB'
      ];
      this.lines = 8;
      this.lineColors = [
        '#888888',
        '#FF7744',
        '#888800',
        '#008888'
      ];
      this.lineHeightMin = 1;
      this.lineHeightMax = 2;
      this.lineWidthMin = 1;
      this.lineWidthMax = 30;
    };
    this.options = new FunctionOptons();
    if (typeof options === 'object') {
      for (var i in options) {
        this.options[i] = options[i];
      }
    }
  };
  VCode.prototype.update = function () {
    for (var i = 0; i < this.codeDoms.length; i++) {
      this.dom.removeChild(this.codeDoms[i]);
    }
    for (var j = 0; j < this.lineDoms.length; j++) {
      this.dom.removeChild(this.lineDoms[j]);
    }
    this.createCode();
    this.draw();
  };
  VCode.prototype.createCode = function () {
    this.code = randstr(this.options.len);
  };
  VCode.prototype.verify = function (code) {
    return this.code === (code ? code.toLowerCase() : code);
  };
  VCode.prototype.draw = function () {
    this.codeDoms = [];
    for (var i = 0; i < this.code.length; i++) {
      this.codeDoms.push(this.drawCode(this.code[i], i));
    }
    this.drawLines();
  };
  VCode.prototype.drawCode = function (code, index) {
    var dom = document.createElement('span');
    dom.style.cssText = [
      'font-size:' + randint(this.options.fontSizeMin, this.options.fontSizeMax) + 'px',
      'color:' + this.options.colors[randint(0, this.options.colors.length - 1)],
      'position: absolute',
      'left:' + randint(this.uW * index, this.uW * index + this.uW - 15) + 'px',
      'top:' + randint(0, 5) + 'px',
      'transform:rotate(' + randint(-20, 20) + 'deg)',
      '-ms-transform:rotate(' + randint(-20, 20) + 'deg)',
      '-moz-transform:rotate(' + randint(-20, 20) + 'deg)',
      '-webkit-transform:rotate(' + randint(-20, 20) + 'deg)',
      '-o-transform:rotate(' + randint(-20, 20) + 'deg)',
      'font-family:' + this.options.fonts[randint(0, this.options.fonts.length - 1)],
      'font-weight:' + randint(500, 900)
    ].join(';');
    dom.innerHTML = code;
    this.dom.appendChild(dom);
    return dom;
  };
  VCode.prototype.drawLines = function () {
    this.lineDoms = [];
    for (var i = 0; i < this.options.lines; i++) {
      var dom = document.createElement('div');
      dom.style.cssText = [
        'position: absolute',
        'opacity: ' + randint(3, 5) / 10,
        'width:' + randint(this.options.lineWidthMin, this.options.lineWidthMax) + 'px',
        'height:' + randint(this.options.lineHeightMin, this.options.lineHeightMax) + 'px',
        'background: ' + this.options.lineColors[randint(0, this.options.lineColors.length - 1)],
        'left:' + randint(0, this.w - 20) + 'px',
        'top:' + randint(0, this.h) + 'px',
        'transform:rotate(' + randint(-30, 30) + 'deg)',
        '-ms-transform:rotate(' + randint(-30, 30) + 'deg)',
        '-moz-transform:rotate(' + randint(-30, 30) + 'deg)',
        '-webkit-transform:rotate(' + randint(-30, 30) + 'deg)',
        '-o-transform:rotate(' + randint(-30, 30) + 'deg)',
        'font-family:' + this.options.fonts[randint(0, this.options.fonts.length - 1)],
        'font-weight:' + randint(400, 900)
      ].join(';');
      this.dom.appendChild(dom);
      this.lineDoms.push(dom);
    }
  };
  this.VCode = VCode;
}).call(this);
