#ifndef ACTIVE_H
#define ACTIVE_H


// Олег учит гит 


#include "../include/includes.h"


class Active {
public:
	Active() : name_(""), income_(std::vector<int>()), amount_(0.0), price_(0.0) {}
	Active(std::string& name, std::vector<int>& income, double amount, double price);
	~Active();

	// setters
	void setIncomeGraph	(std::vector<int>& income);
	void setName (std::string& name);
	void setAmount (double amount);
	void setPrice (double price);

	// getters
	std::vector<int> getIncomeGraph() const { return income_; }
	std::string getName() const { return name_; }
	double getAmount() const { return amount_; }
	double getPrice() const { return price_; }
	
	
private:
	std::string name_;
	std::vector<int> income_;
	double amount_;
	double price_;
};


#endif // ACTIVE_H
