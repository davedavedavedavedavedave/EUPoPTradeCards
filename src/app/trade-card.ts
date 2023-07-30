import { TradeCardOption } from "./trade-card-option";

export class TradeCard {
  id: string;
  name: string;
  incomeLow: number;
  incomeMid: number;
  incomeHigh: number;
  incomeExpandedLow: number;
  incomeExpandedMid: number;
  incomeExpandedHigh: number;
  causesInflation: boolean;
  causesPrestigeLoss: boolean;
  options: TradeCardOption[];
  hasAsterisk: boolean;
  hasDagger: boolean;
  continentSymbols: number[];

  private _isInDeck: boolean = true;

  constructor(
    id: string,
    name: string,
    incomeLow: number,
    incomeMid: number,
    incomeHigh: number,
    incomeExpandedLow: number,
    incomeExpandedMid: number,
    incomeExpandedHigh: number,
    causesInflation: boolean,
    causesPrestigeLoss: boolean,
    options: TradeCardOption[],
    hasAsterisk: boolean,
    hasDagger: boolean,
    continentSymbols: number[]
  ) {
    this.id = id;
    this.name = name;
    this.incomeLow = incomeLow;
    this.incomeMid = incomeMid;
    this.incomeHigh = incomeHigh;
    this.incomeExpandedLow = incomeExpandedLow;
    this.incomeExpandedMid = incomeExpandedMid;
    this.incomeExpandedHigh = incomeExpandedHigh;
    this.causesInflation = causesInflation;
    this.causesPrestigeLoss = causesPrestigeLoss;
    this.options = options;
    this.hasAsterisk = hasAsterisk;
    this.hasDagger = hasDagger;
    this.continentSymbols = continentSymbols;

    for (let i = 0; i < this.options.length; i++) {
      const option = this.options[i];
      option.parentTradeCard = this;
      option.isInDeck = this.isInDeck;
    }
  }

  public set isInDeck(v: boolean) {
    this._isInDeck = v;
    for (let i = 0; i < this.options.length; i++) {
      const option = this.options[i];
      option.isInDeck = v;
    }
  }
  
  public get isInDeck(): boolean {
    return this._isInDeck;
  }
}
