#include "../headers/candle.h"


// "CanleInfo" constructors
CandleInfo::CandleInfo(const std::string& name, double min, double max, double open, double close) {
  try {
    if (name.empty()) {
      throw std::length_error("No any name!");
    }

    name_ = name;
    min_ = min;
    max_ = max;
    open_ = open;
    close_ = close;
  } catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
    throw;
  }
}

CandleInfo::CandleInfo(const CandleInfo& rhs) {
  name_ = rhs.name_;
  min_ = rhs.min_;
  max_ = rhs.max_;
  open_ = rhs.open_;
  close_ = rhs.close_;
}


// constructors
Candle::Candle(const std::string& name, int risk, const std::vector<CandleInfo>& candles) {
  try {
    if (name.empty()) {
      throw std::length_error("No any name!");
    }
    if (candles.empty()) {
      throw std::length_error("Candles vector is empty! No any candles!");
    }

    name_ = name;
    risk_ = risk;
    candles_.reserve(candles.capacity());
    for (auto el : candles) {
      candles_.push_back(el);
    }
  } catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
    throw;
  }
}

Candle::Candle(const Candle& rhs) {
  name_ = rhs.name_;
  risk_ = rhs.risk_;
  candles_.reserve(rhs.candles_.capacity());
  for (auto el : rhs.candles_) {
    candles_.push_back(el);
  }
}

// setters
void Candle::setName(std::string& name) {
  name_ = name;
}

void Candle::setCandlesVector(std::vector<CandleInfo>& candles) {
  try {
    if (candles.empty()) {
      throw std::length_error("Candles vector is empty! No any candles!");
    }

    candles_.reserve(candles.capacity());
    for (auto el : candles) {
      candles_.push_back(el);
    }
  } catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
  }
}

void Candle::setRisk(int risk) {
  risk_ = risk;
}


json Candle::returnCandleInfo() {
  json response;

  response["name"] = candles_.back().name_; // std::string
  response["min"] = candles_.back().min_; // double (why not)
  response["open"] = candles_.back().open_; // double (why not)
  response["close"] = candles_.back().close_; // double (why not)
  response["max"] = candles_.back().max_; // double (why not)

  return response;
}
