import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  // 默认路由
  {
    path: 'one-module',
    loadChildren: './module-a/module-a.module#ModuleAModule'
  },
  {
    path: 'two-module',
    loadChildren: './module-b/module-b.module#ModuleBModule'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)], // , {preloadingStrategy: PreloadAllModules}
  exports: [RouterModule]
})
export class AppRouterModule { }
