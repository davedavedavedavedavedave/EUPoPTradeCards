import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { TradeService } from '../trade.service';
import { TradeCard } from '../trade-card';

@Component({
  selector: 'app-trade-cards',
  templateUrl: './trade-cards.component.html',
  styleUrls: ['./trade-cards.component.css']
})
export class TradeCardsComponent implements OnInit, OnDestroy {
  id: String = '';
  tradeCardsObs?: BehaviorSubject<Map<string, TradeCard>>;
  currentTradeCard?: TradeCard;
  private paramSub?: Subscription;

  constructor(private router: ActivatedRoute, protected tradeService: TradeService) { }

  ngOnInit(): void {
    this.tradeCardsObs = this.tradeService.getTradeCards();
    this.paramSub = this.router.params.subscribe(params => {
      this.id = params['id'];
      this.currentTradeCard = this.tradeCardsObs?.value.get(this.id as string);
    });
  }
  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }
  toggleTradeCardIsInDeck(tradeCardName: string): void {
    this.tradeService.toggleTradeCardIsInDeck(tradeCardName);
  }

  sort(tradeCards: Map<string, TradeCard> | null, property: string): TradeCard[] {
    if (tradeCards) {
      return [...tradeCards.values()].sort((a, b) => {
        if (property == 'isInDeck' && a.isInDeck != b.isInDeck) {
          return a.isInDeck ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
    }
    return [];
  }
}
