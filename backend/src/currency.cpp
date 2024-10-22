#include "../headers/currency.h"


// constructors
// Currency::Currency(const std::string& name, const std::vector<double>& income, double amount, double price, int count, double risk) {
//   try {
//     /*if (name.empty()) {
//       throw std::length_error("No any name!");
//     }
//     if (income.empty()) {
//       throw std::length_error("Income graph is empty!");
//     }*/

//     name_ = name;
//     amount_ = amount;
//     price_ = price;
//     count_ = count;
//     risk_ = risk;
//     income_.reserve(income.capacity());
//     for (auto el : income) {
//       income_.push_back(el);
//     }
//   } catch (const std::exception& e) {
//     std::cerr << "Error: " << e.what() << std::endl;
//     throw;
//   }
// }

// Currency::Currency(Currency& rhs) : Active(rhs) {
//   name_ = rhs.name_;
//   amount_ = rhs.amount_;
//   price_ = rhs.price_;
//   count_ = rhs.count_;
//   risk_ = rhs.risk_;
//   income_.reserve(rhs.income_.capacity());
//   for (auto el : rhs.income_) {
//     income_.push_back(el);
//   }
// }


// // // setters
// // void Currency::setIncomeGraph(const std::vector<double>& income) {
// //   try {
// //     /*if (income.empty()) {
// //       throw std::length_error("Income graph is empty!");
// //     }*/

// //     for (auto el : income) {
// //       income_.push_back(el);
// //     }
// //   } catch (const std::exception& e) {
// //     std::cerr << "Error: " << e.what() << std::endl;
// //     throw;
// //   }
// // }

// // void Currency::setName(const std::string& name) {
// //   try {
// //     /*if (name.empty()) {
// //       throw std::length_error("No any name!");
// //     }*/

// //     name_ = name;
// //   } catch (const std::exception& e) {
// //     std::cerr << "Error: " << e.what() << std::endl;
// //     throw;
// //   }
// // }

// // void Currency::setAmount(double amount) {
// //   amount_ = amount;
// // }

// // void Currency::setPrice(double price) {
// //   price_ = price;
// // }

// // void Currency::setCount(int count) {
// //   count_ = count;
// // }

// // void Currency::setRisk(double risk) {
// //   risk_ = risk;
// // }


// // void Currency::changePrice() {
// //   double maxChange = price_ * risk_;
// //   std::uniform_int_distribution<> uid(1, int(maxChange * 100));
// //   double actualChange = uid(rng) / 100;
// //   if (!rng() % 2) {
// //     actualChange = -actualChange;
// //   }
// //   this->setPrice(price_ + actualChange);
// //   this->income_.push_back(actualChange * amount_);
// // }

// // json Currency::returnActiveInfo() {
// //   json response;

// //   response["name"] = name_;
// //   response["price"] = price_;
// //   response["change"] = income_.back();

// //   return response;
// // }
