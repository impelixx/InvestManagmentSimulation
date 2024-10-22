#ifndef WALLET_H
#define WALLET_H


//#include "../include/includes.h"
#include "active.h"


class Wallet {
public:
  Wallet() : actives_(std::vector<Active>()) {}
  Wallet(std::vector<Active>& actives);
  Wallet(const Wallet& rhs);
  ~Wallet() = default;

  // setters
  void setActives(std::vector<Active>& actives); // bruh

  // getters
  // ...


private:
  std::vector<Active> actives_;
};


#endif // WALLET_H
