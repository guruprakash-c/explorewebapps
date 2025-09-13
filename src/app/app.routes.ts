import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page-component/home-page-component.component';

export const routes: Routes = [
    {
        path:'/',
        component: HomePageComponent
    }
];
