import path from 'path';

/**
 * Send something when page not found.
 * @param {any} req request
 * @param {any} res response
 */
export function notFound(req: any, res: any) {
  if (req.accepts('html')) {
    res.sendFile(path.resolve('angular/dist/index.html'));
    return;
  }
  res.status(404).json({ error: 'Not found' });
}
