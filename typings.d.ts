interface Window {
  publicPath: string;
  routerBase: string;
}

declare module '*.css' {
  const cssStyles: { readonly [key: string]: string };
  export default cssStyles;
}

declare module '*.less' {
  const styles: { [key: string]: string };  // 声明为一个对象，键是类名，值是 CSS 样式
  export default styles;
}

declare module '*.png' {
  const content: any;
  export default content;
}
