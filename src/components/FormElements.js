// src/components/FormElements.js
import * as React from "react";
// import DynamicImport from 'react-dynamic-import';
const loadFloatingLabelInput =()=> React.lazy(() => import('./Privates/forms/FloatingLabelInput'));
export const FormElements = {
 getFloatingLabelInput: loadFloatingLabelInput,
};