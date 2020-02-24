import axiosins from './request'
export function getOrderlist(data){
    return  axiosins.get('orders',{
        params:data
    })
}

export function getProgress(){
    return axiosins.get('/kuaidi/1106975712662')
}