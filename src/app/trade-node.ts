import { SeaZone } from "./sea-zone";
import { TradeCard } from "./trade-card";

export class TradeNode {
  name: string;
  adjacentSeaZones: SeaZone[];
  navalTradePower: number = 0;
  isExpanded: boolean = false;
  connectedToCapital: boolean = false;
  usedIn: TradeCard[] = [];
  tradeCardValues: number[] = [0, 0, 0, 0, 0, 0];


  constructor(name: string, adjacentSeaZones: SeaZone[]) {
    this.name = name;
    this.adjacentSeaZones = adjacentSeaZones;
    for (let i = 0; i < this.adjacentSeaZones.length; i++) {
      const seaZone = this.adjacentSeaZones[i];
      if (seaZone.adjacentTradeNodes.indexOf(this) < 0) {
        seaZone.adjacentTradeNodes.push(this);
      }
    }
  }

  recalcTradeCardValues(): void {
    this.tradeCardValues = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < this.usedIn.length; i++) {
      const tradeCard = this.usedIn[i];
      switch (tradeCard.incomeLow) {
        case 3:
          this.tradeCardValues[0] += 1;
          break;
        case 4:
          this.tradeCardValues[1] += 1;
          break;
        case 5:
          this.tradeCardValues[2] += 1;
          break;
        case 6:
          this.tradeCardValues[3] += 1;
          break;
        case 7:
          this.tradeCardValues[4] += 1;
          break;
        case 10:
          this.tradeCardValues[5] += 1;
          break;
        default:
          throw new Error('unexpected trade card value, please check trade-node.ts');
          break;
      }
    }
  }
}
