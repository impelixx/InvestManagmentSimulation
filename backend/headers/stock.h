#ifndef STOCK_H
#define STOCK_H


#include "../include/includes.h"
#include "active.h"


class Stock : public Active {
public:
	Stock() : name_(""), income_(std::vector<double>()), amount_(0.0), price_(0.0) {}
	~Stock() = default;
};


#endif // STOCK_H
