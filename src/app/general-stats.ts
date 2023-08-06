import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { Province } from "./province";
import { SeaZone } from "./sea-zone";
import { TradeNode } from "./trade-node";
import { TradeCard } from "./trade-card";

export class GeneralStats {
  // tradeCardCount: number = 0;
  // provinceCount: number = 0;
  // seaZoneCount: number = 0;
  // tradeNodeCount: number = 0;

  constructor(
    private provinceObs: BehaviorSubject<Map<string, Province>>,
    private seaZoneObs: BehaviorSubject<Map<string, SeaZone>>,
    private tradeNodeObs: BehaviorSubject<Map<string, TradeNode>>,
    private tradeCardObs: BehaviorSubject<Map<string, TradeCard>>
  ) {  }

  public getTradeCardCount(): number {
    return Array.from(this.tradeCardObs.getValue()).filter(v => v[1].isInDeck).length;
  }
  public getAddedTradeCardCountOnConnectionOf(tradeNode: TradeNode): number {
    return Array.from(this.tradeCardObs.getValue()).filter(v => {
      if (v[1].isInDeck && v[1].value <= 2) {
        for (let i = 0; i < v[1].options.length; i++) {
          const option = v[1].options[i];
          if (option.tradeNode == tradeNode || option.secondaryTradeNode == tradeNode) {
            return true;
          }
        }
      }
      return false;
    }).length;
    return 0;
  }
  public getTradeCardCoverage(): number {
    return Array.from(this.tradeCardObs.getValue()).filter(v => v[1].value > 2).length;
  }
  
}
