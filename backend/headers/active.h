#ifndef ACTIVE_H
#define ACTIVE_H


#include "../include/includes.h"


class Active {
public:
	Active() : name_(""), income_(std::vector<double>()), amount_(0.0), price_(0.0), risk_(0) {}
	Active(std::string& name, std::vector<double>& income, double amount, double price, double risk);
	Active(Active& rhs);
	virtual ~Active();

	// setters
	void setIncomeGraph(std::vector<double>& income);
	void setName(std::string name);
	void setAmount(double amount);
	void setPrice(double price);
	void setRisk(double risk);

	// getters
	std::vector<double> getIncomeGraph() const { return income_; }
	std::string getName() const { return name_; }
	double getAmount() const { return amount_; }
	double getPrice() const { return price_; }
	double getRisk() const { return risk_; }

	void changePrice();
	
	
protected:
	std::string name_;
	std::vector<double> income_;
	double amount_;
	double price_;
	double risk_;
};


#endif // ACTIVE_H
