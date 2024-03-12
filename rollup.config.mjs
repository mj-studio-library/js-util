import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import ts from 'rollup-plugin-typescript2';

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
    external: ['react', 'react-native'],
    plugins: [
      // nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
      commonjs(),
      ts({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
  },
];
