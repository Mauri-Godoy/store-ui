import { Component } from '@angular/core';
import { LucideAngularModule, Linkedin, Github, MessageCircle, Mail } from 'lucide-angular';
@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  Linkedin = Linkedin;
  Github = Github;
  MessageCircle = MessageCircle;
  Mail = Mail;

  contactUrl = 'mailto:mauu.godoy01@gmail.com';
  portfolioUrl = 'https://mauriciogodoy.vercel.app/';
  projectsUrl = 'https://www.linkedin.com/in/mauriciongodoy/details/projects/';
  linkedinUrl = 'https://www.linkedin.com/in/mauriciongodoy/';
  githubUrl = 'https://github.com/Mauri-Godoy';
  whatsappUrl = 'https://wa.me/5492664950406';
}
