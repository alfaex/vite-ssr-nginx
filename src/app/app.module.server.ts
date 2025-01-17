import { NgModule } from '@angular/core';
import { provideServerRendering, ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { provideServerRoutesConfig } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

@NgModule({
  imports: [
    AppModule,
    //ServerModule
  ],
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes)
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
