# Transport logistics Common Library

## Table of contents

- [General description](#general-desciption)
  - [Table of contents](#table-of-contents)
    - [Other topics](#other-topics)
  - [Development process](#development-process)
    - [Scripts](#scripts)
    - [Documentation](#documentation)
  - [Project structure](#project-structure)

## General Description

The library is mostly written according to the rules and conventions of the functional paradigm using algebraic data types, includes commonly used functions and its safe variants. A practical functional library for common functions

## Development Process

### Scripts

- `test` - runs unit tests for common repository
- `log` - runs log which message version of package.json file

### Documentation

Pay attension to signature used e.g: hindley milner notation

## Project structure

- `commands` - some commands e.g: parse json web token, and list semver versions
- `examples` - some minor examples of usage lib and algebraic data types for common statements and conditions
- `src` - captured mostly functions
  - `internal` - system helpers and different specific functions and conversions
    - `algebraic-types` - as a type formed by combining other types e.g: sum and product ones. Model how data is displayed or presented in a way that is natural compared to domain modeling in an object or object-oriented style
      - `applicative` - applicative functors for multiple ...args
      - `either` - unified control flow with either fn
      - `identity` - linear flow with container style types
      - `lazy-functor` - delay evaluation with lazy functor e.g: future
      - `monoid` - allow to perfome safe operations instead of semigroups
      - `semigroup` - is a type with concat method with is associative, capture specific function of logic and provide unified method of concatination
     - `isomorphism` - isomorphism and round trip data transformations, provide type convetions without losing data inside
     - `natural-transformations` - conversions as it is, convertation between algebraic types 
       - `cast-scalar-to-type` - cast to algebraic ones
       - `convertation-between-algebraic-types` - conversions between ones
       - `hindley-milner` - notation which used overal in package 
