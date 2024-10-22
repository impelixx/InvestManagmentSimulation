// #include "../headers/oil.h"


// // setters
// void Oil::setIncomeGraph(const std::vector<double>& income) {
//   try {
//     for (auto el : income) {
//       income_.push_back(el);
//     }
//   } catch (const std::exception& e) {
//     std::cerr << "Error: " << e.what() << std::endl;
//     std::cerr << "Income graph is empty!";
//   }
// }

// void Oil::setName(const std::string& name) {
//   try {
//     name_ = name;
//   } catch (const std::exception& e) {
//     std::cerr << "Error: " << e.what() << std::endl;
//     std::cerr << "No any name!";
//   }
// }

// void Oil::setAmount(double amount) {
//   amount_ = amount;
// }

// void Oil::setPrice(double price) {
//   price_ = price;
// }

// void Oil::setCount(int count) {
//   count_ = count;
// }

// void Oil::setRisk(double risk) {
//   risk_ = risk;
// }


// void Oil::changePrice() {
//   double maxChange = price_ * risk_;
//   std::uniform_int_distribution<> uid(1, int(maxChange * 100));
//   double actualChange = uid(rng) / 100;
//   if (!rng() % 2) {
//     actualChange = -actualChange;
//   }
//   this->setPrice(price_ + actualChange);
//   this->income_.push_back(actualChange * amount_);
// }

// json Oil::returnActiveInfo() {
//   json response;

//   response["name"] = name_;
//   response["price"] = price_;
//   response["change"] = income_.back();

//   return response;
// }
