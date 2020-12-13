import 'src-to-module'

export default (await global.requireAsync<any>('./common')).default
