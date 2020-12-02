import React from 'react'
import './pager.css'

/**
 * 分页组件
 * 属性：
 * 1、current： 初始页码
 * 2、total： 总数据量
 * 3、limit: 每页条数
 * 4、panelNumber：数字页码最多显示多少个
 * 5、onPageChange: 页码改变事件
 * 
 */

export default function Pager(props) {
    const pageNumber = getPageNumber(props);
    if(pageNumber === 0){
        return null;
    }
    const min = getMinNumber(props);
    const max = getMaxNumber(min,pageNumber,props);
    const numbers = [];
    for(let i = min; i <= max; i++){
        numbers.push(<span className={props.current === i?'item active' : 'item'} onClick={() =>  toPage(i,props)} key={i}>{i}</span>)
    }
    return (
        <>
            <span
                onClick={() => toPage(1,props)}
                className={props.current === 1?'item disabled' : 'item'}
            >首页</span>
            <span
                onClick={() => toPage(props.current - 1 < 1 ? 1 : props.current - 1,props)}
                className={props.current === 1?'item disabled' : 'item'}
            >上一页</span>
            {/* 数字页码 */}
            { numbers }
            <span
                onClick={() => toPage(props.current + 1 >pageNumber ? pageNumber : props.current + 1,props)}
                className={props.current === pageNumber?'item disabled' : 'item'}
            >下一页</span>
            <span
                onClick={() => toPage(pageNumber,props)}
                className={props.current === pageNumber?'item disabled' : 'item'}
            >尾页</span>
            <span className="current">{props.current}</span>
            <span>/</span>
            <span>{pageNumber}</span>
        </>
    )
}

/**
 * 计算最大数字
 */
function getMaxNumber(min,pageNumber,props){
    var max = min + props.panelNumber - 1;
    if(max > pageNumber){
        max = pageNumber;
    }
    return max;
}
/**
 * 计算最小数字
 * @param {*} props 
 */
function getMinNumber(props){
   var min = props.current - Math.floor(props.panelNumber / 2);
   if(min < 1) {
       min = 1;
   }
   return min;
}

/**
 * 跳转指定页码
 * @param {*} target 目标页码
 * @param {*} props 所有属性
 */
function toPage(target,props){
    if(props.current === target){return;}
    props.onPageChange && props.onPageChange(target)
}
// 计算总页数
function getPageNumber(props){
    return Math.ceil(props.total / props.limit);
}
