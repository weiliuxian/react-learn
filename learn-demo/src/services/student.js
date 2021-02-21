
const appkey = 'demo13_1545210570249';

/**
 * 获取所有学生
 */
export async function getAllStudents(){
    return await fetch(`/api/student/findAll?appkey=${appkey}`)
        .then(res => res.json()).then(res => res.data);
}

/**
 * 获取分页学生
 */
export async function getStudents(page=1,limit=10){
    return await fetch(`/api/student/findByPage?appkey=${appkey}&page=${page}&size=${limit}`)
        .then(res => res.json()).then(res => res.data);
}

export async function searchStudents({page = 1,limit = 10,key = "",sex = -1} = {}){
    if(key){
         const resp = await fetch(`/api/student/searchStudent?appkey=${appkey}&page=${page}&size=${limit}&search=${key}&sex=${sex}`)
        .then(res => res.json()).then(res => res.data);
        resp.datas = resp.searchList
        delete resp.searchList
        return resp
    }
    const resp =  await getStudents(page,limit)
    resp.datas = resp.findByPage
    delete resp.findByPage
    return resp

}