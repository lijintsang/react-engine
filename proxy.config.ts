// proxy.config.js

const DEV_HOST = 'xxx-xxx';

const DEV_URI = `http${
  DEV_HOST.includes('192') ? '' : 's'
}://${DEV_HOST}/`;

const proxyConfig = [
  {
    context: ['/xxx-api'],
    target: DEV_URI, // 代理到 DEV_URI
    changeOrigin: true, // 改变请求的来源
    secure: false, // 忽略 HTTPS 证书校验
  },
];

module.exports = proxyConfig;
