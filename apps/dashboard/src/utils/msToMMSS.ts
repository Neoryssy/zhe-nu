import moment from 'moment'

export default (ms: number) => {
  return moment.utc(ms).format('mm:ss')
}
