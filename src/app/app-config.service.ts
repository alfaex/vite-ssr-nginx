import { inject, Inject, Injectable, Optional, PLATFORM_ID, REQUEST, REQUEST_CONTEXT } from '@angular/core';
import { catchError, delay, EMPTY, of, tap } from 'rxjs';
import { APP_BASE_HREF, DOCUMENT, Location, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducers';
import * as fromConfigActions from 'src/app/store/actions/config.action';


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  baseURL:string|undefined = undefined;

  isBrowser: boolean = false;
  isServer: boolean = false;

  request = inject(REQUEST);

  bases: Record<string, string> = {
    "potato.local": "",
    "tomato.local": "portal"
  }

  http = inject(HttpClient);

  appBaseHref = inject(APP_BASE_HREF, {
    optional: true
  });

  ctx = inject<{base: string}>(REQUEST_CONTEXT, {
    optional: true
  })

  constructor(
    private location: Location,
    @Inject(DOCUMENT) private document: Document,
    private store: Store<fromRoot.State>,
    @Inject(PLATFORM_ID) private platformId: Object,
    ) {

      this.isBrowser = isPlatformBrowser(this.platformId)
      this.isServer = isPlatformServer(this.platformId)

      if(this.isBrowser){
        /*
        On the front and It's not possible to rely on `this.appBaseHref` (APP_BASE_HREF);

        I cannot set on the app.module, otherwise all the clients would have a fixed APP_BASE_HREF.

        Because I need to get this from the ssr server and the AngularNodeAppEngine don't allow to pass this provider like `render` from ngExpressEngine (@nguniversal/express-engine).

        With AngularNodeAppEngine I can pass as the context but it will not tell angular to use the APP_BASE_HREF internally to generate urls. (prepareExternalUrl etc)

        It wasn't the best solutions but it worked using a condition on the express '*' route.

        if(true for condition):
          res.render(indexHtml, { req: request,
            providers: [{ provide: APP_BASE_HREF, useValue: '/portal/' }],
            baseUrl }],
            document: docParsedWithBase
          })
          }else{
            res.render(indexHtml, { req: request,
              baseUrl }],
              document: docNoBase
            })
          }
        more info on the server.ts
         */


        // this is a pain, because I need to mantain in some db the list of base href that each client have.
        const domain = window.location.hostname;
        const base = this.bases[domain];

        console.log('BASE', base);
        if(base === ""){
          this.baseURL = '/api';
        }else{
          this.baseURL = `/${base}/api`;
        }

      }

      if(this.isServer){

        // get from the nginx header the domain
        const xForwardedHost = this.request?.headers.get ('x-forwarded-host') || '';

        // if(this.appBaseHref){
        if(this.ctx){
          // older angular version that allow pass APP_BASE_HREF would work on ok.
          // With context will work just to this request inside this file.
          // It will breake the app because I cannot pass the APP_BASE_HREF to the render
          // and angular will not know how to build the urls with the base href.
          // this.baseURL = `http://${xForwardedHost}${this.appBaseHref}api`;
          this.baseURL = `http://${xForwardedHost}${this.ctx.base}api`;
        }else{
          this.baseURL = `http://${xForwardedHost}/api`;
        }

      }


    }

  load(){

    const url = `${this.baseURL}/config`;

    return this.http.get<{title: string}>(url)
      .pipe(
        tap(resp => {

          this.store.dispatch(fromConfigActions.InitialSuccess({title: resp.title}))

        }),
        catchError(err => {
          console.log("first build, press f5 on browser that it works");
          return EMPTY
        })
      )


  }

}
