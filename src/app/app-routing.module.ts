import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeCardsComponent } from './trade-cards/trade-cards.component';
import { TradeNodesComponent } from './trade-nodes/trade-nodes.component';
import { ProvincesComponent } from './provinces/provinces.component';
import { SeaZonesComponent } from './sea-zones/sea-zones.component';

const routes: Routes = [
  { path: 'trade-cards', component: TradeCardsComponent },
  { path: 'trade-cards/:id', component: TradeCardsComponent },
  { path: 'trade-nodes', component: TradeNodesComponent },
  { path: 'trade-nodes/:id', component: TradeNodesComponent },
  { path: 'provinces', component: ProvincesComponent },
  { path: 'provinces/:id', component: ProvincesComponent },
  { path: 'sea-zones', component: SeaZonesComponent },
  { path: 'sea-zones/:id', component: SeaZonesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
