import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { Province } from "./province";
import { SeaZone } from "./sea-zone";
import { TradeNode } from "./trade-node";
import { TradeCard } from "./trade-card";

export class GeneralStats {
  subject: BehaviorSubject<GeneralStats>;

  tradeCardCount: number = 0;
  provinceCount: number = 0;
  seaZoneCount: number = 0;
  tradeNodeCount: number = 0;

  constructor(
    provinceObs: Observable<Map<string, Province>>,
    seaZoneObs: Observable<Map<string, SeaZone>>,
    tradeNodeObs: Observable<Map<string, TradeNode>>,
    tradeCardObs: Observable<Map<string, TradeCard>>
  ) {
    this.subject = new BehaviorSubject<GeneralStats>(this);
    provinceObs.subscribe(map => { this.provinceCount = map.size; this.subject.next(this); });
    seaZoneObs.subscribe(map => { this.seaZoneCount = map.size; this.subject.next(this); });
    tradeNodeObs.subscribe(map => { this.tradeNodeCount = map.size; this.subject.next(this); });
    tradeCardObs.subscribe(map => {
      this.tradeCardCount = 0;
      map.forEach(tradeCard => this.tradeCardCount += tradeCard.isInDeck ? 1 : 0 );
      this.subject.next(this);
    });
  }
}
