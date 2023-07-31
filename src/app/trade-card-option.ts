import { Province } from "./province";
import { TradeCard } from "./trade-card";
import { TradeNode } from "./trade-node";

export class TradeCardOption {
  tradeNode: TradeNode;
  keyProvinces: Province[];
  keyProvinceMultiplier: number[];
  requiresAnyPlayerPresence: Boolean;
  requiresPlayerPresence: Boolean;
  secondaryTradeNode?: TradeNode;
  parentTradeCard?: TradeCard;

  private _isInDeck: boolean = true;

  constructor(tradeNode: TradeNode, keyProvinces: Province[], keyProvinceMultiplier: number[], requiresAnyPlayerPresence: Boolean, requiresPlayerPresence: Boolean, secondaryTradeNode?: TradeNode) {
    if (keyProvinces.length != keyProvinceMultiplier.length) {
      throw Error('keyProvince.length does not equal keyProvinceMultiplier.length');
    }
    this.tradeNode = tradeNode;
    this.keyProvinces = keyProvinces;
    this.keyProvinceMultiplier = keyProvinceMultiplier;
    this.requiresAnyPlayerPresence = requiresAnyPlayerPresence;
    this.requiresPlayerPresence = requiresPlayerPresence;
    this.secondaryTradeNode = secondaryTradeNode;
  }

  public set isInDeck(v: boolean) {
    this._isInDeck = v;
    if (this.parentTradeCard) {
      // adjust tradNode.usedIn
      const tradeNodeIdx = this.tradeNode.usedIn.indexOf(this.parentTradeCard);
      if (v && tradeNodeIdx < 0) {
        this.tradeNode.usedIn.push(this.parentTradeCard);
      } else if (!v && tradeNodeIdx >= 0) {
        this.tradeNode.usedIn.splice(tradeNodeIdx, 1);
      }
      // adjust tradeNode.adjacentSeaZones.$.usedIn
      for (let i = 0; i < this.tradeNode.adjacentSeaZones.length; i++) {
        const seaZone = this.tradeNode.adjacentSeaZones[i];
        const seaZoneIdx = seaZone.usedIn.indexOf(this.parentTradeCard);
        if (v && seaZoneIdx < 0) {
          seaZone.usedIn.push(this.parentTradeCard);
        } else if (!v && seaZoneIdx >= 0) {
          seaZone.usedIn.splice(seaZoneIdx, 1);
        }
      }
      // adjust secondaryTradNode.usedIn
      if (this.secondaryTradeNode) {
        const secondaryTradeNodeIdx = this.secondaryTradeNode.usedIn.indexOf(this.parentTradeCard);
        if (v && secondaryTradeNodeIdx < 0) {
          this.secondaryTradeNode.usedIn.push(this.parentTradeCard);
        } else if (!v && secondaryTradeNodeIdx >= 0) {
          this.secondaryTradeNode.usedIn.splice(secondaryTradeNodeIdx, 1);
        }
        // adjust secondaryTradeNode.adjacentSeaZones.$.usedIn
        for (let i = 0; i < this.secondaryTradeNode.adjacentSeaZones.length; i++) {
          const seaZone = this.secondaryTradeNode.adjacentSeaZones[i];
          const seaZoneIdx = seaZone.usedIn.indexOf(this.parentTradeCard);
          if (v && seaZoneIdx < 0) {
            seaZone.usedIn.push(this.parentTradeCard);
          } else if (!v && seaZoneIdx >= 0) {
            seaZone.usedIn.splice(seaZoneIdx, 1);
          }
        }
      }
      // adjust keyProvinces.$.usedIn
      for (let i = 0; i < this.keyProvinces.length; i++) {
        const province = this.keyProvinces[i];
        const provinceIdx = province.usedIn.indexOf(this.parentTradeCard);
        if (v && provinceIdx < 0) {
          province.usedIn.push(this.parentTradeCard);
        } else if (!v && provinceIdx >= 0) {
          province.usedIn.splice(provinceIdx, 1);
        }
      }
      // trigger recalcs
      this.tradeNode.recalcTradeCardValues();
    }
  }
  
  public get isInDeck(): boolean {
    return this._isInDeck;
  }

  public get bracket() : string {
    let tradePower = 0;
    if (this.tradeNode.connectedToCapital) {
      tradePower = 1 + this.tradeNode.navalTradePower;
      for (let i = 0; i < this.keyProvinces.length; i++) {
        const province = this.keyProvinces[i];
        if (province.owned) {
          tradePower += this.keyProvinceMultiplier[i]
        }
      }
    } else if (this.secondaryTradeNode?.connectedToCapital) {
      tradePower = 1;
    }
    let bracket = 'income';
    if (this.tradeNode.isExpanded) {
      bracket += 'Expanded'
    }
    if (tradePower >= 6) {
      bracket += 'High';
    } else if (tradePower >= 3) {
      bracket += 'Mid';
    } else if (tradePower >= 1) {
      bracket += 'Low';
    } else {
      bracket += 'Dudd';
    }
    return bracket;
  }
}
