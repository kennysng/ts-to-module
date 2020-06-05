import '.'
import { requireSync, requireAsync } from 'src-to-module'
import { resolve } from 'path'

test('sync', () => {
  const message = requireSync<any>(resolve(__dirname, '../test/sync')).default
  expect(message).toBe('Hello, World')
})

test('async', async (done) => {
  const message = (await requireAsync<any>(resolve(__dirname, '../test/async'))).default
  expect(message).toBe('Hello, World')
  done()
})