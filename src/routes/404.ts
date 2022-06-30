import { Request, Response } from 'express';
import path from 'path';

/**
 * Send index.html if accept html, send json 404 if not.
 * @param {any} req request
 * @param {any} res response
 */
export function frontEndOr404(req: Request, res: Response) {
  if (req.accepts('html')) {
    res.sendFile(path.resolve('angular/dist/index.html'));
    return;
  }
  res.status(404).json({ error: 'Not found' });
}
