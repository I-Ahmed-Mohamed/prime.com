import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CopilotWidgetComponent } from './shared/components/copilot-widget/copilot-widget.component';
import { HeroSectionComponent } from './features/home/hero-section.component';
import { AboutSectionComponent } from './features/about/about-section.component';
import { ArchitectureSectionComponent } from './features/architecture/architecture-section.component';
import { ProjectsSectionComponent } from './features/projects/projects-section.component';
import { ClientsSectionComponent } from './features/clients/clients-section.component';
import { ServicesSectionComponent } from './features/services/services-section.component';
import { PricingSectionComponent } from './features/pricing/pricing-section.component';
import { SkillsSectionComponent } from './features/skills/skills-section.component';
import { ContactSectionComponent } from './features/contact/contact-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ArchitectureSectionComponent,
    ProjectsSectionComponent,
    ClientsSectionComponent,
    ServicesSectionComponent,
    PricingSectionComponent,
    SkillsSectionComponent,
    ContactSectionComponent,
    FooterComponent,
    CopilotWidgetComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Main application shell
}
