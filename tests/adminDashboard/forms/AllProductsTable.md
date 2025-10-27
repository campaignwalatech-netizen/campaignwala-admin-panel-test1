
# Test Cases for AllOffersTable Component

**Component:** `src/adminDashboard/forms/AllProductsTable.jsx`

---

### 1. Basic Rendering and Data Fetching

| Test Case ID | Description | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| AOT-001 | It should display a loading state initially. | 1. Render the `AllOffersTable` component. <br> 2. Mock the `getAllOffers` service to have a delay. | A loading spinner with the text "Loading offers..." should be visible. |
| AOT-002 | It should fetch and display a table of offers. | 1. Mock a successful response from `getAllOffers`. <br> 2. Render the component. | A table of offers should be displayed with correct data in rows. |
| AOT-003 | It should display an error message if fetching fails. | 1. Mock a failed response from `getAllOffers`. <br> 2. Render the component. | An error message with a "Try Again" button should be displayed. |
| AOT-004 | It should display a message when no offers are found. | 1. Mock a successful response with an empty array of offers. <br> 2. Render the component. | A message "No offers found" should be displayed. |

---

### 2. Filtering and Searching

| Test Case ID | Description | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| AOT-005 | It should filter offers by search term. | 1. Render with a list of offers. <br> 2. Type a search term into the search input. | The `fetchOffers` function should be called with the search term, and the table should update. |
| AOT-006 | It should filter offers by approval status. | 1. Render with offers having different approval statuses. <br> 2. Select "Approved" from the status filter dropdown. | The `fetchOffers` function should be called with `isApproved: 'true'`, and only approved offers should be displayed. |

---

### 3. Offer Actions (Edit, Delete, Copy)

| Test Case ID | Description | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| AOT-007 | The "Edit" button should open the edit modal with form data. | 1. Render the component. <br> 2. Click the "Edit" icon on an offer row. | The edit modal should appear, pre-filled with the data of the selected offer. |
| AOT-008 | The "Delete" button should open the confirmation modal. | 1. Render the component. <br> 2. Click the "Delete" icon on an offer row. | The delete confirmation modal should appear. |
| AOT-009 | The "Copy Link" button should copy the link to the clipboard. | 1. Render with an offer that has a `link`. <br> 2. Mock `navigator.clipboard.writeText`. <br> 3. Click the `LinkIcon` button. | `navigator.clipboard.writeText` should be called with the offer's link. A success alert "Link copied to clipboard!" should appear. |

---

### 4. Deletion Process

| Test Case ID | Description | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| AOT-010 | It should call `deleteOffer` and remove the row on confirmed deletion. | 1. Mock `deleteOffer` to be successful. <br> 2. Open the delete modal and confirm. | The `deleteOffer` service should be called. The corresponding row should be removed from the table, and a success alert should appear. |
| AOT-011 | It should show an alert on failed deletion. | 1. Mock `deleteOffer` to fail. <br> 2. Confirm deletion. | An alert with an error message should be displayed. |

---

### 5. Editing Process

| Test Case ID | Description | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| AOT-012 | It should update the form state inside the edit modal. | 1. Open the edit modal for an offer. <br> 2. Change the value of the "Offer Name" input. | The `editForm` state within the component should be updated. |
| AOT-013 | It should call `updateOffer` on submitting the edit modal. | 1. Mock `updateOffer` to be successful. <br> 2. Open the edit modal, change data, and click "Update Offer". | The `updateOffer` service should be called with the offer ID and the modified data. |
| AOT-014 | It should update the row in the table on successful edit. | 1. Mock a successful `updateOffer` response. <br> 2. Submit the edit modal. | The modal should close, a success alert should appear, and the data in the corresponding table row should be updated. |

---

### 6. Other Functionality

| Test Case ID | Description | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| AOT-015 | The "Export" button should trigger a CSV download. | 1. Render with a list of offers. <br> 2. Click the "Export" button. | A CSV file containing the offer data should be downloaded, and a success alert should appear. |

---
