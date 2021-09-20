import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from "rxjs";
import { catchError } from 'rxjs/operators'

@Injectable () 

export class HttpHeadersInterceptor implements HttpInterceptor{
    constructor() {

    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
                'x-rapidapi-key': '4be3035444msh767359a6ceec8ecp1c4a75jsn1a7d9d702b15'
            },
            setParams: {
                key: "b70d29d3a49a4df48b85e04472e765ba"
            }
        })
        return next.handle(req)
    }
}