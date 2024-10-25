cmake_minimum_required(VERSION 3.26)  
project(backend)               

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20")

include_directories(
    "${PROJECT_SOURCE_DIR}/include",
    "${PROJECT_SOURCE_DIR}/lib",
    "${PROJECT_SOURCE_DIR}/src",
    "${PROJECT_SOURCE_DIR}/headers",
    "${PROJECT_SOURCE_DIR}"
)

file(
    GLOB
    SOURCES
    "src/**/*"
    "src/*"
)

set(ALL_SOURCES ${SOURCES} ${HEADERS} ${LIBS_SOURCES} ${LIBS_HEADERS})


add_executable(backend ${ALL_SOURCES})

if (WIN32)
    set(PROJECT_LINK_LIBS ws2_32)
endif()

target_link_libraries("${PROJECT_NAME}" ${PROJECT_LINK_LIBS})

target_link_libraries("${PROJECT_NAME}" ${PROJECT_LINK_LIBS})