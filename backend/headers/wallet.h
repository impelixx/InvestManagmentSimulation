#ifndef WALLET_H
#define WALLET_H


#include "currency.h"
#include "precious_metal.h"
#include "cryptocurrency.h"
#include "oil.h"
#include "stock.h"
#include "bond.h"

#include "../include/includes.h"

#include "active.h"


class Wallet {
public:
  Wallet() {
    Euro = new Currency;
    Euro->setPrice(1);
    Euro->setName("EUR");
    Yuan = new Currency;
    Yuan->setPrice(0.1);
    Yuan->setName("CNY");
    Bitcoin = new Cryptocurrency;
    Bitcoin->setPrice(50000);
    Bitcoin->setName("BTC");
    Ethereum = new Cryptocurrency;
    Ethereum->setPrice(2000);
    Ethereum->setName("ETH");
    Dogecoin = new Cryptocurrency;
    Dogecoin->setPrice(1000);
    Dogecoin->setName("DOGE");
    Ton = new Cryptocurrency;
    Ton->setPrice(5.5);
    Ton->setName("TON");
    Apple = new Stock;
    Apple->setPrice(150);
    Apple->setName("AAPL");
    Nvidia = new Stock;
    Nvidia->setPrice(300);
    Nvidia->setName("NVDA");
    Facebook = new Stock;
    Facebook->setPrice(250);
    Facebook->setName("META");
    YNDX = new Stock;
    YNDX->setPrice(100);
    YNDX->setName("YNDX");
    GOOGL = new Stock;
    GOOGL->setPrice(200);
    GOOGL->setName("GOOGL");
    AMZN = new Stock;
    AMZN->setPrice(300);
    AMZN->setName("AMZN");
    VKontakte = new Stock;
    VKontakte->setPrice(100);
    VKontakte->setName("VKCO");
    Tesla = new Stock;
    Tesla->setPrice(200);
    Tesla->setName("TSLA");
    Microsoft = new Stock;
    Microsoft->setPrice(300);
    Microsoft->setName("MSFT");
    Gold = new PreciousMetal;
    Gold->setPrice(100);
    Gold->setName("GOLD");
    Silver = new PreciousMetal;
    Silver->setPrice(200);
    Silver->setName("SILVER");
    Platinum = new PreciousMetal;
    Platinum->setPrice(1000);
    Platinum->setName("PLAT");
    Palladium = new PreciousMetal;
    Palladium->setPrice(500);
    Palladium->setName("PAL");
    Petrol = new Oil;
    Petrol->setPrice(100);
    Petrol->setName("OIL");
  };
  ~Wallet() = default;
  json doCycle() {
    json response;

    Euro->changePrice();
    Yuan->changePrice();
    Bitcoin->changePrice();
    Ethereum->changePrice();
    Dogecoin->changePrice();
    Ton->changePrice();
    Apple->changePrice();
    Nvidia->changePrice();
    Facebook->changePrice();
    YNDX->changePrice();
    GOOGL->changePrice();
    AMZN->changePrice();
    VKontakte->changePrice();
    Tesla->changePrice();
    Microsoft->changePrice();
    Gold->changePrice();
    Silver->changePrice();
    Platinum->changePrice();
    Palladium->changePrice();
    Petrol->changePrice();

    response[Euro->getName()] = Euro->getPrice();
    response[Yuan->getName()] = Yuan->getPrice();
    response[Bitcoin->getName()] = Bitcoin->getPrice();
    response[Ethereum->getName()] = Ethereum->getPrice();
    response[Dogecoin->getName()] = Dogecoin->getPrice();
    response[Ton->getName()] = Ton->getPrice();
    response[Apple->getName()] = Apple->getPrice();
    response[Nvidia->getName()] = Nvidia->getPrice();
    response[Facebook->getName()] = Facebook->getPrice();
    response[YNDX->getName()] = YNDX->getPrice();
    response[GOOGL->getName()] = GOOGL->getPrice();
    response[AMZN->getName()] = AMZN->getPrice();
    response[VKontakte->getName()] = VKontakte->getPrice();
    response[Tesla->getName()] = Tesla->getPrice();
    response[Microsoft->getName()] = Microsoft->getPrice();
    response[Gold->getName()] = Gold->getPrice();
    response[Silver->getName()] = Silver->getPrice();
    response[Platinum->getName()] = Platinum->getPrice();
    response[Palladium->getName()] = Palladium->getPrice();
    response[Petrol->getName()] = Petrol->getPrice();
  
    return response;
  };

private:
  Currency* Euro;
  Currency* Yuan;
  Cryptocurrency* Bitcoin;
  Cryptocurrency* Ethereum;
  Cryptocurrency* Dogecoin;
  Cryptocurrency* Ton;
  Stock* Apple;
  Stock* Nvidia;
  Stock* Facebook;
  Stock* YNDX;
  Stock* GOOGL;
  Stock* AMZN;
  Stock* VKontakte;
  Stock* Tesla;
  Stock* Microsoft;
  PreciousMetal* Gold;
  PreciousMetal* Silver;
  PreciousMetal* Platinum;
  PreciousMetal* Palladium;
  Oil* Petrol;
};

/*"Apple": 150,
    "Nvidia": 300,
    "Facebook": 250,
    "Bitcoin": 50000,
    "Ethereum": 2000,
    "Gold": 2000,
    "USD": 1,
    "TON": 5.5,
    "YNDX": 20,
    "GOOGL": 2000,
    "AMZN": 3000,
    "VKontakte": 100,
    "Tesla": 600,
    "Microsoft": 250,
    "Netflix": 500,
    "Twitter": 100,
    "Snapchat": 50,
    "Silver": 25,
    "Platinum": 1000,
    "Palladium": 500,
    "Oil": 50,*/


#endif // WALLET_H
