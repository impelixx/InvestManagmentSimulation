set(CMAKE_C_COMPILER gcc)
set(CMAKE_CXX_COMPILER g++)

cmake_minimum_required(VERSION 3.18)
project(backend)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20")

include_directories(
    "${PROJECT_SOURCE_DIR}/include"
    "${PROJECT_SOURCE_DIR}/lib"
)

file(
    GLOB
    SOURCES
    "src/**/*.cpp"
    "src/*.cpp"
)

set(
    PROJECT_LINK_LIBS
    ws2_32
)

add_executable("${PROJECT_NAME}" ${SOURCES}
    "${PROJECT_SOURCE_DIR}/include"
    "${PROJECT_SOURCE_DIR}/headers"
    "${PROJECT_SOURCE_DIR}/src"
)
target_link_libraries("${PROJECT_NAME}" ${PROJECT_LINK_LIBS})