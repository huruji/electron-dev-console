# electron-dev-console

一个用于在渲染进程查看主进程输出的 electron 开发调试工具

![screenshot](./screenshot.jpg)

## how to use

```bash
npm i -S electron-dev-console
```

in renderer process

```js
import { renderer } from 'electron-dev-console'

renderer.init()
```

in main process

```js
import { main } from 'electron-dev-console'
const win = new BrowserWindow({
  // your config
})

main.init(win)

main.success('success message')
main.info('info message')
main.warn('warn message')
main.error('error message')
```
