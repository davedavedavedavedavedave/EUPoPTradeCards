import { TradeCard } from "./trade-card";

export class Province {
  name: string;
  owned: boolean = false;
  usedIn: TradeCard[] = [];

  constructor(name: string) {
    this.name = name;
  }
}

