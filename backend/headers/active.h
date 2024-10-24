#ifndef ACTIVE_H
#define ACTIVE_H


#include "../include/includes.h"


class Active {
public:
	Active() : name_(":)"), amount_(0.0), price_(0.0), risk_(0.1) {}
	Active(const std::string& name, const std::vector<double>& income, double amount, double price, int count, double risk);
	Active(Active& rhs);
	~Active() = default;

	// setters
  void setIncomeGraph(const std::vector<double>& income) { income_ = income; };
  void setName(const std::string name) { name_ = name; };
  void setAmount(double amount) { amount_ = amount; };
  void setPrice(double price) { price_ = price; };
  void setRisk(double risk) { risk_ = risk;};

	// getters
	[[nodiscard]] std::vector<double> getIncomeGraph() const { return income_; }
	[[nodiscard]] std::string getName() const { return name_; }
	[[nodiscard]] double getAmount() const { return amount_; }
	[[nodiscard]] double getPrice() const { return price_; }
	[[nodiscard]] double getRisk() const { return risk_; }
  
  void changePrice() {
    double maxChange = price_ * risk_;
    std::uniform_int_distribution<> uid(1, int(maxChange * 100));
    double actualChange = uid(rng) / 100;
    if (rng() % 2 == 0) {
      actualChange = -actualChange;
    }
    this->setPrice(price_ + actualChange);
    this->income_.push_back(actualChange * amount_);
  }
	
protected:
	std::string name_;
	std::vector<double> income_;
	double amount_;
	double price_;
  double risk_;
};


#endif // ACTIVE_H
