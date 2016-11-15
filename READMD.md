# fisd-parser-html-theme

使其html引入的less\scss支持theme配置， 适合网站根据参数有多套皮肤的应用；


## 使用

- 添加fis配置
```JavaScript

fis.match('**.{html,tpl}', {
    parser: fis.plugin('html-theme')
});

```


- html引入模板样式

```html

{%if http.get('theme')==1008%}
<link rel="stylesheet" type="text/css" href="__theme(../../css/home/index_test.less, 1008)"/>
{%elseif http.get('theme')==1010%}
<link rel="stylesheet" type="text/css" href="__theme(../../css/home/index_test.less, 1010)"/>
{%elseif http.get('theme')==1002%}
<link rel="stylesheet" type="text/css" href="__theme(../../css/home/index_test.less, 1002)"/>
{%else%}
<link rel="stylesheet" type="text/css" href="../../css/home/index_test.less"/>
{%endif%}

```

- 相关less文件为

```css

@theme: 1008;

@import "../common/@{theme}_config";

body,html{
  background: @focus-color;
}

```

theme 默认主题，编译后生成对应的主题样式


- 编译后变为

```html

{%if http.get('BusinessId')==1008%}
<link rel="stylesheet" type="text/css" href="//DOMAIN/static/css/home/index_test_1008_838cbf6.css"/>
{%elseif http.get('BusinessId')==1010%}
<link rel="stylesheet" type="text/css" href="//DOMAIN/static/css/home/index_test_1010_88767bb.css"/>
{%elseif http.get('BusinessId')==1002%}
<link rel="stylesheet" type="text/css" href="//DOMAIN/static/css/home/index_test_1002_43ee211.css"/>
{%else%}
<link rel="stylesheet" type="text/css" href="//DOMAIN/static/css/home/index_test_838cbf6.css"/>
{%endif%}

```


