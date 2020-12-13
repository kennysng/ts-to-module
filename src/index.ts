import { registerTranspiler } from 'src-to-module'
import { register } from 'ts-node'
import { TsTranspiler } from './transpiler'

register()
registerTranspiler(new TsTranspiler())
export { setCompilerOptions, TsTranspiler } from './transpiler'
