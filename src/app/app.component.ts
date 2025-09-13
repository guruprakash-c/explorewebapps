import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header-component/header-component.component';
import { FooterComponent } from './components/shared/footer-component/footer-component.component';
import { setTheme } from 'ngx-bootstrap/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: '#app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(){
    setTheme('bs5');
  }
  title = 'Explore Web Apps';
}
