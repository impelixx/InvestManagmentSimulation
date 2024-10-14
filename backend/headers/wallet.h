#include "../include/includes.h"

class Wallet {
public:
	Wallet() = default;
	~Wallet() = default;
	std::vector<Active> getActive() { return this->Active; }
	void addActive(Active& active) { this->Active.push_back(active); }
private:
	std::vector<Active> = {};
};