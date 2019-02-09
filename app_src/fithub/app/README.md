# ./app
./app provides a general heirarchy for modularizing reuasble components, configs, functions, etc.

## ./app/components
A good place to store package components that are wrapped for a specific reusable use-case

ex. A 'GenericTextInput' wrapped to handle exercise log information

Typically formatted in the following format:
* GenericTextInput
*   -GenericTextInput.js
*   -index.js (for exporting)
*   -'additional files'.js

## ./app/config
A good place to store reusable configuration information external to its usage
This allows for simple style changes to be implemented in one place, but occur globally

ex. A 'styles.js' file for declaring style attributes

## ./app/lib
A good place to store reusable functions.
Most items that need to appear in lib will likely already have an npm package that exists, but it is here just in case

## ./app/screens
A good place to store UI screens and elements that group together all necessary components into a single easy to use reference for a route

ex. A 'LogIn.js' UI screen

## ./app/index.js
An optional entry point into the application. 
Can be implemented to be called from App.js, but it is technically redundant. 
Usage is personal preference. 