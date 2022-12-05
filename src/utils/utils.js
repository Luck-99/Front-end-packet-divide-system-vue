/**
 * 用于获取时间差
 * @param {number} time 时间
 * @returns 时间差
 */
export const getTimeInterval = (time) => {
  const now = new Date().getTime()
  const timeDifference = (now - time) / 1000
  const year =
    Math.floor(timeDifference / (60 * 60 * 24 * 30 * 365)) > 0
      ? `${Math.floor(timeDifference / (60 * 60 * 24 * 30 * 365))} 年前`
      : null
  const month =
    Math.floor(timeDifference / (60 * 60 * 24 * 30)) > 0
      ? `${Math.floor(timeDifference / (60 * 60 * 24 * 30))} 个月前`
      : null
  const day =
    Math.floor(timeDifference / (60 * 60 * 24)) > 0
      ? `${Math.floor(timeDifference / (60 * 60 * 24))} 天前`
      : null
  const hour =
    Math.floor(timeDifference / (60 * 60)) > 0
      ? `${Math.floor(timeDifference / (60 * 60))} 小时前`
      : null
  const min =
    Math.floor(timeDifference / 60) > 0
      ? `${Math.floor(timeDifference / 60)} 分钟前`
      : null
  const second = `${Math.floor(timeDifference)} 秒前`
  return year ?? month ?? day ?? hour ?? min ?? second
}

/**
 * 用于下载文件
 * @param {*} file 二进制文件流
 * @param {*} fileName 文件名称
 */
export const downLoadFile = (file, fileName) => {
  const blob = new Blob([file])
  const url = window.URL.createObjectURL(blob) // 创建一个临时的url指向blob对象
  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
