import axiosins from './request'

// 商品管理  有关数据请求 函数

//商品 分类界面 获取所有的分类列表
export function getCatelist(query) {
   return axiosins.get('categories', { params: query })
}
//添加 分类时 获取 所有的父级(1级2级) 分类
export function getParentCate() {
   return axiosins.get('categories', {
      params: {
         type: 2
      }
   })
}

export function addCate(newCate) {
   return axiosins.post('categories', newCate);
}

//根据 id 查询 分类 
export function getCateByid(id) {
   console.log(id);

   return axiosins.get('categories/' + id);
}

//提交 分类的编辑

export function uploadEdit(id, cat_name) {
   return axiosins.put('categories/' + id, { cat_name })
}

//删除 分类
export function deleteCate(id) {
   return axiosins.delete('categories/' + id);
}

//获取 所有 层级的分类 
export function getAllLevelCate() {
   return axiosins.get('categories', {
      params: {
         type: 3
      }
   })
}




// Pramas 组件 获取所有的  参数/动态/静态
export function getPramas(id, sel) {
   return axiosins.get(`categories/${id}/attributes`, {
      params: {
         sel
      }
   })
}

//提交 参数的添加
export function uploadAddParam(id, data) {
   return axiosins.post(`categories/${id}/attributes`, data)

}
//根据id 查询 参数数据
export function getParamsById(cat_id, attr_id, attr_sel) {
   
   return axiosins.get(`categories/${cat_id}/attributes/${attr_id}`, {
      attr_sel
   })
}

//提交 修改的参数
export function uploadParamEdit(cat_id,attr_id,data)
{

   console.log(data);
   
 return axiosins.put(`categories/${cat_id}/attributes/${attr_id}`,data)
}

//删除 参数
export function deleteParam(cat_id,attr_id)
{
   return axiosins.delete(`categories/${cat_id}/attributes/${attr_id}`);
}


// 商品 列表 界面 用到的  请求函数
export function getGoodslist(data){
   return axiosins.get('goods',{
      params:data
   })
}

//删除 商品
export function removeGood(id)
{
   return axiosins.delete(`goods/${id}`);
}


//添加 商品
export function addGood(goodinfo){
   return axiosins.post('goods',goodinfo)
}