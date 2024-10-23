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
    double open, close, max, min;
    open = Euro->getPrice();
    json response;
    std::vector <double> tmp;
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Euro->getPrice());
      Euro->changePrice();
    }
    close = Euro->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["EURO"] = {open, close, max, min};
    tmp.clear();

    open = Yuan->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Yuan->getPrice());
      Yuan->changePrice();
    }
    close = Yuan->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["CNY"] = {open, close, max, min};
    tmp.clear();

    open = Bitcoin->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Bitcoin->getPrice());
      Bitcoin->changePrice();
    }
    close = Bitcoin->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["BTC"] = {open, close, max, min};
    tmp.clear();

    open = Ethereum->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Ethereum->getPrice());
      Ethereum->changePrice();
    }
    close = Ethereum->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["ETH"] = {open, close, max, min};
    tmp.clear();

    open = Dogecoin->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Dogecoin->getPrice());
      Dogecoin->changePrice();
    }
    close = Dogecoin->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["DOGE"] = {open, close, max, min};
    tmp.clear();

    open = Ton->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Ton->getPrice());
      Ton->changePrice();
    }
    close = Ton->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["TON"] = {open, close, max, min};
    tmp.clear();
    
    open = Apple->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Apple->getPrice());
      Apple->changePrice();
    }
    close = Apple->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["AAPL"] = {open, close, max, min};
    tmp.clear();

    open = Nvidia->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Nvidia->getPrice());
      Nvidia->changePrice();
    }
    close = Nvidia->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["NVDA"] = {open, close, max, min};
    tmp.clear();

    open = Facebook->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Facebook->getPrice());
      Facebook->changePrice();
    }
    close = Facebook->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["META"] = {open, close, max, min};
    tmp.clear();

    open = YNDX->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(YNDX->getPrice());
      YNDX->changePrice();
    }
    close = YNDX->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["YNDX"] = {open, close, max, min};
    tmp.clear();

    open = GOOGL->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(GOOGL->getPrice());
      GOOGL->changePrice();
    }
    close = GOOGL->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["GOOGL"] = {open, close, max, min};
    tmp.clear();

    open = AMZN->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(AMZN->getPrice());
      AMZN->changePrice();
    }
    close = AMZN->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["AMZN"] = {open, close, max, min};
    tmp.clear();

    open = VKontakte->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(VKontakte->getPrice());
      VKontakte->changePrice();
    }
    close = VKontakte->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["VK"] = {open, close, max, min};
    tmp.clear();

    open = Tesla->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Tesla->getPrice());
      Tesla->changePrice();
    }
    close = Tesla->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["TSLA"] = {open, close, max, min};
    tmp.clear();

    open = Microsoft->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Microsoft->getPrice());
      Microsoft->changePrice();
    }
    close = Microsoft->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["MSFT"] = {open, close, max, min};
    tmp.clear();

    open = Gold->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Gold->getPrice());
      Gold->changePrice();
    }
    close = Gold->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["XAU"] = {open, close, max, min};
    tmp.clear();

    open = Silver->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Silver->getPrice());
      Silver->changePrice();
    }
    close = Silver->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["XAG"] = {open, close, max, min};
    tmp.clear();

    open = Platinum->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Platinum->getPrice());
      Platinum->changePrice();
    }
    close = Platinum->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["XPT"] = {open, close, max, min};
    tmp.clear();

    open = Palladium->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Palladium->getPrice());
      Palladium->changePrice();
    }
    close = Palladium->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["XPD"] = {open, close, max, min};
    tmp.clear();

    open = Petrol->getPrice();
    for (int i = 0; i < 30; ++i) {
      tmp.push_back(Petrol->getPrice());
      Petrol->changePrice();
    }
    close = Petrol->getPrice();
    std::sort(tmp.begin(), tmp.end());
    min = tmp[0];
    max = tmp[29];
    response["XPD"] = {open, close, max, min};
    tmp.clear();

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
