import { transpileModule, CompilerOptions } from 'typescript'
import { extname, resolve } from 'path'
import debug from 'debug'
import { JsTranspiler, requireSync } from 'src-to-module'

const log = debug('src-to-module:ts')

let optionsFile: string|undefined = resolve(__dirname, '..', 'tsconfig.json')
let options: CompilerOptions|undefined

export function setCompilerOptions(optionsOrFile: CompilerOptions|string) {
  if (typeof optionsOrFile === 'string') {
    optionsFile = optionsOrFile
    options = undefined
  } else {
    options = optionsOrFile
    optionsFile = undefined
  }
}

export class TsTranspiler extends JsTranspiler {
  public check(path: string): boolean {
    return extname(path).toLocaleLowerCase() === '.ts'
  }

  public transpile(path: string, code: string): string {
    const start = Date.now()

    let compilerOptions: CompilerOptions|undefined
    try {
      compilerOptions = options || requireSync<any>(optionsFile as string).compilerOptions
    } catch (e) {
      // do nothing
    }
    if (!compilerOptions) throw new Error('Missing compiler options for TypeScript')

    try {
      return transpileModule(code, { compilerOptions }).outputText
    } finally {
      log('transpile "%s" elapsed: %d ms', path, Date.now() - start)
    }
  }
}
