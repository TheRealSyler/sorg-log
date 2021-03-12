import { promises, existsSync } from 'fs';
import { join } from 'path'

(async () => {
  try {
    const dir = await promises.readdir('./src')

    if (!existsSync('./deno')) {
      await promises.mkdir('./deno')
    }
    for (let i = 0; i < dir.length; i++) {
      let fileName = dir[i];
      if (!/.spec.ts$/.test(fileName) && fileName !== 'test') {
        const file = await promises.readFile(join('./src', fileName), { encoding: 'utf8' })
        if (fileName === 'index.ts') {
          fileName = 'mod.ts'
        }
        let newFile = file.replace(/(((import|export).*)?from.*?'(.*))'/gm, (substring, ...args) => {
          if (args[3] === 's.color') {
            return 'import { StringToRGB } from \'https://deno.land/x/suf_color@0.0.15.4/deno/mod.ts\''
          }
          return `${args[0]}.ts'`
        })


        await promises.writeFile(join('./deno', fileName), newFile)
      }
    }
  } catch (e) {
    console.log(e)
  }
})()
