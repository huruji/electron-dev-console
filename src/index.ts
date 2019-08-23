import { BrowserWindow, ipcRenderer, IpcRendererEvent} from 'electron'

const SIGNAL = 'ELECTRON_DEV_CONSOLE'

interface MainInter {
  window: null | BrowserWindow
  info(msg:string):void
  success(msg:string):void
  warn(msg:string):void
  error(msg:string):void
  init(w:BrowserWindow):void
}
export const main:MainInter = {
  window: null,
  init(window: BrowserWindow) {
    main.window = window
  },
  info(msg:string) {
    main.window!.webContents.send(SIGNAL, 'info', msg)
  },
  success(msg:string) {
    main.window!.webContents.send(SIGNAL, 'success', msg)
  },
  warn(msg:string) {
    main.window!.webContents.send(SIGNAL, 'warn', msg)
  },
  error(msg:string) {
    main.window!.webContents.send(SIGNAL, 'error', msg)
  },
}

export const renderer:{init():void }= {
  init() {
    const prefix = '%c electron-dev-console'

    const successPrefixStyle = 'color: #fff;background-color: #64f898; font-size: 16px;'
    const successMsgStyle = 'color: #64f898; font-size: 14px;'

    const warnPrefixStyle = 'color: #fff;background-color: #f4faa7; font-size: 16px'
    const warnMsgStyle = 'color: #f4faa7; font-size: 14px'

    const infoPrefixStyle = 'color: #fff;background-color: #62ceff; font-size: 16px'
    const infoMsgStyle = 'color: #62ceff; font-size: 14px'

    const errorPrefixStyle = 'color: #fff;background-color: #ff6661; font-size: 16px'
    const errorMsgStyle = 'color: #ff6661; font-size: 14px'

    ipcRenderer.on(SIGNAL, (e: IpcRendererEvent,type:string, msg:string) => {
      switch(type) {
        case 'success': {
          console.log(prefix, successPrefixStyle)
          console.log(`%c ${msg}`, successMsgStyle)
          break
        }
        case 'warn': {
          console.log(prefix, warnPrefixStyle)
          console.log(`%c ${msg}`, warnMsgStyle)
          break
        }
        case 'info': {
          console.log(prefix, infoPrefixStyle)
          console.log(`%c ${msg}`, infoMsgStyle)
          break
        }
        case 'error': {
          console.log(prefix, errorPrefixStyle)
          console.log(`%c ${msg}`, errorMsgStyle)
          break
        }
        default:{
          console.log(prefix, infoPrefixStyle)
          console.log(`%c ${msg}`, infoMsgStyle)
        }
      }
    })
  }
}
