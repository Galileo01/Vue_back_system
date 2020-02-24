import axiosins from './request'
export function getEchartData(){
    return axiosins.get('reports/type/1');
}