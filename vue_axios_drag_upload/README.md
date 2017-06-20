# vue_axios_drag_upload
> 拖拽上传组件

## Installation
```shell
npm i vue_axios_drag_upload
```

## Usage
```javascript
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import MYupload from 'vue_axios_drag_upload'

Vue.use(VueAxios, axios)
Vue.component('my-upload', MYupload)
```

### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| action | 必选参数, 上传的地址 | string | — | — |
| maxList | 必选参数, 最大上传数量 | number | — | — |

# License
[MIT](https://opensource.org/licenses/MIT)
