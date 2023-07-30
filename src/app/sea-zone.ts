import { TradeCard } from "./trade-card";
import { TradeNode } from "./trade-node";

export class SeaZone {
  name: string;
  tradeProtectionSlots: number;
  fleetStrength: number = 0;
  usedIn: TradeCard[] = [];
  adjacentTradeNodes: TradeNode[] = [];

  constructor(name: string, tradeProtectionSlots: number) {
    this.name = name;
    this.tradeProtectionSlots = tradeProtectionSlots;
  }
}
