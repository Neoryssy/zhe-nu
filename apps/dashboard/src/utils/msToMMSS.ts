import moment from 'moment'

export default (ms: number) => {
  const utc = moment.utc(ms)

  return utc.hours() > 0 ? utc.format('HH:mm:ss') : utc.format('mm:ss')
}
