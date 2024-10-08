import resolve             from '@rollup/plugin-node-resolve';
import { generateDTS }     from '@typhonjs-build-test/esm-d-ts';
import { getFileList }     from '@typhonjs-utils/file-util';
import fs                  from 'fs-extra';
import { rollup }          from 'rollup';

const sourcemap = true; // Defines whether source maps are generated.

const external = [/^#runtime/, /^#standard/];

const rollupConfigs = [
   {
      input: {
         input: 'src/action/animate/ripple/index.js',
         external,
         plugins: [
            resolve(),
            generateDTS.plugin()
         ]
      },
      output: {
         file: '_dist/action/animate/ripple/index.js',
         format: 'es',
         generatedCode: { constBindings: true },
         sourcemap
      }
   },
   {
      input: {
         input: 'src/application/menu/index.js',
         external,
         plugins: [
            resolve(),
            generateDTS.plugin()
         ]
      },
      output: {
         file: '_dist/application/menu/index.js',
         format: 'es',
         generatedCode: { constBindings: true },
         sourcemap
      }
   }
];

for (const config of rollupConfigs)
{
   console.log(`Generating bundle: ${config.input.input}`);

   const bundle = await rollup(config.input);
   await bundle.write(config.output);
   await bundle.close();
}

// Svelte standard components ----------------------------------------------------------------------------------------

// Handle component/standard by copying the source.
fs.emptyDirSync('./_dist/component');
fs.copySync('./src/component', './_dist/component');

const compFiles = await getFileList({ dir: './_dist/component', resolve: true, walk: true });

for (const compFile of compFiles)
{
   let fileData = fs.readFileSync(compFile, 'utf-8').toString();
   fileData = fileData.replaceAll('#svelte', 'svelte');
   fs.writeFileSync(compFile, fileData);
}

await generateDTS({ input: '_dist/component/button/index.js' });
await generateDTS({ input: '_dist/component/color/picker-colord/index.js' });
await generateDTS({ input: '_dist/component/container/index.js' });
await generateDTS({ input: '_dist/component/dom/index.js' });
await generateDTS({ input: '_dist/component/folder/index.js' });
await generateDTS({ input: '_dist/component/form/index.js' });
await generateDTS({ input: '_dist/component/label/index.js' });
await generateDTS({ input: '_dist/component/layer/index.js' });
await generateDTS({ input: '_dist/component/media/index.js' });
await generateDTS({ input: '_dist/component/menu/index.js' });
