import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Province } from './province';
import { TradeCard } from './trade-card';
import { TradeCardOption } from './trade-card-option';
import { TradeNode } from './trade-node';
import { SeaZone } from './sea-zone';
import { GeneralStats } from './general-stats';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  provinceSubject: BehaviorSubject<Map<string, Province>>;
  seaZoneSubject: BehaviorSubject<Map<string, SeaZone>>;
  tradeNodeSubject: BehaviorSubject<Map<string, TradeNode>>;
  tradeCardSubject: BehaviorSubject<Map<string, TradeCard>>;
  generalStats: GeneralStats;

  constructor() {
    this.provinceSubject = new BehaviorSubject(PROVINCES);
    this.seaZoneSubject = new BehaviorSubject(SEA_ZONES);
    this.tradeNodeSubject = new BehaviorSubject(TRADE_NODES);
    this.tradeCardSubject = new BehaviorSubject(TRADE_CARDS);
    this.generalStats = new GeneralStats(this.getProvinces(), this.getSeaZones(), this.getTradeNodes(), this.getTradeCards());
  }

  addTradeCardsToDeck(dagger: boolean, asterisk: boolean, continent: number): void {
    TRADE_CARDS.forEach(tradeCard => {
      if (
        dagger && tradeCard.hasDagger
        || asterisk && tradeCard.hasAsterisk
        || continent && tradeCard.continentSymbols.indexOf(continent) >= 0
      ) {
        tradeCard.isInDeck = true;
      }
    })
  }

  removeTradeCardsFromDeck(dagger: boolean, asterisk: boolean, continent: number): void {
    TRADE_CARDS.forEach(tradeCard => {
      if (
        dagger && tradeCard.hasDagger
        || asterisk && tradeCard.hasAsterisk
        || continent && tradeCard.continentSymbols.indexOf(continent) >= 0
      ) {
        tradeCard.isInDeck = false;
      }
    })
  }

  toggleTradeCardIsInDeck(tradeCardName: string): void {
    let tradeCard = TRADE_CARDS.get(tradeCardName);
    if (tradeCard) {
      tradeCard.isInDeck = !tradeCard.isInDeck;
      // this.provinceSubject.next(PROVINCES);
      // this.seaZoneSubject.next(SEA_ZONES);
      // this.tradeNodeSubject.next(TRADE_NODES);
      // this.tradeCardSubject.next(TRADE_CARDS);
    }
  }

  toggleProvinceOwned(provinceName: string): void {
    let province = PROVINCES.get(provinceName);
    if (province) {
      province.owned = !province.owned;
      // this.provinceSubject.next(PROVINCES);
    }
  }

  setTradeNodeNavalPower(tradeNodeName: string, power: number): void {
    let tradeNode = TRADE_NODES.get(tradeNodeName);
    if (tradeNode) {
      tradeNode.navalTradePower = power;
      // this.tradeNodeSubject.next(TRADE_NODES);
    }
  }

  toggleTradeNodeConnection(tradeNodeName: string): void {
    let tradeNode = TRADE_NODES.get(tradeNodeName);
    if (tradeNode) {
      tradeNode.connectedToCapital = !tradeNode.connectedToCapital;
      // this.tradeNodeSubject.next(TRADE_NODES);
    }
  }

  toggleTradeNodeExpanded(tradeNodeName: string): void {
    let tradeNode = TRADE_NODES.get(tradeNodeName);
    if (tradeNode) {
      tradeNode.isExpanded = !tradeNode.isExpanded;
      // this.tradeNodeSubject.next(TRADE_NODES);
    }
  }

  getProvinces(): BehaviorSubject<Map<string, Province>> {
    return this.provinceSubject;
  }

  getSeaZones(): BehaviorSubject<Map<string, SeaZone>> {
    return this.seaZoneSubject;
  }

  getTradeNodes(): BehaviorSubject<Map<string, TradeNode>> {
    return this.tradeNodeSubject;
  }

  getTradeCards(): BehaviorSubject<Map<string, TradeCard>> {
    return this.tradeCardSubject;
  }

  getGeneralStats(): GeneralStats {
    return this.generalStats;
  }
}

const PROVINCES = new Map<string, Province>([
  ['Aberdeen', new Province('Aberdeen')],
  ['Åbo', new Province('Åbo')],
  ['Aceh', new Province('Aceh')],
  ['Adal', new Province('Adal')],
  ['Adana', new Province('Adana')],
  ['Ajuuraan', new Province('Ajuuraan')],
  ['Akershus', new Province('Akershus')],
  ['Albania', new Province('Albania')],
  ['Al-Quds', new Province('Al-Quds')],
  ['Altmark', new Province('Altmark')],
  ['Amasya', new Province('Amasya')],
  ['Amazonas', new Province('Amazonas')],
  ['Amsterdam', new Province('Amsterdam')],
  ['Ancona', new Province('Ancona')],
  ['Angola', new Province('Angola')],
  ['Anjou', new Province('Anjou')],
  ['Ankara', new Province('Ankara')],
  ['Antilles', new Province('Antilles')],
  ['Antwerpen', new Province('Antwerpen')],
  ['Arkhangelsk', new Province('Arkhangelsk')],
  ['Armagnac', new Province('Armagnac')],
  ['Artois', new Province('Artois')],
  ['Astrakhan', new Province('Astrakhan')],
  ['Athina', new Province('Athina')],
  ['Augsburg', new Province('Augsburg')],
  ['Avignon', new Province('Avignon')],
  ['Ayrshire', new Province('Ayrshire')],
  ['Azov', new Province('Azov')],
  ['Badajoz', new Province('Badajoz')],
  ['Baghdad', new Province('Baghdad')],
  ['Bahia', new Province('Bahia')],
  ['Baleares', new Province('Baleares')],
  ['Balkh', new Province('Balkh')],
  ['Baluchistan', new Province('Baluchistan')],
  ['Bangazi', new Province('Bangazi')],
  ['Barcelona', new Province('Barcelona')],
  ['Bari', new Province('Bari')],
  ['Basarabia', new Province('Basarabia')],
  ['Basra', new Province('Basra')],
  ['Beijing', new Province('Beijing')],
  ['Beira', new Province('Beira')],
  ['Beloozero', new Province('Beloozero')],
  ['Bengal', new Province('Bengal')],
  ['Benin', new Province('Benin')],
  ['Beograd', new Province('Beograd')],
  ['Bergenhus', new Province('Bergenhus')],
  ['Bergslagen', new Province('Bergslagen')],
  ['Berlin', new Province('Berlin')],
  ['Bern', new Province('Bern')],
  ['Berry', new Province('Berry')],
  ['Bitlis', new Province('Bitlis')],
  ['Bizerte', new Province('Bizerte')],
  ['Bordeaux', new Province('Bordeaux')],
  ['Borgarsysla', new Province('Borgarsysla')],
  ['Bosnia', new Province('Bosnia')],
  ['Bourbon', new Province('Bourbon')],
  ['Bourgogne', new Province('Bourgogne')],
  ['Braunschweig', new Province('Braunschweig')],
  ['Breda', new Province('Breda')],
  ['Bremen', new Province('Bremen')],
  ['Brescia', new Province('Brescia')],
  ['Brugge', new Province('Brugge')],
  ['Brunei', new Province('Brunei')],
  ['Budejovice', new Province('Budejovice')],
  ['Burgos', new Province('Burgos')],
  ['Burma', new Province('Burma')],
  ['Buzau', new Province('Buzau')],
  ['Caffa', new Province('Caffa')],
  ['Califonria', new Province('Califonria')],
  ['Canada', new Province('Canada')],
  ['Canarias', new Province('Canarias')],
  ['Canton', new Province('Canton')],
  ['Cape of Good Hope', new Province('Cape of Good Hope')],
  ['Caux', new Province('Caux')],
  ['Central Africa', new Province('Central Africa')],
  ['Central America', new Province('Central America')],
  ['Cernigovas', new Province('Cernigovas')],
  ['Ceuta', new Province('Ceuta')],
  ['Chagati', new Province('Chagati')],
  ['Champagne', new Province('Champagne')],
  ['Charcas', new Province('Charcas')],
  ['Chengdu', new Province('Chengdu')],
  ['Chile', new Province('Chile')],
  ['Circassia', new Province('Circassia')],
  ['Constantinople', new Province('Constantinople')],
  ['Córdoba', new Province('Córdoba')],
  ['Coromandel', new Province('Coromandel')],
  ['Corsica', new Province('Corsica')],
  ['Cremona', new Province('Cremona')],
  ['Creta', new Province('Creta')],
  ['Crimea', new Province('Crimea')],
  ['Cuzco', new Province('Cuzco')],
  ['Cyprus', new Province('Cyprus')],
  ['Danzig', new Province('Danzig')],
  ['Deccan', new Province('Deccan')],
  ['Delhi', new Province('Delhi')],
  ['Dimashq', new Province('Dimashq')],
  ['Doab', new Province('Doab')],
  ['Don', new Province('Don')],
  ['Dresden', new Province('Dresden')],
  ['Dumyat', new Province('Dumyat')],
  ['Eastern Australia', new Province('Eastern Australia')],
  ['East Siberia', new Province('East Siberia')],
  ['Edirne', new Province('Edirne')],
  ['Edisanas', new Province('Edisanas')],
  ['Erzurum', new Province('Erzurum')],
  ['Essex', new Province('Essex')],
  ['Ethiopia', new Province('Ethiopia')],
  ['Fars', new Province('Fars')],
  ['Fayyum', new Province('Fayyum')],
  ['Ferrara', new Province('Ferrara')],
  ['Fez', new Province('Fez')],
  ['Firenze', new Province('Firenze')],
  ['Florida', new Province('Florida')],
  ['Franche-Comté', new Province('Franche-Comté')],
  ['Frankfurt', new Province('Frankfurt')],
  ['Friesland', new Province('Friesland')],
  ['Furdan', new Province('Furdan')],
  ['Galich', new Province('Galich')],
  ['Galicia', new Province('Galicia')],
  ['Gazzah', new Province('Gazzah')],
  ['Gelre', new Province('Gelre')],
  ['Genève', new Province('Genève')],
  ['Genova', new Province('Genova')],
  ['Gent', new Province('Gent')],
  ['Gharb', new Province('Gharb')],
  ['Gibraltar', new Province('Gibraltar')],
  ['Goa', new Province('Goa')],
  ['Gold Coast', new Province('Gold Coast')],
  ['Goldingen', new Province('Goldingen')],
  ['Gotland', new Province('Gotland')],
  ['Granada', new Province('Granada')],
  ['Great Lakes', new Province('Great Lakes')],
  ['Great Plains', new Province('Great Plains')],
  ['Gujarat', new Province('Gujarat')],
  ['Guria', new Province('Guria')],
  ['Guyana', new Province('Guyana')],
  ['Halab', new Province('Halab')],
  ['Hälsingland', new Province('Hälsingland')],
  ['Hamburg', new Province('Hamburg')],
  ['Hangzhou', new Province('Hangzhou')],
  ['Hannover', new Province('Hannover')],
  ['Hejaz', new Province('Hejaz')],
  ['Herat', new Province('Herat')],
  ['Holstein', new Province('Holstein')],
  ['Honshu', new Province('Honshu')],
  ['Hormuz', new Province('Hormuz')],
  ['Hüdavendigar', new Province('Hüdavendigar')],
  ['Hudson Bay', new Province('Hudson Bay')],
  ['Hum', new Province('Hum')],
  ['Hunyad', new Province('Hunyad')],
  ['Imereti', new Province('Imereti')],
  ['Isfahan', new Province('Isfahan')],
  ['Iskandariyya', new Province('Iskandariyya')],
  ['Izmir', new Province('Izmir')],
  ['Jaffa', new Province('Jaffa')],
  ['Java', new Province('Java')],
  ['Kabylia', new Province('Kabylia')],
  ['Kalisz', new Province('Kalisz')],
  ['Karaman', new Province('Karaman')],
  ['Kargopol', new Province('Kargopol')],
  ['Kärnten', new Province('Kärnten')],
  ['Kasimov', new Province('Kasimov')],
  ['Kastamonu', new Province('Kastamonu')],
  ['Katsina', new Province('Katsina')],
  ['Kaunas', new Province('Kaunas')],
  ['Kazakhstan', new Province('Kazakhstan')],
  ['Kazan', new Province('Kazan')],
  ['Khiva', new Province('Khiva')],
  ['Kijevas', new Province('Kijevas')],
  ['Kilwa', new Province('Kilwa')],
  ['Kirkuk', new Province('Kirkuk')],
  ['Kleve', new Province('Kleve')],
  ['København', new Province('København')],
  ['Köln', new Province('Köln')],
  ['Kongo', new Province('Kongo')],
  ['Königsberg', new Province('Königsberg')],
  ['Konya', new Province('Konya')],
  ['Korea', new Province('Korea')],
  ['Köslin', new Province('Köslin')],
  ['Kosovo', new Province('Kosovo')],
  ['Krain', new Province('Krain')],
  ['Kraków', new Province('Kraków')],
  ['Kulm', new Province('Kulm')],
  ['Kütahya', new Province('Kütahya')],
  ['Kyushu', new Province('Kyushu')],
  ['Kyzyl-Yar', new Province('Kyzyl-Yar')],
  ['Ladoga', new Province('Ladoga')],
  ['Laighin', new Province('Laighin')],
  ['Lancashire', new Province('Lancashire')],
  ['Landshut', new Province('Landshut')],
  ['La Plata', new Province('La Plata')],
  ['Leipzig', new Province('Leipzig')],
  ['Liège', new Province('Liège')],
  ['Lienz', new Province('Lienz')],
  ['Limousin', new Province('Limousin')],
  ['Lisboa', new Province('Lisboa')],
  ['Livland', new Province('Livland')],
  ['London', new Province('London')],
  ['Lorraine', new Province('Lorraine')],
  ['Lothian', new Province('Lothian')],
  ['Lübeck', new Province('Lübeck')],
  ['Lublin', new Province('Lublin')],
  ['Lund', new Province('Lund')],
  ['Luxembourg', new Province('Luxembourg')],
  ['Lwów', new Province('Lwów')],
  ['Lyon', new Province('Lyon')],
  ['Madagascar', new Province('Madagascar')],
  ['Madeira', new Province('Madeira')],
  ['Madrid', new Province('Madrid')],
  ['Magdeburg', new Province('Magdeburg')],
  ['Maine', new Province('Maine')],
  ['Mainz', new Province('Mainz')],
  ['Majar', new Province('Majar')],
  ['Malacca', new Province('Malacca')],
  ['Mali', new Province('Mali')],
  ['Malta', new Province('Malta')],
  ['Manchu', new Province('Manchu')],
  ['Mantova', new Province('Mantova')],
  ['Marienburg', new Province('Marienburg')],
  ['Marrakech', new Province('Marrakech')],
  ['Mecklenburg', new Province('Mecklenburg')],
  ['Menteşe', new Province('Menteşe')],
  ['Mesina', new Province('Mesina')],
  ['Mexico', new Province('Mexico')],
  ['Mhumhain', new Province('Mhumhain')],
  ['Milano', new Province('Milano')],
  ['Minas Gerais', new Province('Minas Gerais')],
  ['Minskas', new Province('Minskas')],
  ['Mississippi', new Province('Mississippi')],
  ['Mitidja', new Province('Mitidja')],
  ['Moluccas', new Province('Moluccas')],
  ['Mongolia', new Province('Mongolia')],
  ['Montpellier', new Province('Montpellier')],
  ['Morea', new Province('Morea')],
  ['Moskva', new Province('Moskva')],
  ['Mosul', new Province('Mosul')],
  ['München', new Province('München')],
  ['Münster', new Province('Münster')],
  ['Murcia', new Province('Murcia')],
  ['Murom', new Province('Murom')],
  ['Mush', new Province('Mush')],
  ['Mutapa', new Province('Mutapa')],
  ['Majd', new Province('Majd')],
  ['Namur', new Province('Namur')],
  ['Nantes', new Province('Nantes')],
  ['Napoli', new Province('Napoli')],
  ['Natal', new Province('Natal')],
  ['Naugardukas', new Province('Naugardukas')],
  ['Navarra', new Province('Navarra')],
  ['Naxos', new Province('Naxos')],
  ['Neumark', new Province('Neumark')],
  ['Neva', new Province('Neva')],
  ['New England', new Province('New England')],
  ['New Granada', new Province('New Granada')],
  ['Nizhny Novgorod', new Province('Nizhny Novgorod')],
  ['Nogai', new Province('Nogai')],
  ['Normandie', new Province('Normandie')],
  ['Northumberland', new Province('Northumberland')],
  ['Novgorod', new Province('Novgorod')],
  ['Nürnberg', new Province('Nürnberg')],
  ['Nyland', new Province('Nyland')],
  ['Odoyev', new Province('Odoyev')],
  ['Oirat', new Province('Oirat')],
  ['Okhosk', new Province('Okhosk')],
  ['Olomouc', new Province('Olomouc')],
  ['Olonets', new Province('Olonets')],
  ['Oran', new Province('Oran')],
  ['Orléans', new Province('Orléans')],
  ['Österbotten', new Province('Österbotten')],
  ['Östergötland', new Province('Östergötland')],
  ['Österreich', new Province('Österreich')],
  ['Østjylland', new Province('Østjylland')],
  ['Oxford', new Province('Oxford')],
  ['Pale', new Province('Pale')],
  ['Palermo', new Province('Palermo')],
  ['Papua', new Province('Papua')],
  ['Paris', new Province('Paris')],
  ['Parma', new Province('Parma')],
  ['Perm', new Province('Perm')],
  ['Pernambuco', new Province('Pernambuco')],
  ['Perth', new Province('Perth')],
  ['Pest', new Province('Pest')],
  ['Pfalz', new Province('Pfalz')],
  ['Philippines', new Province('Philippines')],
  ['Picardie', new Province('Picardie')],
  ['Piemonte', new Province('Piemonte')],
  ['Pisa', new Province('Pisa')],
  ['Podole', new Province('Podole')],
  ['Poitou', new Province('Poitou')],
  ['Polockas', new Province('Polockas')],
  ['Poltava', new Province('Poltava')],
  ['Porto', new Province('Porto')],
  ['Potsdam', new Province('Potsdam')],
  ['Poznań', new Province('Poznań')],
  ['Pozsony', new Province('Pozsony')],
  ['Praha', new Province('Praha')],
  ['Provence', new Province('Provence')],
  ['Pskov', new Province('Pskov')],
  ['Qafsah', new Province('Qafsah')],
  ['Qahirah', new Province('Qahirah')],
  ['Quito', new Province('Quito')],
  ['Ragusa', new Province('Ragusa')],
  ['Regensburg', new Province('Regensburg')],
  ['Rennes', new Province('Rennes')],
  ['Reval', new Province('Reval')],
  ['Rhodes', new Province('Rhodes')],
  ['Riga', new Province('Riga')],
  ['Rijeka', new Province('Rijeka')],
  ['Rio de Janeiro', new Province('Rio de Janeiro')],
  ['Roma', new Province('Roma')],
  ['Rudohori', new Province('Rudohori')],
  ['Ryazan', new Province('Ryazan')],
  ['Rzhev', new Province('Rzhev')],
  ['Saintonge', new Province('Saintonge')],
  ['Salamanca', new Province('Salamanca')],
  ['Salerno', new Province('Salerno')],
  ['Salzburg', new Province('Salzburg')],
  ['Samarkand', new Province('Samarkand')],
  ['Sandomierz', new Province('Sandomierz')],
  ['Sarai', new Province('Sarai')],
  ['Saratov', new Province('Saratov')],
  ['Sardenya', new Province('Sardenya')],
  ['Savoie', new Province('Savoie')],
  ['Selanik', new Province('Selanik')],
  ['Sevilla', new Province('Sevilla')],
  ['Shirvan', new Province('Shirvan')],
  ['Shrewsbury', new Province('Shrewsbury')],
  ['Siam', new Province('Siam')],
  ['Siena', new Province('Siena')],
  ['Sieradz', new Province('Sieradz')],
  ['Silesia', new Province('Silesia')],
  ['Silistre', new Province('Silistre')],
  ['Sivas', new Province('Sivas')],
  ['Slesvig', new Province('Slesvig')],
  ['Smederevo', new Province('Smederevo')],
  ['Smolenskas', new Province('Smolenskas')],
  ['Sofya', new Province('Sofya')],
  ['Songhai', new Province('Songhai')],
  ['Sopron', new Province('Sopron')],
  ['Sousse', new Province('Sousse')],
  ['Southern Australia', new Province('Southern Australia')],
  ['South Sumatra', new Province('South Sumatra')],
  ['St. Gallen', new Province('St. Gallen')],
  ['Steiermark', new Province('Steiermark')],
  ['Stettin', new Province('Stettin')],
  ['Stockholm', new Province('Stockholm')],
  ['Stralsund', new Province('Stralsund')],
  ['Suceava', new Province('Suceava')],
  ['Sundgau', new Province('Sundgau')],
  ['Sus', new Province('Sus')],
  ['Suzdal', new Province('Suzdal')],
  ['Szabolcs', new Province('Szabolcs')],
  ['Szepes', new Province('Szepes')],
  ['Tabriz', new Province('Tabriz')],
  ['Tafilalt', new Province('Tafilalt')],
  ['Tambov', new Province('Tambov')],
  ['Tangiers', new Province('Tangiers')],
  ['Tarabulus', new Province('Tarabulus')],
  ['Tblisi', new Province('Tblisi')],
  ['Teke', new Province('Teke')],
  ['Terek', new Province('Terek')],
  ['Tikrit', new Province('Tikrit')],
  ['Timbuktu', new Province('Timbuktu')],
  ['Timor', new Province('Timor')],
  ['Tîrgoviște', new Province('Tîrgoviște')],
  ['Tirol', new Province('Tirol')],
  ['Tlemcen', new Province('Tlemcen')],
  ['Torda', new Province('Torda')],
  ['Toulouse', new Province('Toulouse')],
  ['Trebizond', new Province('Trebizond')],
  ['Treviso', new Province('Treviso')],
  ['Trier', new Province('Trier')],
  ['Tripoli', new Province('Tripoli')],
  ['Trondheim', new Province('Trondheim')],
  ['Tunis', new Province('Tunis')],
  ['Tver', new Province('Tver')],
  ['Tyumen', new Province('Tyumen')],
  ['Ulaidh', new Province('Ulaidh')],
  ['Ulm', new Province('Ulm')],
  ['Upper Egypt', new Province('Upper Egypt')],
  ['Ural', new Province('Ural')],
  ['Urfa', new Province('Urfa')],
  ['València', new Province('València')],
  ['Venezia', new Province('Venezia')],
  ['Verona', new Province('Verona')],
  ['Vestjylland', new Province('Vestjylland')],
  ['Viatka', new Province('Viatka')],
  ['Vilnius', new Province('Vilnius')],
  ['Virginia', new Province('Virginia')],
  ['Vladimir', new Province('Vladimir')],
  ['Vogelkop', new Province('Vogelkop')],
  ['Volga', new Province('Volga')],
  ['Vologda', new Province('Vologda')],
  ['Voluine', new Province('Voluine')],
  ['Wales', new Province('Wales')],
  ['Warszawa', new Province('Warszawa')],
  ['Wessex', new Province('Wessex')],
  ['Western Australia', new Province('Western Australia')],
  ['West Siberia', new Province('West Siberia')],
  ['Wien', new Province('Wien')],
  ['Wittenberg', new Province('Wittenberg')],
  ['Xi\'an', new Province('Xi\'an')],
  ['Yanya', new Province('Yanya')],
  ['Yarkand', new Province('Yarkand')],
  ['Yaroslavl', new Province('Yaroslavl')],
  ['Yedi-Shkul', new Province('Yedi-Shkul')],
  ['Yemen', new Province('Yemen')],
  ['Yerevan', new Province('Yerevan')],
  ['York', new Province('York')],
  ['Zagreb', new Province('Zagreb')],
  ['Zaproze', new Province('Zaproze')],
  ['Zara', new Province('Zara')],
  ['Zaragoza', new Province('Zaragoza')],
  ['Zeeland', new Province('Zeeland')],
  ['Žemaitija', new Province('Žemaitija')]
])

const SEA_ZONES = new Map<string, SeaZone>([
  ['Adriatic Sea', new SeaZone('Adriatic Sea', 3)],
  ['Aegean Sea', new SeaZone('Aegean Sea', 2)],
  ['Baltic Sea', new SeaZone('Baltic Sea', 3)],
  ['Bay of Biscay', new SeaZone('Bay of Biscay', 3)],
  ['Black Sea', new SeaZone('Black Sea', 3)],
  ['Caribbean Sea', new SeaZone('Caribbean Sea', 3)],
  ['Central Atlantic', new SeaZone('Central Atlantic', 3)],
  ['Central Mediterranean', new SeaZone('Central Mediterranean', 2)],
  ['Doggerbank', new SeaZone('Doggerbank', 2)],
  ['East African Coast', new SeaZone('East African Coast', 2)],
  ['Eastern Atlantic', new SeaZone('Eastern Atlantic', 2)],
  ['Eastern Mediterranean', new SeaZone('Eastern Mediterranean', 3)],
  ['Eastern Pacific', new SeaZone('Eastern Pacific', 0)],
  ['East Indies', new SeaZone('East Indies', 3)],
  ['English Channel', new SeaZone('English Channel', 3)],
  ['Great Australian Bight', new SeaZone('Great Australian Bight', 2)],
  ['Gulf of Bothnia', new SeaZone('Gulf of Bothnia', 3)],
  ['Gulf of Lion', new SeaZone('Gulf of Lion', 3)],
  ['Indian Ocean', new SeaZone('Indian Ocean', 3)],
  ['Northeastern Atlantic', new SeaZone('Northeastern Atlantic', 2)],
  ['North Sea', new SeaZone('North Sea', 2)],
  ['Northwestern Atlantic', new SeaZone('Northwestern Atlantic', 2)],
  ['Norwegian Sea', new SeaZone('Norwegian Sea', 2)],
  ['Sea of Japan', new SeaZone('Sea of Japan', 3)],
  ['Sea of Okhotsk', new SeaZone('Sea of Okhotsk', 0)],
  ['Skagerrak', new SeaZone('Skagerrak', 3)],
  ['Southeastern Atlantic', new SeaZone('Southeastern Atlantic', 3)],
  ['Southeastern Pacific', new SeaZone('Southeastern Pacific', 3)],
  ['Southwestern Atlantic', new SeaZone('Southwestern Atlantic', 2)],
  ['Western Mediterranean', new SeaZone('Western Mediterranean', 2)]
])

const TRADE_NODES = new Map<string, TradeNode>([
  ['Adriatic Sea', new TradeNode('Adriatic Sea', [SEA_ZONES.get('Adriatic Sea')!, SEA_ZONES.get('Central Mediterranean')!, SEA_ZONES.get('Eastern Mediterranean')!])],
  ['Aleppo', new TradeNode('Aleppo', [])],
  ['Alexandria', new TradeNode('Alexandria', [SEA_ZONES.get('Aegean Sea')!, SEA_ZONES.get('Eastern Mediterranean')!])],
  ['Astrakhan', new TradeNode('Astrakhan', [])],
  ['Baltic Sea', new TradeNode('Baltic Sea', [SEA_ZONES.get('Baltic Sea')!, SEA_ZONES.get('Gulf of Bothnia')!])],
  ['Black Sea', new TradeNode('Black Sea', [SEA_ZONES.get('Black Sea')!, SEA_ZONES.get('Aegean Sea')!])],
  ['Bordeaux', new TradeNode('Bordeaux', [SEA_ZONES.get('Bay of Biscay')!, SEA_ZONES.get('Central Atlantic')!, SEA_ZONES.get('Eastern Atlantic')!])],
  ['Champagne', new TradeNode('Champagne', [])],
  ['China & Japan', new TradeNode('China & Japan', [SEA_ZONES.get('Sea of Japan')!, SEA_ZONES.get('East Indies')!])],
  ['East Indies', new TradeNode('East Indies', [SEA_ZONES.get('East Indies')!, SEA_ZONES.get('Great Australian Bight')!])],
  ['English Channel', new TradeNode('English Channel', [SEA_ZONES.get('English Channel')!, SEA_ZONES.get('Doggerbank')!, SEA_ZONES.get('North Sea')!])],
  ['Genoa', new TradeNode('Genoa', [SEA_ZONES.get('Central Mediterranean')!, SEA_ZONES.get('Gulf of Lion')!, SEA_ZONES.get('Western Mediterranean')!])],
  ['Indian Ocean', new TradeNode('Indian Ocean', [SEA_ZONES.get('East African Coast')!, SEA_ZONES.get('Indian Ocean')!])],
  ['Ivory Coast', new TradeNode('Ivory Coast', [SEA_ZONES.get('East African Coast')!, SEA_ZONES.get('Southeastern Atlantic')!])],
  ['Kazan', new TradeNode('Kazan', [])],
  ['Kiev', new TradeNode('Kiev', [])],
  ['Krakow', new TradeNode('Krakow', [])],
  ['Lübeck', new TradeNode('Lübeck', [SEA_ZONES.get('Baltic Sea')!, SEA_ZONES.get('Skagerrak')!])],
  ['Maghreb', new TradeNode('Maghreb', [])],
  ['North America', new TradeNode('North America', [SEA_ZONES.get('Northwestern Atlantic')!, SEA_ZONES.get('Caribbean Sea')!])],
  ['North Sea', new TradeNode('North Sea', [SEA_ZONES.get('Norwegian Sea')!, SEA_ZONES.get('North Sea')!, SEA_ZONES.get('Northeastern Atlantic')!, SEA_ZONES.get('Doggerbank')!])],
  ['Novgorod', new TradeNode('Novgorod', [])],
  ['Saxony', new TradeNode('Saxony', [])],
  ['Sevilla', new TradeNode('Sevilla', [SEA_ZONES.get('Central Atlantic')!, SEA_ZONES.get('Western Mediterranean')!])],
  ['South America', new TradeNode('South America', [SEA_ZONES.get('Southeastern Pacific')!, SEA_ZONES.get('Southwestern Atlantic')!])],
  ['Wien', new TradeNode('Wien', [])]
])

const TRADE_CARDS = new Map<string, TradeCard>([
  ['T01-1', new TradeCard('T01-1','Chinaware',7,12,16,8,14,19,false,false,[
    new TradeCardOption(TRADE_NODES.get('China & Japan')!,
        [PROVINCES.get('Canton')!, PROVINCES.get('Xi\'an')!, PROVINCES.get('Kyushu')!, PROVINCES.get('Hangzhou')!],
        [2, 2, 2, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('East Indies')!,
        [PROVINCES.get('Malacca')!, PROVINCES.get('Siam')!, PROVINCES.get('Burma')!, PROVINCES.get('South Sumatra')!],
        [1, 1, 1, 1], false, false)
  ],false,true,[4])],
  ['T02-1', new TradeCard('T02-1','Cloth',5,8,11,6,10,14,false,false,[
    new TradeCardOption(TRADE_NODES.get('English Channel')!,
        [PROVINCES.get('Amsterdam')!, PROVINCES.get('Antwerpen')!, PROVINCES.get('Brugge')!, PROVINCES.get('London')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Genoa')!,
        [PROVINCES.get('Genova')!, PROVINCES.get('Firenze')!, PROVINCES.get('Montpellier')!, PROVINCES.get('València')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Alexandria')!,
        [PROVINCES.get('Iskandariyya')!, PROVINCES.get('Qahirah')!, PROVINCES.get('Dumyat')!, PROVINCES.get('Hejaz')!],
        [1, 1, 1, 1], false, false, TRADE_NODES.get('Aleppo')!)
  ],false,false,[])],
  ['T02-2', new TradeCard('T02-2','Cloth',5,8,11,6,10,14,false,false,[
    new TradeCardOption(TRADE_NODES.get('English Channel')!,
        [PROVINCES.get('Amsterdam')!, PROVINCES.get('Antwerpen')!, PROVINCES.get('Normandie')!, PROVINCES.get('London')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Champagne')!,
        [PROVINCES.get('Champagne')!, PROVINCES.get('Savoie')!, PROVINCES.get('Lorraine')!, PROVINCES.get('Genève')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Adriatic Sea')!,
        [PROVINCES.get('Venezia')!, PROVINCES.get('Milano')!, PROVINCES.get('Brescia')!, PROVINCES.get('Rijeka')!],
        [1, 1, 1, 1], false, false)
  ],false,false,[])],
  ['T02-3', new TradeCard('T02-3','Cloth',5,8,11,6,10,14,false,false,[
    new TradeCardOption(TRADE_NODES.get('English Channel')!,
        [PROVINCES.get('London')!, PROVINCES.get('Essex')!, PROVINCES.get('York')!, PROVINCES.get('Antwerpen')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Saxony')!,
        [PROVINCES.get('Praha')!, PROVINCES.get('Berlin')!, PROVINCES.get('Magdeburg')!, PROVINCES.get('Frankfurt')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Maghreb')!,
        [PROVINCES.get('Tunis')!, PROVINCES.get('Gharb')!, PROVINCES.get('Tlemcen')!, PROVINCES.get('Timbuktu')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Genoa')!)
  ],false,false,[])],
  ['T02-4', new TradeCard('T02-4','Cloth',5,8,11,6,10,14,false,false,[
    new TradeCardOption(TRADE_NODES.get('Champagne')!,
        [PROVINCES.get('Champagne')!, PROVINCES.get('Bourgogne')!, PROVINCES.get('Lorraine')!, PROVINCES.get('Genève')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Wien')!,
        [PROVINCES.get('Wien')!, PROVINCES.get('Pozsony')!, PROVINCES.get('Regensburg')!, PROVINCES.get('Ulm')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Krakow')!,
        [PROVINCES.get('Kraków')!, PROVINCES.get('Warszawa')!, PROVINCES.get('Lwów')!, PROVINCES.get('Silesia')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Lübeck')!)
  ],false,false,[])],
  ['T03-1', new TradeCard('T03-1','Cocoa',7,12,16,8,14,19,false,false,[
    new TradeCardOption(TRADE_NODES.get('South America')!,
        [PROVINCES.get('Pernambuco')!, PROVINCES.get('Bahia')!, PROVINCES.get('Rio de Janeiro')!, PROVINCES.get('Amazonas')!],
        [1, 1, 1, 1], true, false),
    new TradeCardOption(TRADE_NODES.get('North America')!,
        [PROVINCES.get('Mexico')!, PROVINCES.get('Central America')!, PROVINCES.get('New Granada')!, PROVINCES.get('Guyana')!],
        [2, 2, 1, 1], false, false)
  ],false,true,[1])],
  ['T04-1', new TradeCard('T04-1','Coffee',4,7,9,5,8,11,false,false,[
    new TradeCardOption(TRADE_NODES.get('South America')!,
        [PROVINCES.get('Guyana')!, PROVINCES.get('Pernambuco')!, PROVINCES.get('Bahia')!],
        [1, 1, 1], true, false),
    new TradeCardOption(TRADE_NODES.get('Ivory Coast')!,
        [PROVINCES.get('Benin')!, PROVINCES.get('Songhai')!, PROVINCES.get('Timbuktu')!],
        [1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Yemen')!, PROVINCES.get('Ethiopia')!, PROVINCES.get('Adal')!, PROVINCES.get('Coromandel')!],
        [2, 2, 1, 1], false, false)
  ],false,true,[1,2,3])],
  ['T05-1', new TradeCard('T05-1','Copper',6,10,14,7,12,16,false,false,[
    new TradeCardOption(TRADE_NODES.get('East Indies')!,
        [PROVINCES.get('Malacca')!, PROVINCES.get('Burma')!, PROVINCES.get('South Sumatra')!],
        [1, 1, 1], false, false, TRADE_NODES.get('China & Japan')!),
    new TradeCardOption(TRADE_NODES.get('Black Sea')!,
        [PROVINCES.get('Constantinople')!, PROVINCES.get('Hüdavendigar')!, PROVINCES.get('Basarabia')!, PROVINCES.get('Trebizond')!],
        [1, 1, 1, 1], false, false, TRADE_NODES.get('Wien')!),
    new TradeCardOption(TRADE_NODES.get('Kazan')!,
        [PROVINCES.get('Kazan')!, PROVINCES.get('Nizhny Novgorod')!, PROVINCES.get('Perm')!, PROVINCES.get('Viatka')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Novgorod')!)
  ],false,false,[4])],
  ['T06-1', new TradeCard('T06-1','Cotton',6,10,14,7,12,16,false,false,[
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Bengal')!, PROVINCES.get('Gujarat')!, PROVINCES.get('Doab')!, PROVINCES.get('Delhi')!],
        [3, 2, 2, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('North America')!,
        [PROVINCES.get('Mississippi')!, PROVINCES.get('Virginia')!, PROVINCES.get('Florida')!, PROVINCES.get('Antilles')!],
        [2, 1, 1, 1], true, false),
    new TradeCardOption(TRADE_NODES.get('East Indies')!,
        [PROVINCES.get('Moluccas')!, PROVINCES.get('Java')!, PROVINCES.get('Papua')!],
        [2, 1, 1], true, false)
  ],false,true,[1,3,4])],
  ['T07-1', new TradeCard('T07-1','Dyes',7,12,16,8,14,19,false,false,[
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Delhi')!, PROVINCES.get('Gujarat')!, PROVINCES.get('Doab')!, PROVINCES.get('Deccan')!],
        [2, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Ivory Coast')!,
        [PROVINCES.get('Songhai')!, PROVINCES.get('Benin')!, PROVINCES.get('Gold Coast')!],
        [2, 1, 1], false, false, TRADE_NODES.get('Maghreb')),
    new TradeCardOption(TRADE_NODES.get('Black Sea')!,
        [PROVINCES.get('Constantinople')!, PROVINCES.get('Tblisi')!, PROVINCES.get('Caffa')!],
        [1, 1, 1], false, false)
  ],false,false,[2,3])],
  ['T08-1', new TradeCard('T08-1','Fish',3,5,7,4,7,9,false,false,[
    new TradeCardOption(TRADE_NODES.get('North Sea')!,
        [PROVINCES.get('Lothian')!, PROVINCES.get('Aberdeen')!, PROVINCES.get('Bergenhus')!, PROVINCES.get('Trondheim')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Lübeck')!,
        [PROVINCES.get('Lübeck')!, PROVINCES.get('København')!, PROVINCES.get('Lund')!, PROVINCES.get('Hamburg')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Sevilla')!,
        [PROVINCES.get('Sevilla')!, PROVINCES.get('Lisboa')!, PROVINCES.get('Porto')!, PROVINCES.get('Ceuta')!],
        [1, 1, 1, 1], false, false)
  ],false,false,[])],
  ['T08-2', new TradeCard('T08-2','Fish',3,5,7,4,7,9,false,false,[
    new TradeCardOption(TRADE_NODES.get('North Sea')!,
        [PROVINCES.get('Lothian')!, PROVINCES.get('Aberdeen')!, PROVINCES.get('Bergenhus')!, PROVINCES.get('Trondheim')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Genoa')!,
        [PROVINCES.get('Genova')!, PROVINCES.get('Barcelona')!, PROVINCES.get('Mesina')!, PROVINCES.get('Napoli')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Sevilla')!,
        [PROVINCES.get('Sevilla')!, PROVINCES.get('Lisboa')!, PROVINCES.get('Porto')!, PROVINCES.get('Ceuta')!],
        [1, 1, 1, 1], false, false)
  ],false,false,[])],
  ['T08-3', new TradeCard('T08-3','Fish',3,5,7,4,7,9,false,false,[
    new TradeCardOption(TRADE_NODES.get('English Channel')!,
        [PROVINCES.get('Amsterdam')!, PROVINCES.get('London')!, PROVINCES.get('Wessex')!, PROVINCES.get('Rennes')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Lübeck')!,
        [PROVINCES.get('Lübeck')!, PROVINCES.get('København')!, PROVINCES.get('Lund')!, PROVINCES.get('Hamburg')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Adriatic Sea')!,
        [PROVINCES.get('Venezia')!, PROVINCES.get('Ragusa')!, PROVINCES.get('Athina')!, PROVINCES.get('Creta')!],
        [1, 1, 1, 1], false, false)
  ],false,false,[])],
  ['T09-1', new TradeCard('T09-1','Fur',5,8,11,6,10,14,false,false,[
    new TradeCardOption(TRADE_NODES.get('North America')!,
        [PROVINCES.get('Hudson Bay')!, PROVINCES.get('Canada')!, PROVINCES.get('Great Lakes')!, PROVINCES.get('New England')!],
        [2, 2, 2, 1], true, false),
    new TradeCardOption(TRADE_NODES.get('Novgorod')!,
        [PROVINCES.get('Novgorod')!, PROVINCES.get('Neva')!, PROVINCES.get('Ladoga')!, PROVINCES.get('Arkhangelsk')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Baltic Sea')),
    new TradeCardOption(TRADE_NODES.get('Kazan')!,
        [PROVINCES.get('West Siberia')!, PROVINCES.get('Kazan')!, PROVINCES.get('Perm')!, PROVINCES.get('Tyumen')!],
        [3, 2, 2, 2], false, false, TRADE_NODES.get('Astrakhan'))
  ],true,false,[1])],
  ['T10-1', new TradeCard('T10-1','Glass',5,8,11,6,10,14,false,false,[
    new TradeCardOption(TRADE_NODES.get('English Channel')!,
        [PROVINCES.get('London')!, PROVINCES.get('Antwerpen')!, PROVINCES.get('Caux')!, PROVINCES.get('Liège')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Adriatic Sea')!,
        [PROVINCES.get('Venezia')!, PROVINCES.get('Ragusa')!],
        [2, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Genoa')!,
        [PROVINCES.get('Genova')!, PROVINCES.get('Siena')!, PROVINCES.get('Barcelona')!],
        [1, 1, 1], false, false)
  ],false,false,[])],
  ['T11-1', new TradeCard('T11-1','Gold',10,16,22,10,16,22,true,false,[
    new TradeCardOption(TRADE_NODES.get('Wien')!,
        [PROVINCES.get('Pest')!, PROVINCES.get('Pozsony')!, PROVINCES.get('Tirol')!, PROVINCES.get('Rudohori')!],
        [2, 1, 1, 1], false, true),
    new TradeCardOption(TRADE_NODES.get('Maghreb')!,
        [PROVINCES.get('Timbuktu')!, PROVINCES.get('Songhai')!, PROVINCES.get('Tafilalt')!, PROVINCES.get('Marrakech')!],
        [2, 1, 1, 1], false, true),
    new TradeCardOption(TRADE_NODES.get('Ivory Coast')!,
        [PROVINCES.get('Mali')!, PROVINCES.get('Songhai')!, PROVINCES.get('Benin')!, PROVINCES.get('Gold Coast')!],
        [2, 1, 1, 1], false, true)
  ],false,false,[2])],
  ['T11-2', new TradeCard('T11-2','Gold',10,16,22,10,16,22,true,false,[
    new TradeCardOption(TRADE_NODES.get('South America')!,
        [PROVINCES.get('Cuzco')!, PROVINCES.get('Charcas')!, PROVINCES.get('Minas Gerais')!, PROVINCES.get('La Plata')!],
        [3, 2, 2, 1], false, true),
    new TradeCardOption(TRADE_NODES.get('North America')!,
        [PROVINCES.get('Mexico')!, PROVINCES.get('New Granada')!],
        [3, 1], false, true),
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Mutapa')!, PROVINCES.get('Ethiopia')!, PROVINCES.get('Kilwa')!, PROVINCES.get('Yemen')!],
        [2, 1, 1, 1], false, true)
  ],false,true,[1,3])],
  ['T11-3', new TradeCard('T11-3','Gold',10,16,22,10,16,22,true,false,[
    new TradeCardOption(TRADE_NODES.get('South America')!,
        [PROVINCES.get('Cuzco')!, PROVINCES.get('Charcas')!, PROVINCES.get('Minas Gerais')!, PROVINCES.get('La Plata')!],
        [3, 2, 2, 1], false, true),
    new TradeCardOption(TRADE_NODES.get('North America')!,
        [PROVINCES.get('Mexico')!, PROVINCES.get('New Granada')!],
        [3, 1], false, true),
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Mutapa')!, PROVINCES.get('Ethiopia')!, PROVINCES.get('Kilwa')!, PROVINCES.get('Yemen')!],
        [2, 1, 1, 1], false, true)
  ],false,true,[1,3])],
  ['T12-1', new TradeCard('T12-1','Grain',3,5,7,4,7,9,false,false,[
    new TradeCardOption(TRADE_NODES.get('North America')!,
        [PROVINCES.get('Mississippi')!, PROVINCES.get('Great Plains')!, PROVINCES.get('Virginia')!, PROVINCES.get('Great Lakes')!],
        [2, 2, 1, 1], true, false),
    new TradeCardOption(TRADE_NODES.get('Alexandria')!,
        [PROVINCES.get('Iskandariyya')!, PROVINCES.get('Dumyat')!, PROVINCES.get('Qahirah')!, PROVINCES.get('Al-Quds')!],
        [1, 1, 1, 1], false, false, TRADE_NODES.get('Adriatic Sea')),
    new TradeCardOption(TRADE_NODES.get('Novgorod')!,
        [PROVINCES.get('Novgorod')!, PROVINCES.get('Moskva')!, PROVINCES.get('Tver')!, PROVINCES.get('Suzdal')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Baltic Sea'))
  ],false,false,[1])],
  ['T12-2', new TradeCard('T12-2','Grain',3,5,7,4,7,9,false,false,[
    new TradeCardOption(TRADE_NODES.get('Wien')!,
        [PROVINCES.get('Wien')!, PROVINCES.get('München')!, PROVINCES.get('Pozsony')!, PROVINCES.get('Pest')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Krakow')!,
        [PROVINCES.get('Kraków')!, PROVINCES.get('Kulm')!, PROVINCES.get('Silesia')!, PROVINCES.get('Sieradz')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Baltic Sea')),
    new TradeCardOption(TRADE_NODES.get('Kazan')!,
        [PROVINCES.get('Kazan')!, PROVINCES.get('Murom')!, PROVINCES.get('Volga')!],
        [2, 2, 3], false, false, TRADE_NODES.get('Astrakhan'))
  ],false,false,[])],
  ['T12-3', new TradeCard('T12-3','Grain',3,5,7,4,7,9,false,false,[
    new TradeCardOption(TRADE_NODES.get('Ivory Coast')!,
        [PROVINCES.get('Songhai')!, PROVINCES.get('Katsina')!],
        [2, 1], false, false, TRADE_NODES.get('Maghreb')),
    new TradeCardOption(TRADE_NODES.get('Kiev')!,
        [PROVINCES.get('Kijevas')!, PROVINCES.get('Smolenskas')!, PROVINCES.get('Vilnius')!, PROVINCES.get('Odoyev')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Novgorod')),
    new TradeCardOption(TRADE_NODES.get('Baltic Sea')!,
        [PROVINCES.get('Danzig')!, PROVINCES.get('Stockholm')!, PROVINCES.get('Riga')!, PROVINCES.get('Reval')!],
        [1, 1, 1, 1], false, false, TRADE_NODES.get('Lübeck'))
  ],false,false,[2])],
  ['T13-1', new TradeCard('T13-1','Iron',5,8,11,6,10,14,false,false,[
    new TradeCardOption(TRADE_NODES.get('Wien')!,
        [PROVINCES.get('Wien')!, PROVINCES.get('Kärnten')!, PROVINCES.get('Lienz')!, PROVINCES.get('Hunyad')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Champagne')!,
        [PROVINCES.get('Champagne')!, PROVINCES.get('Lorraine')!, PROVINCES.get('Namur')!, PROVINCES.get('Bern')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Novgorod')!,
        [PROVINCES.get('Novgorod')!, PROVINCES.get('Moskva')!, PROVINCES.get('Vladimir')!, PROVINCES.get('Polockas')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Kiev'))
  ],false,false,[])],
  ['T13-2', new TradeCard('T13-2','Iron',5,8,11,6,10,14,false,false,[
    new TradeCardOption(TRADE_NODES.get('Bordeaux')!,
        [PROVINCES.get('Bordeaux')!, PROVINCES.get('Bourbon')!, PROVINCES.get('Navarra')!, PROVINCES.get('Nantes')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Baltic Sea')!,
        [PROVINCES.get('Danzig')!, PROVINCES.get('Stockholm')!, PROVINCES.get('Bergslagen')!],
        [1, 1, 1], false, false, TRADE_NODES.get('Lübeck')),
    new TradeCardOption(TRADE_NODES.get('Astrakhan')!,
        [PROVINCES.get('Astrakhan')!, PROVINCES.get('Tambov')!, PROVINCES.get('Nogai')!, PROVINCES.get('Samarkand')!],
        [2, 2, 3, 2], false, false, TRADE_NODES.get('Kiev'))
  ],false,false,[])],
  ['T13-3', new TradeCard('T13-3','Iron',5,8,11,6,10,14,false,false,[
    new TradeCardOption(TRADE_NODES.get('Saxony')!,
        [PROVINCES.get('Dresden')!, PROVINCES.get('Berlin')!, PROVINCES.get('Braunschweig')!, PROVINCES.get('Praha')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('North America')!,
        [PROVINCES.get('Virginia')!, PROVINCES.get('Great Lakes')!, PROVINCES.get('Canada')!],
        [1, 1, 1], true, false),
    new TradeCardOption(TRADE_NODES.get('Kazan')!,
        [PROVINCES.get('Kazan')!, PROVINCES.get('Volga')!, PROVINCES.get('Ural')!],
        [2, 3, 2], false, false, TRADE_NODES.get('Novgorod'))
  ],false,false,[1])],
  ['T14-1', new TradeCard('T14-1','Ivory',7,12,16,8,14,19,false,false,[
    new TradeCardOption(TRADE_NODES.get('Ivory Coast')!,
        [PROVINCES.get('Mali')!, PROVINCES.get('Benin')!, PROVINCES.get('Kongo')!],
        [2, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('East Indies')!,
        [PROVINCES.get('Siam')!, PROVINCES.get('Burma')!],
        [2, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Mutapa')!, PROVINCES.get('Kilwa')!, PROVINCES.get('Ajuuraan')!],
        [2, 2, 1], false, false)
  ],false,true,[2,3,4])],
  ['T15-1', new TradeCard('T15-1','Livestock',3,5,7,4,7,9,false,false,[
    new TradeCardOption(TRADE_NODES.get('Sevilla')!,
        [PROVINCES.get('Sevilla')!, PROVINCES.get('Salamanca')!, PROVINCES.get('Galicia')!, PROVINCES.get('Badajoz')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Alexandria')!,
        [PROVINCES.get('Iskandariyya')!, PROVINCES.get('Qahirah')!, PROVINCES.get('Bangazi')!, PROVINCES.get('Upper Egypt')!],
        [1, 1, 1, 1], false, false, TRADE_NODES.get('Adriatic Sea')),
    new TradeCardOption(TRADE_NODES.get('Kiev')!,
        [PROVINCES.get('Kijevas')!, PROVINCES.get('Vilnius')!, PROVINCES.get('Voluine')!, PROVINCES.get('Podole')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Krakow'))
  ],false,false,[])],
  ['T15-2', new TradeCard('T15-2','Livestock',3,5,7,4,7,9,false,false,[
    new TradeCardOption(TRADE_NODES.get('North Sea')!,
        [PROVINCES.get('Lothian')!, PROVINCES.get('Perth')!, PROVINCES.get('Pale')!, PROVINCES.get('Laighin')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Maghreb')!,
        [PROVINCES.get('Timbuktu')!, PROVINCES.get('Songhai')!, PROVINCES.get('Katsina')!, PROVINCES.get('Tripoli')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Sevilla')),
    new TradeCardOption(TRADE_NODES.get('Aleppo')!,
        [PROVINCES.get('Halab')!, PROVINCES.get('Karaman')!, PROVINCES.get('Dimashq')!, PROVINCES.get('Tarabulus')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Alexandria'))
  ],false,false,[])],
  ['T15-3', new TradeCard('T15-3','Livestock',3,5,7,4,7,9,false,false,[
    new TradeCardOption(TRADE_NODES.get('Lübeck')!,
        [PROVINCES.get('Lübeck')!, PROVINCES.get('Slesvig')!, PROVINCES.get('Holstein')!, PROVINCES.get('Bremen')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Bordeaux')!,
        [PROVINCES.get('Bordeaux')!, PROVINCES.get('Poitou')!, PROVINCES.get('Limousin')!, PROVINCES.get('Bourbon')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Astrakhan')!,
        [PROVINCES.get('Astrakhan')!, PROVINCES.get('Saratov')!, PROVINCES.get('Nogai')!, PROVINCES.get('Samarkand')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Kazan'))
  ],false,false,[])],
  ['T16-1', new TradeCard('T16-1','Naval Supplies',3,5,7,4,7,9,false,false,[
    new TradeCardOption(TRADE_NODES.get('Lübeck')!,
        [PROVINCES.get('Lübeck')!, PROVINCES.get('Stettin')!, PROVINCES.get('Akershus')!, PROVINCES.get('København')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('North America')!,
        [PROVINCES.get('Virginia')!, PROVINCES.get('New England')!, PROVINCES.get('Canada')!, PROVINCES.get('Hudson Bay')!],
        [1, 1, 1, 1], true, false),
    new TradeCardOption(TRADE_NODES.get('Baltic Sea')!,
        [PROVINCES.get('Danzig')!, PROVINCES.get('Stockholm')!, PROVINCES.get('Riga')!, PROVINCES.get('Königsberg')!],
        [1, 1, 1, 1], false, false)
  ],false,false,[1])],
  ['T17-1', new TradeCard('T17-1','Paper',6,10,14,7,12,16,false,false,[
    new TradeCardOption(TRADE_NODES.get('Genoa')!,
        [PROVINCES.get('Genova')!, PROVINCES.get('Roma')!, PROVINCES.get('Lyon')!, PROVINCES.get('Avignon')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Saxony')!,
        [PROVINCES.get('Frankfurt')!, PROVINCES.get('Nürnberg')!, PROVINCES.get('Praha')!, PROVINCES.get('Mainz')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Champagne')!,
        [PROVINCES.get('Champagne')!, PROVINCES.get('Paris')!, PROVINCES.get('Bourgogne')!, PROVINCES.get('Lorraine')!],
        [2, 2, 2, 2], false, false)
  ],false,false,[])],
  ['T18-1', new TradeCard('T18-1','Salt',4,7,9,5,8,11,false,false,[
    new TradeCardOption(TRADE_NODES.get('Adriatic Sea')!,
        [PROVINCES.get('Venezia')!, PROVINCES.get('Ferrara')!, PROVINCES.get('Ragusa')!, PROVINCES.get('Bosnia')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Wien')!,
        [PROVINCES.get('Wien')!, PROVINCES.get('Salzburg')!, PROVINCES.get('Regensburg')!, PROVINCES.get('Pest')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Black Sea')!,
        [PROVINCES.get('Constantinople')!, PROVINCES.get('Caffa')!, PROVINCES.get('Azov')!, PROVINCES.get('Izmir')!],
        [1, 1, 1, 1], false, false)
  ],false,false,[])],
  ['T18-2', new TradeCard('T18-2','Salt',4,7,9,5,8,11,false,false,[
    new TradeCardOption(TRADE_NODES.get('Bordeaux')!,
        [PROVINCES.get('Bordeaux')!, PROVINCES.get('Nantes')!, PROVINCES.get('Saintonge')!, PROVINCES.get('Rennes')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('China & Japan')!,
        [PROVINCES.get('Hangzhou')!, PROVINCES.get('Xi\'an')!],
        [1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Krakow')!,
        [PROVINCES.get('Kraków')!, PROVINCES.get('Lwów')!, PROVINCES.get('Silesia')!, PROVINCES.get('Poznań')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Lübeck'))
  ],false,false,[4])],
  ['T19-1', new TradeCard('T19-1','Silk',7,12,16,8,14,19,false,false,[
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Isfahan')!, PROVINCES.get('Delhi')!, PROVINCES.get('Doab')!, PROVINCES.get('Bengal')!],
        [2, 2, 1, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('China & Japan')!,
        [PROVINCES.get('Hangzhou')!, PROVINCES.get('Kyushu')!, PROVINCES.get('Chengdu')!],
        [3, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Aleppo')!,
        [PROVINCES.get('Halab')!, PROVINCES.get('Dimashq')!, PROVINCES.get('Tabriz')!, PROVINCES.get('Baghdad')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Alexandria'))
  ],true,false,[3,4])],
  ['T19-2', new TradeCard('T19-2','Silk',7,12,16,8,14,19,false,false,[
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Isfahan')!, PROVINCES.get('Delhi')!, PROVINCES.get('Doab')!, PROVINCES.get('Bengal')!],
        [2, 2, 1, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('China & Japan')!,
        [PROVINCES.get('Hangzhou')!, PROVINCES.get('Kyushu')!, PROVINCES.get('Chengdu')!],
        [3, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Aleppo')!,
        [PROVINCES.get('Halab')!, PROVINCES.get('Dimashq')!, PROVINCES.get('Tabriz')!, PROVINCES.get('Baghdad')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Alexandria'))
  ],true,false,[3,4])],
  ['T20-1', new TradeCard('T20-1','Slaves',6,10,14,7,12,16,false,true,[
    new TradeCardOption(TRADE_NODES.get('Ivory Coast')!,
        [PROVINCES.get('Kongo')!, PROVINCES.get('Mali')!, PROVINCES.get('Angola')!, PROVINCES.get('Benin')!],
        [2, 2, 2, 1], false, false, TRADE_NODES.get('Maghreb')),
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Kilwa')!, PROVINCES.get('Yemen')!, PROVINCES.get('Ethiopia')!, PROVINCES.get('Madagascar')!],
        [2, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Black Sea')!,
        [PROVINCES.get('Constantinople')!, PROVINCES.get('Caffa')!, PROVINCES.get('Azov')!, PROVINCES.get('Circassia')!],
        [1, 1, 1, 1], false, false, TRADE_NODES.get('Alexandria'))
  ],false,false,[2,3])],
  ['T21-1', new TradeCard('T21-1','Spices',7,12,16,8,14,19,false,false,[
    new TradeCardOption(TRADE_NODES.get('East Indies')!,
        [PROVINCES.get('Malacca')!, PROVINCES.get('Moluccas')!, PROVINCES.get('Philippines')!, PROVINCES.get('Brunei')!],
        [2, 2, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Coromandel')!, PROVINCES.get('Bengal')!, PROVINCES.get('Goa')!, PROVINCES.get('Fars')!],
        [2, 2, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Alexandria')!,
        [PROVINCES.get('Iskandariyya')!, PROVINCES.get('Qahirah')!, PROVINCES.get('Yemen')!, PROVINCES.get('Hejaz')!],
        [1, 1, 1, 1], false, false, TRADE_NODES.get('Adriatic Sea'))
  ],false,false,[3,4])],
  ['T21-2', new TradeCard('T21-2','Spices',7,12,16,8,14,19,false,false,[
    new TradeCardOption(TRADE_NODES.get('East Indies')!,
        [PROVINCES.get('Malacca')!, PROVINCES.get('Moluccas')!, PROVINCES.get('Philippines')!, PROVINCES.get('Brunei')!],
        [2, 2, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Indian Ocean')!,
        [PROVINCES.get('Coromandel')!, PROVINCES.get('Bengal')!, PROVINCES.get('Goa')!, PROVINCES.get('Fars')!],
        [2, 2, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('China & Japan')!,
        [PROVINCES.get('Canton')!, PROVINCES.get('Chengdu')!],
        [2, 1], false, false)
  ],false,true,[3,4])],
  ['T22-1', new TradeCard('T22-1','Sugar',6,10,14,7,12,16,false,false,[
    new TradeCardOption(TRADE_NODES.get('Maghreb')!,
        [PROVINCES.get('Marrakech')!, PROVINCES.get('Sus')!, PROVINCES.get('Tunis')!, PROVINCES.get('Madeira')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Sevilla')),
    new TradeCardOption(TRADE_NODES.get('North America')!,
        [PROVINCES.get('Mexico')!, PROVINCES.get('Antilles')!, PROVINCES.get('Florida')!],
        [2, 2, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('South America')!,
        [PROVINCES.get('Bahia')!, PROVINCES.get('Pernambuco')!, PROVINCES.get('Amazonas')!, PROVINCES.get('Guyana')!],
        [1, 1, 1, 1], true, false)
  ],false,false,[1])],
  ['T23-1', new TradeCard('T23-1','Tea',6,10,14,7,12,16,false,false,[
    new TradeCardOption(TRADE_NODES.get('China & Japan')!,
        [PROVINCES.get('Hangzhou')!, PROVINCES.get('Chengdu')!, PROVINCES.get('Kyushu')!, PROVINCES.get('Canton')!],
        [2, 2, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('East Indies')!,
        [PROVINCES.get('Malacca')!, PROVINCES.get('Siam')!, PROVINCES.get('Burma')!],
        [1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Astrakhan')!,
        [PROVINCES.get('Astrakhan')!, PROVINCES.get('Samarkand')!],
        [2, 2], false, false, TRADE_NODES.get('Black Sea'))
  ],true,false,[4])],
  ['T24-1', new TradeCard('T24-1','Tobacco',6,10,14,7,12,16,false,false,[
    new TradeCardOption(TRADE_NODES.get('North America')!,
        [PROVINCES.get('Virginia')!, PROVINCES.get('Great Lakes')!, PROVINCES.get('Mississippi')!, PROVINCES.get('Antilles')!],
        [2, 1, 1, 1], true, false),
    new TradeCardOption(TRADE_NODES.get('South America')!,
        [PROVINCES.get('Bahia')!, PROVINCES.get('Pernambuco')!, PROVINCES.get('Amazonas')!, PROVINCES.get('New Granada')!],
        [1, 1, 1, 1], true, false)
  ],false,true,[1])],
  ['T25-1', new TradeCard('T25-1','Wine',4,7,9,5,8,11,false,false,[
    new TradeCardOption(TRADE_NODES.get('Bordeaux')!,
        [PROVINCES.get('Bordeaux')!, PROVINCES.get('Toulouse')!, PROVINCES.get('Nantes')!, PROVINCES.get('Armagnac')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Saxony')!,
        [PROVINCES.get('Frankfurt')!, PROVINCES.get('Nürnberg')!, PROVINCES.get('Praha')!, PROVINCES.get('Pfalz')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Genoa')!,
        [PROVINCES.get('Genova')!, PROVINCES.get('Firenze')!, PROVINCES.get('Provence')!, PROVINCES.get('Piemonte')!],
        [1, 1, 1, 1], false, false)
  ],false,false,[])],
  ['T25-2', new TradeCard('T25-2','Wine',4,7,9,5,8,11,false,false,[
    new TradeCardOption(TRADE_NODES.get('Champagne')!,
        [PROVINCES.get('Champagne')!, PROVINCES.get('Bourgogne')!, PROVINCES.get('Berry')!, PROVINCES.get('Orléans')!],
        [2, 2, 2, 2], false, false),
    new TradeCardOption(TRADE_NODES.get('Sevilla')!,
        [PROVINCES.get('Sevilla')!, PROVINCES.get('Porto')!, PROVINCES.get('Beira')!, PROVINCES.get('València')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Adriatic Sea')!,
        [PROVINCES.get('Ragusa')!, PROVINCES.get('Bari')!, PROVINCES.get('Morea')!, PROVINCES.get('Naxos')!],
        [1, 1, 1, 1], false, false)
  ],false,false,[])],
  ['T26-1', new TradeCard('T26-1','Wool',4,7,9,5,8,11,false,false,[
    new TradeCardOption(TRADE_NODES.get('North Sea')!,
        [PROVINCES.get('Lancashire')!, PROVINCES.get('Northumberland')!, PROVINCES.get('Shrewsbury')!, PROVINCES.get('Ulaidh')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Sevilla')!,
        [PROVINCES.get('Sevilla')!, PROVINCES.get('Madrid')!, PROVINCES.get('Córdoba')!, PROVINCES.get('Burgos')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Black Sea')!,
        [PROVINCES.get('Constantinople')!, PROVINCES.get('Basarabia')!, PROVINCES.get('Edisanas')!, PROVINCES.get('Selanik')!],
        [1, 1, 1, 1], false, false)
  ],false,false,[])],
  ['T26-2', new TradeCard('T26-2','Wool',4,7,9,5,8,11,false,false,[
    new TradeCardOption(TRADE_NODES.get('Adriatic Sea')!,
        [PROVINCES.get('Ragusa')!, PROVINCES.get('Zara')!, PROVINCES.get('Zagreb')!, PROVINCES.get('Beograd')!],
        [1, 1, 1, 1], false, false),
    new TradeCardOption(TRADE_NODES.get('Kiev')!,
        [PROVINCES.get('Kijevas')!, PROVINCES.get('Naugardukas')!, PROVINCES.get('Minskas')!, PROVINCES.get('Smolenskas')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Krakow')),
    new TradeCardOption(TRADE_NODES.get('Aleppo')!,
        [PROVINCES.get('Halab')!, PROVINCES.get('Mush')!, PROVINCES.get('Urfa')!, PROVINCES.get('Mosul')!],
        [2, 2, 2, 2], false, false, TRADE_NODES.get('Black Sea'))
  ],false,false,[])]
])
