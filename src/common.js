/**
 * 错误提示
 * @param {*} exp
 * @param {*} msg
 */
export function assert(exp, msg = "assert faild") {
  if (!exp) {
    throw new Error(msg);
  }
}

/**
 * 递归json对象合并
 * @param {*} dest
 * @param {*} src
 */
export function merge(dest, src) {
  for (let name in src) {
    if (typeof src[name] == "object") {
      if (!dest[name]) {
        dest[name] = {};
      }
      merge(dest[name], src[name]);
    } else {
      if (dest[name] === undefined) {
        dest[name] = src[name];
      }
    }
  }
}

/**
 * 克隆对象
 * @param {*} obj
 * @returns
 */
export function clone(obj) {
  //return JSON.parse(JSON.stringify(obj));

  switch (typeof obj) {
    case "object":
      let tempObj;
      if (obj instanceof Array) {
        tempObj = [];
        for (let i = 0; i < obj.length; i++) {
          tempObj[i] = clone(obj[i]);
        }
      } else {
        tempObj = {};
        for (let key in obj) {
          tempObj[key] = clone(obj[key]);
        }
      }
      return tempObj;
    // case "function":
    //     return obj;
    default:
      return obj;
  }
}
