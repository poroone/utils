

/**
 * 求两个数组的交集
 * @param {Array} arr1 第一个数组
 * @param {Array} arr2 第二个数组
 * @returns {Array} 交集数组
 */

const ArrayIntersection = (arr1, arr2) => {
  if (arr1.length === 0 || arr2.length === 0) return [];

  // 将较长的数组转换为Set以优化查找性能
  const setLonger = new Set(arr1.length > arr2.length ? arr1 : arr2);
  const shorterArray = arr1.length > arr2.length ? arr2 : arr1;

  // 使用Set的has方法替代includes进行查找，提高查找效率
  return shorterArray.filter((value) => setLonger.has(value));
};

/**
 *
 * @param {*} arr 接收一个数组
 * @returns 返回去重后的数组
 */
const uniqueArray  = (arr) => {
  return [...new Set(arr)];
};

/**
 *
 * @param {*} el dom元素
 * @param {*} className 需要切换的class类名
 */
const toggleClass  = (el, className) => {
  el.classList.toggle(className);
};


/**
 * 获取文件名的后缀
 *
 * @param {string} str 带有后缀的文件名
 * @returns {string} 返回文件名后缀，若无后缀则返回空字符串
 */
const fullSuffix = (str) => {
	if (typeof str !== 'string') {
	  // 如果传入的参数不是字符串，返回空字符串
	  return '';
	}
	const lastIndex = str.lastIndexOf(".");
	if (lastIndex === -1) {
	  return "";
	}
	return str.slice(lastIndex + 1);
  };
/**
 * 标记未读数量，大于99显示99+
 * num 未读数量
 */
const tabBarBadge = (num) => {
  if (num) {
    if (num > 99) {
      uni.setTabBarBadge({
        index: 2,
        text: "99+",
      });
    } else {
      uni.setTabBarBadge({
        index: 2,
        text: "" + num,
      });
    }
  } else {
    uni.removeTabBarBadge({
      index: 2,
    });
  }
};

/**
 * 时间格式换算
 * timestamp 时间戳，单位（秒）
 */
const dateFormat = (timestamp) => {
  timestamp = timestamp * 1000;
  let nowDate = new Date();
  // 当日凌晨时间格式
  let nowDay = nowDate.toLocaleDateString() + " 00:00:00";
  // 当日凌晨
  let nowDayTimestamp = new Date(nowDay);
  // 昨日凌晨
  let yesterday = nowDayTimestamp - 86400000;
  // 当年第一天
  let nowYear = nowDate.getFullYear() + "/01/01 00:00:00";
  let nowYearTimestamp = new Date(nowYear).getTime();
  let date = new Date(timestamp);

  let y = date.getFullYear();
  y = y < 10 ? "0" + y : y;
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  if (timestamp >= nowDayTimestamp) {
    // 当日
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let i = date.getMinutes();
    i = i < 10 ? "0" + i : i;
    return h + ":" + i;
  } else if (timestamp < nowDayTimestamp && timestamp >= yesterday) {
    // 昨日
    return "昨日";
  } else if (timestamp < yesterday && timestamp >= nowYearTimestamp) {
    // 当年
    let m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    return m + "-" + d;
  } else {
    // 更早
    let y = date.getFullYear();
    y = y < 10 ? "0" + y : y;
    let m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    return y + "-" + m + "-" + d;
  }
};

/**
 * 文件单位换算
 * size 文件大小，单位（Byte）
 */
const fileSizeCompute = (size) => {
  let newSize = "";
  if (size >= 1024 * 1024) {
    newSize = Number(size / 1024 / 1024).toFixed(1) + "MB";
  } else if (size >= 1024) {
    newSize = Number(size / 1024).toFixed(1) + "KB";
  } else {
    newSize = Number(size).toFixed(1) + "B";
  }
  return newSize;
};

/**
 * 转换时长时间格式，当前最大支持到小时
 * timestamp 时间戳，单位（秒）
 */
const longTimeFormat = (timestamp) => {
  let str = "";
  // 时
  let h = Math.floor(timestamp / 60 / 60);
  if (h > 0) {
    str += (h < 10 ? "0" + h : h) + ":";
  }
  // 分
  let i = Math.floor((timestamp - h * 60 * 60) / 60);
  str += (i < 10 ? "0" + i : i) + ":";
  // 秒
  let s = Math.floor(timestamp - h * 60 * 60 - i * 60);
  str += s < 10 ? "0" + s : s;
  return str;
};

/**
 * 计算打卡坐标偏移距离
 * lat1 当前所在经度
 * lon1 当前所在纬度
 * lat2 电子围栏经度
 * lon2 电子围栏纬度
 */
const getDistance = (lat1, lon1, lat2, lon2) => {
  // 将角度换算为弧度
  let radLat1 = (lat1 * Math.PI) / 180;
  // 将角度换算为弧度
  let radLat2 = (lat2 * Math.PI) / 180;
  let a = radLat1 - radLat2;
  let b = (lon1 * Math.PI) / 180 - (lon2 * Math.PI) / 180;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  // 取WGS84标准参考椭球中的地球长半径（单位：m）
  s = s * 6378137.0;
  // 两点之间距离（保留四位）
  s = Math.round(s * 10000) / 10000;
  // 单位：m
  return s;
};

/**
 * 获取时间格式
 * format 需要转换成的时间格式 yyyy-MMM-dd hh:mm:ss
 * time 各种格式时间
 */
const timeFormat = (format = "", time = "") => {
  // 获取时间格式数据
  let date = new Date();
  if (time) {
    if (typeof time == "number") {
      date = new Date(time);
    } else {
      date = new Date(time.replace(/-/g, "/"));
    }
  }
  let yyyy = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? "0" + MM : MM.toString();
  let dd = date.getDate();
  dd = dd < 10 ? "0" + dd : dd.toString();
  let hh = date.getHours();
  hh = hh < 10 ? "0" + hh : hh.toString();
  let mm = date.getMinutes();
  mm = mm < 10 ? "0" + mm : mm.toString();
  let ss = date.getSeconds();
  ss = ss < 10 ? "0" + ss : ss.toString();
  // 替换年
  format = format.replace("yyyy", yyyy);
  // 替换月
  format = format.replace("MM", MM);
  // 替换日
  format = format.replace("dd", dd);
  // 替换时
  format = format.replace("hh", hh);
  // 替换分
  format = format.replace("mm", mm);
  // 替换秒
  format = format.replace("ss", ss);
  return format;
};

export default {
  tabBarBadge,
  dateFormat,
  fileSizeCompute,
  longTimeFormat,
  getDistance,
  timeFormat,
  fullSuffix,
  toggleClass,
  ArrayIntersection,
  uniqueArray
};
