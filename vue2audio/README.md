# vue2audio
> 后台音频播放组件

## Installation
```shell
npm i vue2audio
```

## Usage
```javascript
import Vue from 'vue'
import vue2audio from 'vue2audio'

Vue.component('vue2audio', vue2audio)
```

### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| url | 必选参数, 音频的地址 | string | — | — |
| autoPlay | 可选参数, 自动播放 | Boolean | — | false |

### events
| 事件      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| audio_err | 音频播放错误 | -- | — | — |
| closeAudio | 关闭按钮 | -- | — | — |

# License
[MIT](https://opensource.org/licenses/MIT)
