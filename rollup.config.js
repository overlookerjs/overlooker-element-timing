import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: './index.embed.js',
  output: {
    file: './dist/index.min.js',
    format: 'iife',
    name: 'bundle'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}
