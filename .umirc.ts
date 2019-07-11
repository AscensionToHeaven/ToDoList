import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  publicPath: './',
  base: '/ToDoList',
  hash: true,
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      dva: true,
      dynamicImport: false,
      title: '待办事项',
      dll: true,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
