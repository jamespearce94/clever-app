import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface IHttpRequestConfig {
    headers?: HttpHeaders;
    params?: {};
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    observe?: 'response';
    withCredentials?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ApiRequestService {
    constructor(protected readonly http: HttpClient) {}

    public get<T = any>(url: string, config?: IHttpRequestConfig, maxRetries?: number): Observable<T> {
        let params = new HttpParams();
        if (config && config.params && config.params !== undefined) {
            for (let property in config.params) {
                if (config.params.hasOwnProperty(property)) {
                    params = params.set(property, config.params[property]);
                }
            }
            config.params = params;
        }

        let headers = new HttpHeaders();
        if (config && config.headers && config.headers !== undefined) {
            headers = config.headers;
        }
        if (config) {
            config.headers = headers;
        }
        return this.request<T>(new HttpRequest<any>('get', url, config as {}));
    }

    public post<T = any>(url: string, data?: any, config?: IHttpRequestConfig, maxRetries?: number): Observable<T> {
        let params = new HttpParams();
        if (config && config.params && config.params !== undefined) {
            for (let property in config.params) {
                if (config.params.hasOwnProperty(property)) {
                    params = params.set(property, config.params[property]);
                }
            }
            config.params = params;
        }

        if (!config) {
            config = {
                params: params
            };
        }

        let headers = new HttpHeaders();
        if (config && config.headers && config.headers !== undefined) {
            headers = config.headers;
        }

        config.headers = headers;

        return this.request<T>(new HttpRequest("post", url, data, config as {}));
    }

    private request<T>(httpRequest: HttpRequest<T>): Observable<T> {
        return this.http.request<T>(httpRequest).pipe(
            filter((x: HttpResponse<T>) => x.type === HttpEventType.Response),
            map((x: HttpResponse<T>) => {
                return x.body;
            })
        );
    }
}
