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
| maxList | 可选参数, 最大上传数量 | number | — | — |
| checkType | 可选参数, 上传类型 | string | audio,image或者audio/mp3等 | - |
| fileSizeLimit | 可选参数, 上传文件大小限制 | number | - | 默认单位（M） |

# License
[MIT](https://opensource.org/licenses/MIT)
