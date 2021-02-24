import {pathToRegexp} from 'path-to-regexp'


/**
 * 得到匹配结果,macth对象
 * @param {*} path 路径规则
 * @param {*} options 相关配置, 该配置是一个对象，该对象中，可以出现：exact、sensitive、strict
 */
export default function matchPath(path,options){
    const pathname = window.location.pathname
    const keys = [] // 保存路径规则中关键字
    const regExp = pathToRegexp(path, keys, getOptions(options))
    const result = regExp.exec(pathname)   //匹配url地址
    // 没有匹配
    if(!result){
        return null
    }
    // 匹配了
    let groups = Array.from(result)
    groups = groups.slice(1)
    const params = getParams(groups,keys)

    return {
        isExact: pathname === result[0],
        params,
        path,
        url: result[0]
        
    }
}


/**
 * 将传入的react-router配置，转换为path-to-regexg的配置
 * @param {*} options 
 */
function getOptions(options){
    const defaultOptions = {
        exact: false,
        sensitive: false,
        strict: false
    }
    const opts = {...defaultOptions, ...options}
    return {
        sensitive: opts.sensitive,
        strict: opts.strict,
        end: opts.exact
    }
}

/**
 * 根据匹配的分组结果，得到一个params对象
 * @param {*} groups 
 * @param {*} keys 
 */
function getParams(groups,keys){
    const obj = {}
    for (let i = 0; i < groups.length; i++) {
        const value = groups[i]  
        const name = keys[i].name
        obj[name] = value      
    }
    return obj
}

// console.log(matchPath('/news/:id?'))