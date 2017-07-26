# vue2imgClip
> 图片裁剪图片

## Installation
```shell
npm i vue2imgclip
```

## Usage
```javascript
import Vue from 'vue'
import vue2imgclip from 'vue2imgclip'

Vue.use(vue2imgclip)
```

### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| imgURL | 必选参数, 裁切的图片的url | string | — | — |
| confirmLabel | 可选参数, 确认按钮 | string | — | — |
| closeLabel | 可选参数, 取消按钮 | string | — | - |

### events
| 事件      | 说明          | 返回值      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| cripURL | 返回裁切成功的值 | base64和blob | — | — |
| closeClip | 取消裁切 | — | — | — |

# License
[MIT](https://opensource.org/licenses/MIT)
