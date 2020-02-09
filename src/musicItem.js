const strToSec = (duration) => arrayToSec(strToArray(duration).reverse())
const strToArray = (duration) => duration.split(':').map(v => Number(v))
const secToArray = (duration) => {
  const result = [duration]
  let go = true
  do {
    const temp = Math.floor(result[result.length - 1] / 60)
    if (temp === 0) go = false
    result[result.length - 1] -= temp * 60
    result.push(temp)
  } while (go)

  return result.reverse().splice(1)
}

const arrayToSec = (durations) => {
  let result = 0
  let gap = 1

  for (const i of durations) {
    result += gap * i
    gap *= 60
  }

  return result
}

class MusicItem {
  constructor (obj) {
    this.link = obj.link
    this.title = obj.title
    this.thumbnail = obj.thumbnail
    this.views = obj.views
    this.strDuration = obj.duration
    this.secDuration = strToSec(obj.duration)
    this.secToArray = secToArray
    this.arrayToSec = arrayToSec
    this.author = {
      name: obj.author.name,
      link: obj.author.ref
    }
  }
}

module.exports = MusicItem
