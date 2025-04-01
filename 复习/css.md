### css 引入方式

1. 内联样式 style
2. 内部样式表 <style>
3. 外部样式表 <link rel="stylesheet" href="style.css">

### css 的书写规范

1. 选择器和属性之间用空格隔开
2. 选择器和大括号之间用空格隔开
3. 属性和属性值之间用冒号隔开
4. 属性和属性值之间用空格隔开
5. 属性和属性之间用分号隔开
6. 注释用 /\* \*/ 包裹

#### 示例

```css
/* 这是一个注释 */
body {
  background-color: #f5f5f5;
  color: #333;
  font-size: 16px;
}
```

### css 优先级

1. !important
2. 内联样式
3. id 选择器
4. 类选择器、伪类选择器和属性选择器
5. 元素选择器和伪元素选择器
6. 通配符选择器
7. 继承的样式
8. 浏览器默认样式

### 选择器

1. 元素选择器 如：body、div、p、a 等
2. 类选择器 如：.class、.header、.footer 等
3. id 选择器 如：#id、#header、#footer 等
4. 属性选择器 如：[type="text"]、[href="https://www.baidu.com"] 等
5. 伪类选择器 如：:hover、:active、:focus 等
6. 伪元素选择器 如：::before、::after 等
7. 组合选择器 如：div p、div.class、div#id 等
8. 通用选择器 如：\*

### 盒子模型

1. 内容区 content
2. 内边距 padding
3. 边框 border
4. 外边距 margin

box-sizing: content-box; 内容区
box-sizing: border-box; 边框

### 盒子模型的属性

1. width
2. height
3. padding
4. border
5. margin

### 文本属性

1. color 背景色
2. font-size 字体大小
3. font-family 字体
4. font-weight 字体粗细
5. text-align 文本对齐方式
6. line-height 行高
7. text-indent 文本缩进
8. text-decoration 文本装饰
9. text-transform 文本转换
10. letter-spacing 字母间距
11. word-spacing 单词间距
12. white-space 空白符处理

### 背景属性

1. background-color 背景色
2. background-image 背景图片
3. background-repeat 背景图片重复方式
4. background-position 背景图片位置
5. background-size 背景图片大小
6. background-attachment 背景图片固定方式
7. background 背景属性

### 边框属性

1. border-width 边框宽度
2. border-style 边框样式
3. border-color 边框颜色
4. border-radius 边框圆角
5. border 边框属性

### 溢出属性

1. overflow 溢出处理
   1. visible 可见
   2. hidden 隐藏
   3. scroll 滚动
   4. auto 自动
2. overflow-x 水平溢出处理
3. overflow-y 垂直溢出处理
4. text-overflow 文本溢出处理

   1. clip 裁剪
   2. ellipsis 省略号

5. white-space 空白符处理
   1. normal 正常
   2. nowrap 不换行
   3. pre 保留空白符
   4. pre-wrap 保留空白符，换行
6. word-wrap 单词换行
   1. normal 不换行
   2. break-word 换行
   3. break-all 换行
7. word-break 单词断行
   1. normal 不换行
   2. break-all 换行
   3. keep-all 不换行

### 显示属性

1. display 显示方式
   1. block 块级元素
   2. inline 行内元素
   3. inline-block 行内块元素
   4. none 隐藏
2. visibility 可见性
   1. visible 可见
   2. hidden 隐藏
3. opacity 透明度
   1. 0 完全透明
   2. 1 完全不透明

### 浮动属性

1. float 浮动
2. clear 清除浮动
3. position 定位

### 定位属性

1. position 定位方式
   1. static 静态定位
   2. relative 相对定位
   3. absolute 绝对定位
   4. fixed 固定定位
   5. sticky 粘滞定位
2. top 顶部距离
3. right 右侧距离
4. bottom 底部距离
5. left 左侧距离
6. z-index 层叠顺序

### 阴影属性

1. box-shadow 盒子阴影
   box-shadow: 水平偏移 垂直偏移 模糊距离 阴影颜色;
2. text-shadow 文本阴影  
   text-shadow： 水平偏移 垂直偏移 模糊距离 阴影颜色;

### 裁剪

1. clip-path 裁剪路径

### 过度

1. transition-property 过渡属性
   1. all 所有
   2. width 宽度
   3. height 高度
2. transition-duration 过渡时间
3. transition-timing-function 过渡方式
   1. linear 线性
   2. ease ease-in ease-out ease-in-out
   3. cubic-bezier 贝塞尔曲线
      cubic-bezier(0.42, 0, 0.58, 1)
4. transition-delay 过渡延迟
   1. 0s 0ms 0s 0ms
5. transition 过渡属性  
   transition: property duration timing-function delay;

### 变换

1. transform 变换
   1. translate 平移
   2. rotate 旋转
   3. scale 缩放
   4. skew 倾斜
2. transform-origin 变换原点
3. transform-style 变换样式
   1. flat 平面
   2. preserve-3d 三维
4. transform 变换

### 列表属性

1. list-style-type 列表样式
2. list-style-position 列表样式位置
3. list-style-image 列表样式图片
4. list-style 列表属性

### 布局

1. flex 布局
2. grid 布局
3. float 布局
4. position 布局

### 动画属性

1. animation-name
2. animation-duration
3. animation-timing-function
4. animation-delay
5. animation-iteration-count
6. animation-direction
7. animation-fill-mode
8. animation-play-state
