  function leftPad(arg) {
    arg = arg.toString()
    return arg[1] ? arg : '0' + arg
  }

  function timeFormat(date, format) {
    if (date instanceof Date) {
      let year = date.getFullYear()
      let month = leftPad(date.getMonth() + 1)
      let day = leftPad(date.getDate())

      let hours = leftPad(date.getHours())
      let minute = leftPad(date.getMinutes())
      let second = leftPad(date.getSeconds())

      if (format == 'date' || !format) {
        // xxxx-xx-xx
        return `${year}-${month}-${day}`
      } else if (format == 'time') {
        // xx:xx:xx
        return `${hours}:${minute}:${second}`
      } else if (format == 'full') {
        // xxxx-xx-xx xx:xx:xx
        return `${year}-${month}-${day} ${hours}:${minute}:${second}`
      }
    } else {
      return ''
    }

  }

  function ms2Hour(ms) {
    let seconds = parseInt(ms / 1000)
    let minutes = parseInt(seconds / 60)
    let hours = parseInt(minutes / 60)

    let second = (seconds % 60 + '')[1] ? seconds % 60 : '0' + seconds % 60
    let minute = (minutes % 60 + '')[1] ? minutes % 60 : '0' + minutes % 60

    return `${hours}:${minute}:${second}`
  }

  function string2Date(date) {
    return new Date(date)
  }

  export { timeFormat, leftPad, ms2Hour }
