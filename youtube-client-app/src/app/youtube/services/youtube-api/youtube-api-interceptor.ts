import { HttpInterceptorFn } from '@angular/common/http';

export const ApiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = 'AIzaSyDNhNQjYvpI3F64zEZngdJ_IlnQBG6Tfks';
  const commonUrl = 'https://www.googleapis.com/youtube/v3';
  const apiUrl = `${commonUrl}/${req.url}`;

  const apiReq = req.clone({
    url: apiUrl,
    params: req.params.set('key', apiKey),
  });

  return next(apiReq);
};
