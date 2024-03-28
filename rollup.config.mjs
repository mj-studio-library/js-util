import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import ts from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        preserveModules: false,
      },
      {
        dir: 'esm',
        format: 'esm',
        preserveModules: false,
      },
    ],
    plugins: [
      nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
      commonjs(),
      ts({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
  },
];
