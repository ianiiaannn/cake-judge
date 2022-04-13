import httpProxy from 'http-proxy';
import { Request, Response } from 'express';
const proxy = httpProxy.createProxyServer();

/**
 * Proxy to frontend.
 * @param {any} req request
 * @param {any} res response
 */
export function proxyRoute(req: Request, res: Response) {
  proxy.web(req, res, {
    target: 'http://angular:4200',
  }, (error:any)=>{
    console.log(error);
  });
}
