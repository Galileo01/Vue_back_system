//自定义的 表单 验证规则  

export const emailCheck = (rule, value, callback) => {
    console.log(value);
    
    //验证 邮箱的 正则
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(value)) return callback();
    callback(new Error("请输入合法邮箱"));
};

export const mobileCheck = (rule, value, callback) => {
    //验证 手机号码的 正则
    const reg = /^1(3|4|5|7|8)\d{9}$/;

    if (reg.test(value)) return callback();
    callback(new Error("请输入合法电话"));
};


// 时间戳 格式化
export function formatDate(str, fmt) {
  const date= new Date(str);
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };

//对象 深度 克隆
export function clone(Tar={}, Ori) {
  const toStr = Object.prototype.toString; // 使用 toString 方法 返回表示对象的字符串
  const sOA = "[object Array]";
  for (let prop in Ori) {
     if (Ori.hasOwnProperty(prop)) {//不克隆 不是自己本身的属性（继承自原型链）

        if (Ori[prop] != null && typeof (Ori[prop]) == "object") {
           if (toStr.call(Ori[prop]) == sOA)//该属性是一个数组
           {
              Tar[prop] = [];
           }
           else {
              Tar[prop] = {};
           }
           clone(Tar[prop], Ori[prop]);//递归
        }
        else {
           Tar[prop] = Ori[prop];
        }
     }
  }
  return Tar;
}