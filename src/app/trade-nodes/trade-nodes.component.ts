import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TradeService } from '../trade.service';
import { TradeNode } from '../trade-node';
import { GeneralStats } from '../general-stats';
import { Province } from '../province';

@Component({
  selector: 'app-trade-nodes',
  templateUrl: './trade-nodes.component.html',
  styleUrls: ['./trade-nodes.component.css']
})
export class TradeNodesComponent implements OnInit, OnDestroy {
  id: String = '';
  tradeNodesObs?: BehaviorSubject<Map<string, TradeNode>>;
  generalStatsObs?: Observable<GeneralStats>;
  currentTradeNode?: TradeNode;
  private paramSub?: Subscription;

  constructor(private router: ActivatedRoute, private tradeService: TradeService) { }

  ngOnInit(): void {
    this.tradeNodesObs = this.tradeService.getTradeNodes();
    this.generalStatsObs = this.tradeService.getGeneralStats();
    this.paramSub = this.router.params.subscribe(params => {
      this.id = params['id'];
      this.currentTradeNode = this.tradeNodesObs?.value.get(this.id as string);
    });
  }
  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }

  setTradeNodeNavalPower(tradeNodeName: string, event: Event): void {
    let target = event.target as HTMLInputElement;
    this.tradeService.setTradeNodeNavalPower(tradeNodeName, +target.value);
  }

  toggleTradeNodeConnection(tradeNodeName: string): void {
    this.tradeService.toggleTradeNodeConnection(tradeNodeName);
  }

  sort(tradeNodes: Map<string, TradeNode> | null, property: string): TradeNode[] {
    if (tradeNodes) {
      return [...tradeNodes.values()].sort((a, b) => {
        if (property == 'usedIn' && a.usedIn.length != b.usedIn.length) {
          return b.usedIn.length - a.usedIn.length;
        }
        return a.name.localeCompare(b.name);
      });
    }
    return [];
  }


  getRelevantProvinces(tradeNode: TradeNode): [number, Province][] {
    let relevantProvinces: [number, Province][] = [];
    for (let i = 0; i < tradeNode.usedIn.length; i++) {
      for (let j = 0; j < tradeNode.usedIn[i].options.length; j++) {
        const option = tradeNode.usedIn[i].options[j];
        if (option.tradeNode == tradeNode) {
          for (let k = 0; k < option.keyProvinces.length; k++) {
            const province = option.keyProvinces[k];
            let idx = relevantProvinces.findIndex(e => e[1] == province);
            if (idx >= 0) {
              relevantProvinces[idx][0] += 1;
            } else {
              relevantProvinces.push([1, province]);
            }
          }
        }
      }
    }
    return relevantProvinces.sort((a, b) => {
      if (a[0] != b[0]) {
        return b[0] - a[0];
      }
      return a[1].name.localeCompare(b[1].name);
    });
  }

}
