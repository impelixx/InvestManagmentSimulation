#include "../headers/wallet.h"
  

Wallet::Wallet() {
  Dollar = new Currency("Dollar", {1.0, 1.0, 1.0, 1.0, 1.0, 1.0}, 100.0, 1.0, 1, 0.0);
  Euro = new Currency("Euro", {1.0, 1.0, 1.0, 1.0, 1.0, 1.0}, 100.0, 1.0, 1, 0.0);
  Yuan = new Currency("Yuan", {1.0, 1.0, 1.0, 1.0, 1.0, 1.0}, 100.0, 1.0, 1, 0.0);
} 

json Wallet::doCycle() {
  double open, close, max, min;
  open = Dollar->getPrice();
  json response;
  std::vector <double> tmp;
  for (int i = 0; i < 30; ++i) {
    tmp.push_back(Dollar->getPrice());
    Dollar->changePrice();
  }
  close = Dollar->getPrice();
  std::sort(tmp.begin(), tmp.end());
  min = tmp[0];
  max = tmp[29];
  response["Dollar"] = {open, close, max, min};
  return response;
}