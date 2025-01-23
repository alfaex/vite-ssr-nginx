import { NgModule, inject, isDevMode, provideAppInitializer } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from 'src/app/app.reducers';
import { ServicosEffects } from './store/effects/servicos.effects';
import { AppConfigService } from './app-config.service';
import { APP_BASE_HREF } from '@angular/common';
import { of } from 'rxjs';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([
      ServicosEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    // CANNOT set APP_BASE_HREF here or all clients will have the same APP_BASE_HREF
    {provide: APP_BASE_HREF, useValue: '/portal'},
    // provideHttpClient(withFetch()),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideStore(appReducer),
    provideEffects(ServicosEffects),
    // provideAppInitializer(() => {
    //  const service = inject(AppConfigService);
    //  return service.load()
    // }),
    provideStoreDevtools({
      maxAge: 25
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
