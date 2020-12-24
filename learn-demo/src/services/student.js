
const appkey = 'demo13_1545210570249';

/**
 * 获取所有学生
 */
export async function getAllStudents(){
    return await fetch(`https://open.duyiedu.com/api/student/findAll?appkey=demo13_1545210570249&page=${appkey}`)
        .then(res => res.json()).then(res => res.data);
}