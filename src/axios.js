import defaultOptions from "./default";
import request from "./request";
import { assert, merge, clone } from "./common";
const urllib = require("url");
import createResponse from "./response";
import createError from "./error";
import Interceptors from "./interceptors";

/**
 * 核心主文件入口
 * Axios类
 */
class Axios {
  constructor() {
    let _this = this;
    this.interceptors = {
      request: new Interceptors(),
      response: new Interceptors(),
    };
    return new Proxy(request, {
      get(data, name) {
        return _this[name];
      },
      set(data, name, val) {
        _this[name] = val;
        return true;
      },
      apply(fn, thisArg, args) {
        //console.log(fn,thisArg,args);
        let options = _this._preprocessArgs(undefined, args);
        if (!options) {
          if (args.length == 2) {
            assert(typeof args[0] == "string" && "args[0] must is string");
            assert(
              typeof args[1] == "object" &&
                args[1] &&
                args[1].constructor == Object,
              "args[1] must is json"
            );

            options = {
              ...args[1],
              url: args[0],
            };
          } else {
            assert(false, "invaild argments ");
          }
        }

        return _this.request(options);
      },
    });
  }

  /**
   * 请求参数统一处理，
   * 1.合并全局统一变量
   * 2.检测参数是否正确
   * @param {*} options
   */
  request(options) {
    let tempHeaders = this.default.headers;
    delete this.default.headers;
    let result = clone(this.default);

    //console.log(options.headers.common,this.default.headers.common);

    // merge(result,this.default);
    merge(result, options);
    this.default.headers = tempHeaders;

    options = result;
    // console.log(options.headers.common,this.default.headers.common);
    //1.合并头
    //this.default.headers.common < this.default.headers.get < options
    //console.log(options);
    let headers = {};
    merge(headers, this.default.headers.common);
    merge(headers, this.default.headers[options.method.toLowerCase()]);
    merge(headers, options.headers);
    options.headers = headers;

    //2.检测校验options
    checkOptions(options);

    //3.baseUrl合并url
    options.url = urllib.resolve(options.baseUrl, options.url);
    delete options.baseUrl;

    //4.正式调用request()
    const { transformRequest, transformResponse } = options;
    delete options.transformRequest;
    delete options.transformResponse;

    //转换options
    options = transformRequest(options);
    checkOptions(options);

    console.log(options);
    return new Promise((resolve, reject) => {
      //拦截器
      let list = this.interceptors.request.list();
      list.forEach((fn) => {
        options = fn(options);
        checkOptions(options);
      });

      //包装结果/错误
      request(options).then(
        (xhr) => {
          let res = createResponse(xhr);
          res.data = transformResponse(res.data);

          //执行拦截器
          let list = this.interceptors.response.list();
          list.forEach((fn) => {
            res = fn(res);
          });

          resolve(res);
        },
        (xhr) => {
          let error = createError(xhr);
          reject(error);
        }
      );
    });
  }

  /**
   * 处理请求参数方法
   * @param {*} method
   * @param {*} args
   * @returns
   */
  _preprocessArgs(method, args) {
    let options;
    if (args.length == 1 && typeof args[0] == "string") {
      options = { method: "get", url: args[0] };
    } else if (args.length == 1 && args[0].constructor == Object) {
      options = {
        ...args[0],
        method,
      };
    } else {
      return undefined;
    }
    return options;
  }

  /**
   * 查询方法
   * @param  {...any} args
   * @returns
   */
  get(...args) {
    let options = this._preprocessArgs("get", args);
    if (!options) {
      if (args.length == 2) {
        assert(typeof args[0] == "string" && "args[0] must is string");
        assert(
          typeof args[1] == "object" &&
            args[1] &&
            args[1].constructor == Object,
          "args[1] must is json"
        );

        options = {
          ...args[1],
          url: args[0],
          method: "get",
        };
      } else {
        assert(false, "invaild argments ");
      }
    }
    return this.request(options);
  }
  /**
   * 提交方法
   * @param  {...any} args
   * @returns
   */
  post(...args) {
    alert("post");
    let options = this._preprocessArgs("post", args);
    if (!options) {
      if ((args.length = 2)) {
        assert(typeof args[0] == "string" && "args[0] must is string");
        options = {
          data: args[1],
          url: args[0],
          method: "post",
        };
      } else if ((args.length = 3)) {
        assert(
          typeof args[1] == "object" &&
            args[1] &&
            args[1].constructor == Object,
          "args[1] must is json"
        );
        options = {
          ...args[2],
          data: args[1],
          url: args[0],
          method: "post",
        };
      } else {
        assert(false, "invaild argments ");
      }
    }
    return this.request(options);
  }
  /**
   * 删除方法
   * @param  {...any} args
   * @returns
   */
  delete(...args) {
    alert("delete");
    let options = this._preprocessArgs("delete", args);
    if (!options) {
      if (args.length == 2) {
        assert(typeof args[0] == "string" && "args[0] must is string");
        assert(
          typeof args[1] == "object" &&
            args[1] &&
            args[1].constructor == Object,
          "args[1] must is json"
        );

        options = {
          ...args[1],
          url: args[0],
          method: "delete",
        };
      } else {
        assert(false, "invaild argments ");
      }
    }
    return this.request(options);
  }
  /**
   * 修改方法
   * @param  {...any} args
   * @returns
   */
  put(...args) {
    alert("put");
    let options = this._preprocessArgs("put", args);
    if (!options) {
      if ((args.length = 2)) {
        assert(typeof args[0] == "string" && "args[0] must is string");
        options = {
          data: args[1],
          url: args[0],
          method: "post",
        };
      } else if ((args.length = 3)) {
        assert(
          typeof args[1] == "object" &&
            args[1] &&
            args[1].constructor == Object,
          "args[1] must is json"
        );
        options = {
          ...args[2],
          data: args[1],
          url: args[0],
          method: "post",
        };
      } else {
        assert(false, "invaild argments ");
      }
    }
    return this.request(options);
  }
}

//创建对象
Axios.create = Axios.prototype.create = function (options) {
  let axios = new Axios();

  //default
  let res = clone(defaultOptions);
  merge(res, options);
  axios.default = res;
  return axios;
};

/**
 * 检测参数是否正确
 * @param {*} options
 */
function checkOptions(options) {
  //2.检测参数是否正确
  assert(options, "options is required");
  assert(options.method, "no method");
  assert(typeof options.method == "string", "method must be string");
  assert(options.url, "no url");
  assert(typeof options.url == "string", "url must be string");
}
export default Axios.create();
