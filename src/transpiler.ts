import { transpileModule, CompilerOptions } from 'typescript'
import { JsTranspiler, registerTranspiler } from 'src-to-module'
import { extname } from 'path'
import debug from 'debug'

const log = debug('src-to-module:ts')

let options: CompilerOptions

export function setCompilerOptions(options_: CompilerOptions) {
  options = options_
}

export class TsTranspiler extends JsTranspiler {
  public check(path: string): boolean {
    return extname(path).toLocaleLowerCase() === '.ts'
  }

  public transpile(path: string, code: string): string {
    const start = Date.now()
    try {
      return transpileModule(code, { compilerOptions: options }).outputText
    }
    finally {
      log('transpile "%s" elapsed: %d ms', path, Date.now() - start)
    }
  }
}

setCompilerOptions(require('../tsconfig.json').compilerOptions)
registerTranspiler(new TsTranspiler())