$(function () {
	$.extend(Array.prototype, {
		indexOf: function (o) {
			if ($.isFunction(o)) {
				for (var i = 0; i < this.length; i++) {
					if (o(this[i])) {
						return i;
					}
				}
			} else {
				for (var i = 0, len = this.length; i < len; i++) {
					if (this[i] == o) {
						return i;
					}
				}
			}
			return -1;
		}, remove: function (o) {
			var index = this.indexOf(o);
			if (index != -1) {
				this.splice(index, 1);
			}
			return this;
		}, removeById: function (filed, id) {
			for (var i = 0, len = this.length; i < len; i++) {
				if (this[i][filed] == id) {
					this.splice(i, 1);
					return this;
				}
			}
			return this;
		}
	});
});

// 去抖
var debounce = function (action, delay) {
	var timer = null;
	return function () {
		var self = this,
			args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			action.apply(self, args)
		}, delay);
	}
}


// 节流
var throttleV2 = function (action, delay) {
	var statTime = 0;

	return function () {
		var currTime = +new Date();

		if (currTime - statTime > delay) {
			action.apply(this, arguments);
			statTime = currTime;
		}
	}
}

// 防抖
function debounce(fn, delay) {
	let timer = null //借助闭包
	return function () {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(fn, delay) // 简化写法
	}
}

//判断是否是有效url
function IsValidUrl(_url, fun) {
	$.ajax({
		url: _url,
		async: false,
		type: "get",
		success: function (data, statusText, jqXhr) {
			//说明请求的url存在，并且可以访问
			if ($.isFunction(fun)) {
				fun(true);
			}
		},
		error: function () {
			fun(false);
		},
		statusCode: {
			404: function () {
				//说明请求的url不存在
				if ($.isFunction(fun)) {
					fun(false);
				}
			},
			200: function () {
				if ($.isFunction(fun)) {
					fun(true);
				}
			}
		}
	});
}

function addScript(url) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', url);
	document.getElementsByTagName('head')[0].appendChild(script);
}

function ajaxRequest(option) {
	return $.ajax({
		type: option.type,
		url: option.url,
		cache: false,
		data: option.param,
		dataType: option.dataType,
		success: option.success,
		error: option.error
	});
}

//检查上传的图片格式
function checkImgType(filename) {
	var pos = filename.lastIndexOf(".");
	var str = filename.substring(pos, filename.length)
	var str1 = str.toLowerCase();
	if (!/\.(gif|jpg|jpeg|png|bmp)$/.test(str1)) {
		return false;
	}
	return true;
}

//通用loading变量
var loadingobj;

function showLoading(msg, delay, pWidth, pHeight) {
	if (!delay)
		delay = 100;
	var pStyle = "";
	if (pWidth > 0) {
		pStyle += " width:" + pWidth + "px;";
	}
	if (pHeight > 0) {
		pStyle += " height:" + pHeight + "px;";
	}
	var loading = $('<div class="ajax-loading" style="display:none"><table height="100%" width="100%"><tr><td align="center"><p style="' + pStyle + '">' + (msg ? msg : '') + '</p></td></tr></table></div>');
	loading.appendTo('body');
	var s = setTimeout(function () {
		if ($(".ajax-loading").length > 0) {
			loading.show();
			$('.container,.login-box').addClass('blur');
		}
	}, delay);
	return {
		isclose: false
		, close: function () {
			clearTimeout(s);
			loading.remove();
			this.isclose = true;
			$('.container,.login-box').removeClass('blur');
		}
	}

}


function QueryString(name) {
	/// 获取QueryString
	if (name == null || name == "" || name == undefined) {
		var AllVars = window.location.search.substring(1);
		return AllVars.split("&");
	}
	else {
		var AllVars = window.location.search.substring(1);
		var Vars = AllVars.split("&");
		for (i = 0; i < Vars.length; i++) {
			var Var = Vars[i].split("=");
			if (Var[0].toLowerCase() == name.toLowerCase()) return Var[1];
		}
		return "";
	}
};

function AddFavorite(sURL, sTitle) {
	try {
		window.external.addFavorite(sURL, sTitle);
	}
	catch (e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		}
		catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}

//表示全局唯一标识符 (GUID)。
function Guid(g) {
	var arr = new Array(); //存放32位数值的数组
	if (typeof (g) == "string") { //如果构造函数的参数为字符串
		InitByString(arr, g);
	}
	else {
		InitByOther(arr);
	}

	//返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
	this.Equals = function (o) {
		if (o && o.IsGuid) {
			return this.ToString() == o.ToString();
		}
		else {
			return false;
		}
	}
	//Guid对象的标记
	this.IsGuid = function () { }
	//返回 Guid 类的此实例值的 String 表示形式。
	this.ToString = function (format) {
		if (typeof (format) == "string") {
			if (format == "N" || format == "D" || format == "B" || format == "P") {
				return ToStringWithFormat(arr, format);
			}
			else {
				return ToStringWithFormat(arr, "D");
			}
		}
		else {
			return ToStringWithFormat(arr, "D");
		}
	}
	//由字符串加载
	function InitByString(arr, g) {
		g = g.replace(/\{|\(|\)|\}|-/g, "");
		g = g.toLowerCase();
		if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1) {
			InitByOther(arr);
		}
		else {
			for (var i = 0; i < g.length; i++) {
				arr.push(g[i]);
			}
		}
	}
	//由其他类型加载
	function InitByOther(arr) {
		var i = 32;
		while (i--) {
			arr.push("0");
		}
	}
	/*
	根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
	N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
	B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
	P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
	*/
	function ToStringWithFormat(arr, format) {
		switch (format) {
			case "N":
				return arr.toString().replace(/,/g, "");
			case "D":
				var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20, 32);
				str = str.replace(/,/g, "");
				return str;
			case "B":
				var str = ToStringWithFormat(arr, "D");
				str = "{" + str + "}";
				return str;
			case "P":
				var str = ToStringWithFormat(arr, "D");
				str = "(" + str + ")";
				return str;
			default:
				return new Guid();
		}
	}
}
function GenerateOrderNO() {
	var date = formatdata(new Date(), 'yyyyMMdd');
	var random = randomInt(1000, 9999);
	var random1 = randomInt(1000, 9999);
	return date + "" + random + random1;
}
//Guid 类的默认实例，其值保证均为零。
Guid.Empty = new Guid();
//初始化 Guid 类的一个新实例。
Guid.NewGuid = function (resultLength) {
	var g = "";
	var i = resultLength || 32;
	while (i--) {
		g += Math.floor(Math.random() * 16.0).toString(16);
	}
	return new Guid(g);
}

//第一步算出 m-n的值，假设等于w
//第二步Math.random()*w
//第三步Math.random()*w+n
//第四步Math.round(Math.random()*w+n) 或者 Math.ceil(Math.random()*w+n)
function randomInt(min, max) {
	var diff = max - min;
	var result = Math.round(Math.random() * diff + min);
	result = parseInt(result, 10);
	return result;
}
//Number.prototype.toFixed = function (d) {
//  var s = this + "";
//  if (!d) d = 0;
//  if (s.indexOf(".") == -1) s += ".";
//  s += new Array(d + 1).join("0");
//  if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
//    var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
//    if (a == d + 2) {
//      a = s.match(/\d/g);
//      if (parseInt(a[a.length - 1]) > 4) {
//        for (var i = a.length - 2; i >= 0; i--) {
//          a[i] = parseInt(a[i]) + 1;
//          if (a[i] == 10) {
//            a[i] = 0;
//            b = i != 1;
//          } else break;
//        }
//      }
//      s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

//    } if (b) s = s.substr(1);
//    return (pm + s).replace(/\.$/, "");
//  } return this + "";

//};
Number.prototype.round = function (length) {
	if (!length) {
		return Math.round(this);
	} else {
		var transValue = 1;
		for (var i = 0; i < length; i++) {
			transValue += "0";
		}
		transValue = parseInt(transValue);
    return Math.round((this * transValue).toFixed(1)) / transValue;
	}
}
Number.prototype.floor = function (length) {
	if (!length) {
		return Math.floor(this);
	} else {
		var transValue = 1;
		for (var i = 0; i < length; i++) {
			transValue += "0";
		}
		transValue = parseInt(transValue);
    return Math.floor((this * transValue).toFixed(1)) / transValue;
	}
}
Number.prototype.ceil = function (length) {
	if (!length) {
		return Math.ceil(this);
	} else {
		var transValue = 1;
		for (var i = 0; i < length; i++) {
			transValue += "0";
		}
    transValue = parseInt(transValue);
    return Math.ceil((this * transValue).toFixed(1)) / transValue;
	}
}
String.prototype.replaceAll = function (s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}
String.prototype.startWith = function (str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
}
//测试ok，直接使用str.endWith("abc")方式调用即可
String.prototype.endWith = function (str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
}
//元素全屏：
function fullScreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();//参数：Element.ALLOW_KEYBOARD_INPUT，没起作用
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}
//退出全屏
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}
//获取区域路径
//eg: /admin/home/index 页面调用此方法后返回 /admin/
function getAreaPath() {
	var path = location.pathname + '/';
	path = path.substring(1, path.length);
	path = path.substring(0, path.indexOf('/'));
	return '/' + path + '/';
}
//转换json传输date
function date_string(str, df) {
	df = df || "yyyy-MM-dd";
	return time_string(str, df);
}

//时间转换前位加零
function dFormat(i) { return i < 10 ? "0" + i.toString() : i; }

//转换json传输date
function time_string(str, df) {
	df = df || "yyyy-MM-dd HH:mm:ss";
	var result = "";
	if (str == null || str.length < 1) {
		return result;
	}
	var d;
	if (str.startWith("/Date")) {
		d = eval('new ' + str.substr(1, str.length - 2));
	} else d = new Date(str);
	//var ar_date = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
	result = formatdata(d, df);
	return result;
}

function formatdata(data, fmt) {
	var o = {
		"M+": data.getMonth() + 1, //月份         
		"d+": data.getDate(), //日         
		"h+": data.getHours() % 12 == 0 ? 12 : data.getHours() % 12, //小时         
		"H+": data.getHours(), //小时         
		"m+": data.getMinutes(), //分         
		"s+": data.getSeconds(), //秒         
		"q+": Math.floor((data.getMonth() + 3) / 3), //季度         
		"S": data.getMilliseconds(), //毫秒         
		//"S": data.getTime()//获取当前时间(从1970.1.1开始的毫秒数)
	};
	var week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[data.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

String.prototype.trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

// 倒计时
function countDown(intDiff, callback) {
	var intDiff = parseInt(intDiff); // 倒计时总秒数量
	window.setInterval(function () {
		var day = 0,
			hour = 0,
			minute = 0,
			second = 0; // 时间默认值
		if (intDiff > 0) {
			day = Math.floor(intDiff / (60 * 60 * 24));
			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		}
		if (minute <= 9) minute = '0' + minute;
		if (second <= 9) second = '0' + second;
		callback(day, hour, minute, second);
		intDiff--;
	}, 1000);
}


// /Date(-62135596800000)/转化为yyyy-MM-dd hh:mm:ss
String.prototype._formatJsonDate = function (format) {
	//var str = this.substring(6, this.length - 2); //获取毫秒部分

	var dateObj = new Date(this);

	var dateStr = dateObj._format(format);

	return dateStr;

}

Date.prototype._format = function (format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};
function WindowPrint(htmlStr) {
	// 缓存页面内容
	const bodyHtml = window.document.body.innerHTML;
	// 获取要打印的dom
	//const printContentHtml = htmlStr;//document.getElementById("print").innerHTML;
	// 替换页面内容
	window.document.body.innerHTML = htmlStr;
	// 全局打印
	window.print();
	// 还原页面内容
	window.document.body.innerHTML = bodyHtml;
}
