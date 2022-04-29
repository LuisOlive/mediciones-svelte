export default function meta(func: Function & { meta?: object }, callback: (data: object) => void) {
  func.meta = {
    save: (data: object) => callback(data)
  }
}
