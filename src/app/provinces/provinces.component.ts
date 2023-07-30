import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TradeService } from '../trade.service';
import { Province } from '../province';
import { GeneralStats } from '../general-stats';
import { TradeNode } from '../trade-node';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.css']
})
export class ProvincesComponent implements OnInit, OnDestroy {
  id: String = '';
  provincesObs?: BehaviorSubject<Map<string, Province>>;
  generalStatsObs?: Observable<GeneralStats>;
  currentProvince?: Province;
  private paramSub?: Subscription;

  constructor(private router: ActivatedRoute, private tradeService: TradeService) { }

  ngOnInit(): void {
    this.provincesObs = this.tradeService.getProvinces();
    this.generalStatsObs = this.tradeService.getGeneralStats();
    this.paramSub = this.router.params.subscribe(params => {
      this.id = params['id'];
      this.currentProvince = this.provincesObs?.value.get(this.id as string);
    });
  }
  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }

  toggleProvinceOwned(provinceName: string): void {
    this.tradeService.toggleProvinceOwned(provinceName);
  }

  sort(provinces: Map<string, Province> | null, property: string): Province[] {
    if (provinces) {
      return [...provinces.values()].sort((a, b) => {
        if (property == 'usedIn' && a.usedIn.length != b.usedIn.length) {
          return b.usedIn.length - a.usedIn.length;
        }
        return a.name.localeCompare(b.name);
      });
    }
    return [];
  }

  getRelevantTradeNodes(province: Province): [number, TradeNode][] {
    let relevantTradeNodes: [number, TradeNode][] = [];
    for (let i = 0; i < province.usedIn.length; i++) {
      for (let j = 0; j < province.usedIn[i].options.length; j++) {
        const option = province.usedIn[i].options[j];
        if (option.keyProvinces.indexOf(province) >= 0) {
          let idx = relevantTradeNodes.findIndex(e => e[1] == option.tradeNode);
          if (idx >= 0) {
            relevantTradeNodes[idx][0] += 1;
          } else {
            relevantTradeNodes.push([1, option.tradeNode]);
          }
        }
      }
    }
    return relevantTradeNodes.sort((a, b) => {
      if (a[0] != b[0]) {
        return b[0] - a[0];
      }
      return a[1].name.localeCompare(b[1].name);
    });
  }
}
