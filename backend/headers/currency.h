#ifndef CURRENCY_H
#define CURRENCY_H


#include "../include/includes.h"
#include "active.h"


class Currency : public Active {
public:
	Currency() : name_(""), income_(std::vector<double>()), amount_(0.0), price_(0.0) {}
	~Currency() = default;
};


#endif // CURRENCY_H
