import { SeaZone } from "./sea-zone";
import { TradeCard } from "./trade-card";

export class TradeNode {
  name: string;
  adjacentSeaZones: SeaZone[];
  navalTradePower: number = 0;
  connectedToCapital: boolean = false;
  usedIn: TradeCard[] = [];

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
}
