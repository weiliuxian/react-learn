**属性**

1. datas: 一个数组，数组的每一项是一个对象，对应一个多选框
    1. 对象具有value和text属性
    2. value: 多选框的值
    3. text；多选框的文本

例如：
```js
datas = [
    {value: 'football',text: '足球'},
    {value: 'basetball',text: '篮球'},
    {value: 'movie',text: '电影'},
    {value: 'music',text: '音乐'},
    {value: 'other',text: '其他'}
]
```

2. name：每一个多选框的那么属性值

3. chooseDatas: 数组，表示当前选中的value

4. onChange：当选中项发生改变时的事件