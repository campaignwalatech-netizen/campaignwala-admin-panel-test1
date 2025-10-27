# Test Cases for AddSlideForm Component

**Component Path:** `src/adminDashboard/forms/AddSlideForm.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `AddSlideForm` component for adding and editing slides.

---

## Manual Test Case Scenarios

**SLIDE-M-01**
**Category:** Functional
**Title:** Render in "Add New Slide" Mode
**Pre-conditions:**
- User navigates to the page for adding a new slide.
**Steps:**
1.  Load the component without any `editSlide` state.
2.  Observe the form's title.
**Expected Result:**
- The form title is "Add New Slide".

---

**SLIDE-M-02**
**Category:** Functional
**Title:** Successfully Add a New Slide
**Pre-conditions:**
- User is on the "Add New Slide" page.
- Categories and offers are available via the API.
**Steps:**
1.  Fill in "Offer Title".
2.  Select a "Category".
3.  Select an "Offers ID" from the populated dropdown.
4.  Upload a valid "Background Image".
5.  Optionally, add a "Description".
6.  Click "Add Slide".
**Expected Result:**
- An alert "Slide added successfully!" is shown.
- The user is redirected to the `/admin/slides` page.

---

**SLIDE-M-03**
**Category:** Validation
**Title:** Submit Form with Missing Required Fields
**Pre-conditions:**
- User is on the "Add New Slide" page.
**Steps:**
1.  Leave one or more required fields empty (Title, Category, Offers ID, Image).
2.  Click "Add Slide".
**Expected Result:**
- An alert "❌ Please fill all required fields!" is displayed.
- The form is not submitted.

---

**SLIDE-M-04**
**Category:** Functional
**Title:** Dynamic Offer Loading
**Pre-conditions:**
- User is on the "Add New Slide" page.
**Steps:**
1.  Observe the "Offers ID" dropdown. It should be disabled.
2.  Select a "Category" from the dropdown.
3.  Observe the "Offers ID" dropdown again.
**Expected Result:**
1.  Initially, the "Offers ID" dropdown is disabled with the message "First select a category".
2.  After selecting a category, the dropdown becomes enabled and shows "Loading offers...".
3.  Once loaded, it is populated with offers corresponding to the selected category. If no offers, it shows "No offers available...".

---

**SLIDE-M-05**
**Category:** Validation
**Title:** Handle Duplicate Offers ID
**Pre-conditions:**
- An offer is already used in another slide.
**Steps:**
1.  Select a category and an "Offers ID" that is already associated with an existing slide.
2.  Fill in all other required fields.
3.  Click "Add Slide".
**Expected Result:**
- An alert "❌ Offers ID Already Exists!..." is displayed.
- The "Offers ID" dropdown is highlighted in red to indicate the error.
- The form is not submitted.

---

**SLIDE-M-06**
**Category:** Functional
**Title:** Image Upload and Preview
**Pre-conditions:**
- User is on the "Add/Edit Slide" page.
**Steps:**
1.  Click the "Click to upload background image" area.
2.  Select a valid image file (e.g., JPG, PNG).
**Expected Result:**
- A preview of the image is displayed below the upload area.
- A red "X" button appears on the preview to remove it.

---

**SLIDE-M-07**
**Category:** Functional
**Title:** Reset Form
**Pre-conditions:**
- User has entered data into the form fields.
**Steps:**
1.  Click the "Reset" button.
**Expected Result:**
- All form fields are cleared.
- The image preview is removed.

---

**SLIDE-M-08**
**Category:** Functional
**Title:** Render in "Edit Slide" Mode
**Pre-conditions:**
- User navigates to the edit page with `editSlide` data passed in the location state.
**Steps:**
1.  Load the component for an existing slide.
2.  Observe the form.
**Expected Result:**
- The form title is "Edit Slide".
- All fields are pre-populated with the slide's existing data.
- The correct category and offer are selected in the dropdowns.
- The background image is shown in the preview.

---

**SLIDE-M-09**
**Category:** Functional
**Title:** Successfully Update a Slide
**Pre-conditions:**
- User is on the "Edit Slide" page.
**Steps:**
1.  Change the "Offer Title" or "Description".
2.  Click "Update Slide".
**Expected Result:**
- An alert "Slide updated successfully!" is shown.
- The user is redirected to the `/admin/slides` page.