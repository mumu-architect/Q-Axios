export default function (xhr){
    return {
        'ok':false,
        'status':xhr.status,
        'msg':'error',
        'data':xhr.response
    };
}