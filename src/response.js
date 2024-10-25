export default function (xhr) {
  let arr = xhr.getAllResponseHeaders().split("\r\n");
  let headers = {};
  arr.forEach((str) => {
    if (!str) {
      return;
    }
    let [name, val] = str.split(": ");
    headers[name] = val;
  });

  return {
    ok: true,
    status: xhr.status,
    msg: "ok",
    data: xhr.response,
    xhr: xhr,
    headers: headers,
  };
}
