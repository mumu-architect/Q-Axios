import Axios from './axios'

// let axios1 = Axios.create({
//     baseUrl:'http://www.zhinengshe.com',
//     headers:{
//         common:{
//             a:12
//         }
//     }
// });
// let axios2 = Axios.create({
//     baseUrl:'http://api.zhinengshe.com'
// });
// //axios1.default.baseUrl='aaa'
// console.log(axios1.default);
// console.log(axios2.default);

// let res =Axios.get('data/1.json',{
//     //baseUrl:'http://api.zhinengshe.com'
//     headers:{
//         'a':55,
//     }
// });
// console.log(res);
//Axios.get('1.json',{headers:{a:12}});



//2
// let a= Axios('data/1.json', {});
// let b= Axios('data/2.json', {});
// if(a===b){
//     console.log(111111)
// }else{
//     console.log(222)
// }

//3.案例

//3.拦截器
// Axios.interceptors.request.use(function (config) {
//     config.headers.i=999999;
//     return config;
// });
// Axios.interceptors.response.use(function (res) {
//     res.aa=999;
//     return res;
// });
(async()=>{
    Axios('data/1.json', {
        headers: {
            'aa': 5
        },
        transformRequest(config) {
            config.headers.c = 55;
            return config;
        },
        transformResponse(res) {
            return res;
        }
    }).then(res=>{
        console.log(res);
    }).catch(error=>{
        console.log(error);
    });
    
})();

(async()=>{
    Axios('data/2.json', {
        headers: {
            'aa': 6
        },
        transformRequest(config) {
            config.headers.c = 66;
            return config;
        },
        transformResponse(res) {
            return res;
        }
    }).then(res=>{
        console.log(res);
    }).catch(error=>{
        console.log(error);
    });

})();
