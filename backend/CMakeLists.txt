cmake_minimum_required(VERSION 3.26)  
project(backend)               

set(CMAKE_CXX_STANDARD 11)            

file(GLOB SOURCES "src/*.cpp")

file(GLOB HEADERS "headers/*.h")

file(GLOB LIBS_SOURCES "libs/*.cpp")
file(GLOB LIBS_HEADERS "libs/*.h")

set(ALL_SOURCES ${SOURCES} ${HEADERS} ${LIBS_SOURCES} ${LIBS_HEADERS})


add_executable(backend ${ALL_SOURCES})