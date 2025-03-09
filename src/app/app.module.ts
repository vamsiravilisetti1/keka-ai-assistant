import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PromptComponent } from './chat-bot/app-promt/promt.component';
import { ChatbotComponent } from './chat-bot/chatbot.component';
import { ConversationComponent } from './conversation/conversation.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatButtonModule} from "@angular/material/button";
import { MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from '@angular/material/menu';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    PromptComponent,
    ChatbotComponent,
    ConversationComponent,
    HeaderComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
