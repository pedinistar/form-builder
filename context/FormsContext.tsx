import React, { createContext, useContext, useState } from "react";
import { Form } from "../constants/Forms";
import { SAMPLE_FORMS } from "../constants/Forms";

interface FormsContextType {
  forms: Form[];
  addForm: (form: Form) => void;
  updateForm: (updatedForm: Form) => void;
  addResponse: (formId: string, responses: string[]) => void; // Add the response function to the context type
}

const FormsContext = createContext<FormsContextType>({
  forms: [],
  addForm: () => {},
  updateForm: () => {},
  addResponse: () => {}, // Default no-op function for addResponse
});

export function FormsProvider({ children }: { children: React.ReactNode }) {
  const [forms, setForms] = useState<Form[]>(SAMPLE_FORMS);

  // Function to add a form
  const addForm = (form: Form) => {
    setForms((prevForms) => [...prevForms, form]);
  };

  // Function to update a form
  const updateForm = (updatedForm: Form) => {
    setForms((prevForms) =>
      prevForms.map((form) => (form.id === updatedForm.id ? updatedForm : form))
    );
  };

  // Function to add responses to a form
  const addResponse = (formId: string, responses: string[]) => {
    setForms((prevForms) =>
      prevForms.map((form) => {
        if (form.id === formId) {
          // If form has responses, append new responses
          return {
            ...form,
            responses: [...(form.responses || []), responses],
          };
        }
        return form;
      })
    );
  };

  return (
    <FormsContext.Provider value={{ forms, addForm, updateForm, addResponse }}>
      {children}
    </FormsContext.Provider>
  );
}

export const useForms = () => useContext(FormsContext);
