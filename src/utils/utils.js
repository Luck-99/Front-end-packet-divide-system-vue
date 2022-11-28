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
