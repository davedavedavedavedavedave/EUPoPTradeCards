import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TradeService } from '../trade.service';
import { SeaZone } from '../sea-zone';
import { GeneralStats } from '../general-stats';

@Component({
  selector: 'app-sea-zones',
  templateUrl: './sea-zones.component.html',
  styleUrls: ['./sea-zones.component.css']
})
export class SeaZonesComponent implements OnInit, OnDestroy {
  id: String = '';
  seaZonesObs?: BehaviorSubject<Map<string, SeaZone>>;
  generalStatsObs?: Observable<GeneralStats>;
  currentSeaZone?: SeaZone;
  private paramSub?: Subscription;

  constructor(private router: ActivatedRoute, private tradeService: TradeService) { }

  ngOnInit(): void {
    this.seaZonesObs = this.tradeService.getSeaZones();
    this.generalStatsObs = this.tradeService.getGeneralStats();
    this.paramSub = this.router.params.subscribe(params => {
      this.id = params['id'];
      this.currentSeaZone = this.seaZonesObs?.value.get(this.id as string);
    });
  }
  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }

  sort(seaZones: Map<string, SeaZone> | null, property: string): SeaZone[] {
    if (seaZones) {
      return [...seaZones.values()].sort((a, b) => {
        if (property == 'usedIn' && a.usedIn.length != b.usedIn.length) {
          return b.usedIn.length - a.usedIn.length;
        }
        return a.name.localeCompare(b.name);
      });
    }
    return [];
  }
}
