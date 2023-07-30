import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeCardsComponent } from './trade-cards/trade-cards.component';
import { TradeNodesComponent } from './trade-nodes/trade-nodes.component';
import { ProvincesComponent } from './provinces/provinces.component';
import { SeaZonesComponent } from './sea-zones/sea-zones.component';
import { FormsModule } from '@angular/forms';
import { SimpleTradeCardListComponent } from './simple-trade-card-list/simple-trade-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TradeCardsComponent,
    TradeNodesComponent,
    ProvincesComponent,
    SeaZonesComponent,
    SimpleTradeCardListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
