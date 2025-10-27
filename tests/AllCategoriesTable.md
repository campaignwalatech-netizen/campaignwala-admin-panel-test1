# Test Cases for AllCategoriesTable Component

**Component Path:** `src/adminDashboard/forms/AllCategoriesTable.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `AllCategoriesTable` component, ensuring admins can manage categories effectively.

---

## Manual Test Case Scenarios

**CAT-TABLE-M-01**
**Category:** Functional
**Title:** Render and Fetch Categories
**Pre-conditions:**
- User is authenticated as an admin.
- The API is expected to return a list of categories.
**Steps:**
1.  Navigate to the page containing the `AllCategoriesTable` component.
2.  Observe the initial state and the final rendered grid.
**Expected Result:**
- A loading indicator is shown initially.
- The title "All Categories" is visible.
- Once loaded, a grid of category cards is displayed, each showing the category name, description, offer count, and status.

---

**CAT-TABLE-M-02**
**Category:** Functional
**Title:** Search for a Category
**Pre-conditions:**
- The category grid is populated.
**Steps:**
1.  Enter a known category name into the search input field.
2.  Observe the grid.
3.  Clear the search input.
**Expected Result:**
1.  The grid updates to show only the categories that match the search term.
2.  When cleared, the grid returns to showing all categories.

---

**CAT-TABLE-M-03**
**Category:** Functional
**Title:** Filter Categories by Status
**Pre-conditions:**
- The category grid is populated with both active and inactive categories.
**Steps:**
1.  Click the filter dropdown and select "Active".
2.  Observe the grid.
3.  Change the filter to "Inactive".
4.  Observe the grid.
**Expected Result:**
1.  The grid displays only categories with an "Active" status.
2.  The grid displays only categories with an "Inactive" status.

---

**CAT-TABLE-M-04**
**Category:** Functional
**Title:** Edit a Category
**Pre-conditions:**
- The category grid is populated.
**Steps:**
1.  Click the "Edit" button on a category card.
**Expected Result:**
- The user is navigated to the `/admin/add-category` route.
- The state passed to the location contains the `editCategory` data, pre-populating the form for editing.

---

**CAT-TABLE-M-05**
**Category:** Functional
**Title:** Delete a Category (Open and Cancel Modal)
**Pre-conditions:**
- The category grid is populated.
**Steps:**
1.  Click the "Delete" button on a category card.
2.  Observe the confirmation modal.
3.  Click the "Cancel" button.
**Expected Result:**
1.  A modal appears with the title "Confirm Delete", asking for confirmation to delete the selected category.
2.  The modal closes, and no action is taken.

---

**CAT-TABLE-M-06**
**Category:** Functional
**Title:** Confirm and Execute Deletion
**Pre-conditions:**
- The delete confirmation modal is open for a category.
- The API is expected to handle the delete request successfully.
**Steps:**
1.  Click the "Delete" button inside the modal.
**Expected Result:**
- A loading state appears on the delete button.
- An alert "Category deleted successfully!" is shown.
- The category card is removed from the grid.
- The modal closes.

---

**CAT-TABLE-M-07**
**Category:** Functional
**Title:** Add New Category Navigation
**Pre-conditions:**
- The component is rendered.
**Steps:**
1.  Click the floating action button with the "+" icon at the bottom right.
2.  If the grid is empty, click the "Add New Category" button in the empty state message.
**Expected Result:**
- In both cases, the user is navigated to the `/admin/add-category` route to create a new category.

---

**CAT-TABLE-M-08**
**Category:** Functional
**Title:** Export Categories
**Pre-conditions:**
- The category grid is populated.
**Steps:**
1.  Click the "Export" button.
**Expected Result:**
- A CSV file named `categories_YYYY-MM-DD.csv` is downloaded by the browser, containing the data of the currently displayed categories.

---

**CAT-TABLE-M-09**
**Category:** Error Handling
**Title:** Handle API Error on Fetch
**Pre-conditions:**
- The `getAllCategories` API is mocked to return an error.
**Steps:**
1.  Load the component.
**Expected Result:**
- The loading indicator disappears.
- An error message is displayed with a "Try Again" button.
- The error message from the API is shown.
