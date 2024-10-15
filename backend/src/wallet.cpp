#include "../headers/wallet.h"


// constructors
Wallet::Wallet(std::vector<Active>& actives) {
  try {
    // ...
  } catch (const std::exception& e) {
    std::cerr << e.what() << std::endl;
    throw;
  }
}

Wallet::Wallet(const Wallet& rhs) {
  // boss-shit
}


// setters
void Wallet::setActives(std::vector<Active> &actives) {
  try {
    /*if (actives.empty()) {
      throw std::logic_error("No any Actives!");
    }*/

    // shit
  } catch (const std::exception& e) {
    std::cerr << e.what() << std::endl;
    throw;
  }
}
