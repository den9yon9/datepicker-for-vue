# datepicker-for-vue

> A Datepicker component for Vue

## Usage
``` bash
# install datepicker-for-vue from npm
npm install datepicker-for-vue --save
```

``` html
    <Datepicker v-model="value" :disable="disable" notice1="notice1" notice2="notice2"></Datepicker>
```

``` javascript
    import Datepicker from 'datepicker-for-vue'
    export default {
        data(){
            return {
                // 可以给value数组两个元素，用来选择两个日期，设置notice1和notice2给这两个日期提示语
                value: ['2018-04-05'],
                disable: {
                    from: '2018-04-28',
                    to: '2018-04-01'
                },
                notice1: 'come', 
                notice2: 'go',
            }
        }
    }
```



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
