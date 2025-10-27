# Test Cases for AddCategoryForm Component

**Component Path:** `src/adminDashboard/forms/AddCategoryForm.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `AddCategoryForm` component, ensuring it provides a seamless experience for adding and editing categories.

---

## Manual Test Case Scenarios

**CAT-M-01**
**Category:** Functional
**Title:** Render in "Add New Category" Mode
**Pre-conditions:**
- User is authenticated as an admin.
- User navigates to the route for adding a new category.
**Steps:**
1.  Navigate to the page for adding a new category (e.g., `/admin/categories/new`).
2.  Observe the form's title and the state of the input fields.
**Expected Result:**
- The form title is "Add New Category".
- All input fields (Name, Description, Icon Name) are empty.
- The "Status" dropdown defaults to "Active".
- The image upload area is displayed.
- The submit button text is "Add Category".

---

**CAT-M-02**
**Category:** Functional
**Title:** Successfully Add a New Category (with Image)
**Pre-conditions:**
- User is on the "Add New Category" page.
**Steps:**
1.  Enter a unique "Category Name".
2.  Enter a "Description".
3.  Click the upload area and select a valid image file (< 5MB).
4.  Verify the image preview is shown.
5.  Select "Active" from the "Status" dropdown.
6.  Click the "Add Category" button.
**Expected Result:**
- A loading indicator appears on the button.
- A success message "✅ Category created successfully!" is displayed.
- After a 1.5-second delay, the user is redirected to the main categories list page (`/admin/categories`).

---

**CAT-M-03**
**Category:** Validation
**Title:** Submit Form with Missing Required Fields
**Pre-conditions:**
- User is on the "Add New Category" page.
**Steps:**
1.  Leave the "Category Name" field empty.
2.  Click the "Add Category" button.
**Expected Result:**
- The browser's default HTML5 validation message appears, prompting the user to fill out the field.
- The form is not submitted.

---

**CAT-M-04**
**Category:** Validation
**Title:** Upload Invalid File Type for Icon
**Pre-conditions:**
- User is on the form page.
**Steps:**
1.  Click the upload area.
2.  Select a non-image file (e.g., `document.pdf`, `data.csv`).
**Expected Result:**
- An alert with the message "Please select a valid image file" is displayed.
- No image preview is shown, and the form state for the icon is not updated.

---

**CAT-M-05**
**Category:** Validation
**Title:** Upload Oversized Image for Icon
**Pre-conditions:**
- User is on the form page.
**Steps:**
1.  Click the upload area.
2.  Select an image file that is larger than 5MB.
**Expected Result:**
- An alert with the message "File size should be less than 5MB" is displayed.
- No image preview is shown.

---

**CAT-M-06**
**Category:** Functional
**Title:** Remove an Uploaded Image
**Pre-conditions:**
- An image has been successfully uploaded and its preview is visible.
**Steps:**
1.  Click the "X" button on the top-right corner of the image preview.
**Expected Result:**
- The image preview is removed.
- The original upload placeholder (with the `Upload` icon) reappears.
- The form state is updated to remove the image data.

---

**CAT-M-07**
**Category:** Functional
**Title:** Render in "Edit Category" Mode
**Pre-conditions:**
- An existing category's data (including name, description, status, and image URL) is passed to the component via `location.state`.
**Steps:**
1.  Navigate to the edit page for a specific category.
2.  Observe the form's title and fields.
**Expected Result:**
- The form title is "Edit Category".
- The "Category Name", "Description", and "Status" fields are pre-populated with the existing category's data.
- The image preview displays the category's current icon.
- The submit button text is "Update Category".

---

**CAT-M-08**
**Category:** Functional
**Title:** Successfully Update a Category
**Pre-conditions:**
- User is on the "Edit Category" page for an existing category.
**Steps:**
1.  Change the "Description" text.
2.  Change the "Status" from "Active" to "Inactive".
3.  Click the "Update Category" button.
**Expected Result:**
- A loading indicator appears on the button.
- A success message "✅ Category updated successfully!" is displayed.
- After a 1.5-second delay, the user is redirected to the `/admin/categories` page.

---

**CAT-M-09**
**Category:** Functional
**Title:** Cancel Button Navigation
**Pre-conditions:**
- User is on either the "Add" or "Edit" category page.
**Steps:**
1.  Click the "Cancel" button.
**Expected Result:**
- The user is immediately redirected to the `/admin/categories` page.
- No changes are saved.

---

**CAT-M-10**
**Category:** Error Handling
**Title:** Handle API Error on Submission
**Pre-conditions:**
- The `createCategory` or `updateCategory` API service is mocked to return an error.
**Steps:**
1.  Fill out the form with valid data.
2.  Click the "Add Category" or "Update Category" button.
**Expected Result:**
- The loading state on the button disappears.
- An error message is displayed in the form (e.g., "Failed to create category. Please try again.").
- The success message is not displayed.
- The user remains on the form page.

---

**CAT-M-11**
**Category:** Accessibility
**Title:** Keyboard Navigation and Interaction
**Pre-conditions:**
- User is on the form page.
**Steps:**
1.  Use the `Tab` key to navigate through the form fields (Name, Description, Icon Name, Status, Image Upload, Submit, Cancel).
2.  When the image upload area is focused, press `Enter` or `Space`.
3.  When a button is focused, press `Enter`.
**Expected Result:**
- All interactive elements are focusable in a logical order.
- Pressing `Enter` or `Space` on the upload area should trigger the file selection dialog.
- Pressing `Enter` on a button should activate it.
- All labels are correctly associated with their respective inputs.
