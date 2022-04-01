import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

/**
 * Proxy to frontend.
 * @param {any} req request
 * @param {any} res response
 */
export function proxyRoute(req: any, res: any) {
  console.log('Proxying request to frontend');
  proxy.web(req, res, {
    target: 'http://angular:4200',
  }, (error:any)=>{
    console.log(error);
  });
}
