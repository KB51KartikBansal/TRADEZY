##  User interface for prod phase problem  

## Project Status
Initial environment setup 

#### NAMING CONVENTIONS:
###### Use .jsx or .tsx extension a for React components
Component’s names should be written using pascal case:
   1. Header.jsx
   2. Footer.jsx
   3. Login.jsx

###### Non-components should be written using camel case:

   1. constants.js
   2. fatchData.js
   3. setAuthToken.js

###### Unit test files should use the same name as its corresponding file:

   1. Login.test.jsx

###### Attribute name should be camel case:
    
   1. className
   2. onClick
   3. dangerouslySetInnerHTML

###### Inline styles should be camel case:

   1. <div style={{fontSize:'1rem'}}></div>


##### Variable names should be camel case. Variable names can contain number and special characters:
              
  1. const variable = 'test';
  2. let variableBoolean = true;

#### CSS files should be named the same as the component:
     

  1. Login.css
  2. Header.css

If a component requires multiple files (css, test) locate all files within component a folder




## Installation and Setup Instructions

### Requied 
  `Node.js`
  `npm`

#### Example:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

###### Installation:

`npm install`  

###### To Start Server:

`npm start`  

