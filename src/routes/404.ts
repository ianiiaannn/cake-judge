/**
 * Send something when page not found.
 * @param {any} req request
 * @param {any} res response
 */
export function notFound(req:any, res:any) {
  /* if (req.accepts('html')) {
    res.render('404');
    return;
  }
  */
  res.json({ error: 'Not found' });
}
