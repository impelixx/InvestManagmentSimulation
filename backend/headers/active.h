#ifndef ACTIVE_H
#define ACTIVE_H


#include "../include/includes.h"


class Active {
public:
	Active() : name_("Active"), amount_(0.0), price_(0.0), count_(0), risk_(0.0) {}
	Active(const std::string& name, const std::vector<double>& income, double amount, double price, int count, double risk);
	Active(Active& rhs);
	~Active() = default;

	// setters
  void setIncomeGraph(const std::vector<double>& income);
  void setName(const std::string name);
  void setAmount(double amount);
  void setPrice(double price);
  void setCount(int count);
  void setRisk(double risk);

	// getters
	[[nodiscard]] std::vector<double> getIncomeGraph() const { return income_; }
	[[nodiscard]] std::string getName() const { return name_; }
	[[nodiscard]] double getAmount() const { return amount_; }
	[[nodiscard]] double getPrice() const { return price_; }
  [[nodiscard]] int getCount() const { return count_; }
	[[nodiscard]] double getRisk() const { return risk_; }
  
  void changePrice();
  json returnActiveInfo();
	
	
protected:
	std::string name_;
	std::vector<double> income_;
	double amount_;
	double price_;
  int count_;
	double risk_;
};


#endif // ACTIVE_H
