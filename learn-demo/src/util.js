export function getRandom(min,max){
    return Math.floor(Math.random()*(max + 1 -min) + min)  //加 1 能取到最大值
}