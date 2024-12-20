# Form Builder App

This app allows you to

- Create
- Edit
- Preview
- Fill
- View responses

  for your forms.

  ---

## Personal Note 

Thank you for reviewing my submission. I wanted to take a moment to explain that while I could not complete the backend functionality due to my current skill level in backend development, I have put in significant effort to create a functional and intuitive frontend for this task. 

I am actively learning backend technologies and wanted to demonstrate my dedication and ability to learn quickly by submitting this project. I hope the progress I’ve made so far reflects my enthusiasm and potential to grow as a developer.

---

## Installation

1. Clone the repository to your local machine.
2. Install dependencies using the package manager of your choice:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Or Download Expo Go and use this link -> [Link To App](https://expo.dev/preview/update?message=Nativewind%20Configured&updateRuntimeVersion=1.0.0&createdAt=2024-12-20T11%3A37%3A42.163Z&slug=exp&projectId=83da49df-dedc-4903-83f3-8d6ea9801e4c&group=949bb833-c0f3-4a0c-822d-55b589ed91d4) 

---

## Screens Explained

### 1. **Home Screen**

The Home Screen displays a list of all the forms that have been created so far.

- **Form List**: Displays all forms you have created.
- **Preview Form**:
  - When you click on any form in the list, it takes you to the Preview Form Screen.

### 2. **Preview Form Screen**

The Preview Form Screen shows a read-only view of the form you created.

- **View-Only Mode**: This screen shows the form as a preview.
- **Buttons at the Bottom**:
  - **Edit**: Allows you to edit the form.
  - **Fill**: Takes you to the form to fill it out.
  - **Responses**: Takes you to a page where you can view form responses.

### 3. **Edit Screen**

The Edit Screen is where we can update our already created form. The inputs are already filled with the default values of our form.

### 4. **Fill Screen**

The Fill Screen is where you can test your form by filling it yourself and submit the form.

### 5. **Responses Screen**

The Response Screen is where you would see all the responses submited so far.

### 6. **Create New Form Screen**

The Create New Form screen is where you can create new forms using a form builder interface.

- **Form Builder**: A UI to add and manage questions for the form.
- **Question Types**:
  - **Text**(✅): Allows the user to add a question with a text input field.
  - **Checkbox**(✅): Allows the user to add a multiple-choice question with checkbox options.
  - **Grid**(working): Allows the user to add a grid-style question where users can select values from a range.
- **Form Customization**:
  - Add a title for the form.
  - Upload a header image for the form.
  - Add and manage questions.
  - Also can add images to the questions.

### 7. **Save Form**:

Once the form is created, you can save it, and it will appear in the Home Screen list.

---

## Backend (Work in Progress)

I am still learning backend development and faced challenges implementing MongoDB and Express for this project. However, I am committed to mastering these technologies and am currently dedicating extra time to improving in this area.

---

### Technology Stack
1. **Frontend:**
   - React Native
   - NativeWind (Tailwind CSS for React Native)
   - React Navigation (for screen transitions)
2. **Development Tools:**
   - Expo (for quick setup and testing)

---
