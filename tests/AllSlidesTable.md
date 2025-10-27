# Test Cases for AllSlidesTable Component

**Component Path:** `src/adminDashboard/forms/AllSlidesTable.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `AllSlidesTable` component, ensuring admins can manage slides effectively.

---

## Manual Test Case Scenarios

**SLIDE-TABLE-M-01**
**Category:** Functional
**Title:** Render and Fetch Slides
**Pre-conditions:**
- User is authenticated as an admin.
- The API is expected to return a list of slides.
**Steps:**
1.  Navigate to the page containing the `AllSlidesTable` component.
2.  Observe the initial state and the final rendered grid.
**Expected Result:**
- A loading spinner is shown initially.
- The title "Slide Board" is visible.
- Once loaded, a grid of slide cards is displayed, each showing an image, title, category, description, and stats.

---

**SLIDE-TABLE-M-02**
**Category:** Functional
**Title:** Search for a Slide
**Pre-conditions:**
- The slide grid is populated.
**Steps:**
1.  Enter a known slide title into the search input field.
2.  Wait for the debounce timer (500ms).
3.  Observe the grid and the results text.
**Expected Result:**
- The grid updates to show only the slides that match the search term.
- A text appears saying `X result(s) found for "<search term>"`.

---

**SLIDE-TABLE-M-03**
**Category:** Functional
**Title:** Clear Search Query
**Pre-conditions:**
- A search query is currently active.
**Steps:**
1.  Click the "X" icon inside the search input field.
**Expected Result:**
- The search input is cleared.
- The grid returns to showing all slides.

---

**SLIDE-TABLE-M-04**
**Category:** Functional
**Title:** Edit a Slide
**Pre-conditions:**
- The slide grid is populated.
**Steps:**
1.  Click the "Edit" button on a slide card.
**Expected Result:**
- The user is navigated to the `/admin/add-slide` route.
- The state passed to the location contains the `editSlide` data, pre-populating the form for editing.

---

**SLIDE-TABLE-M-05**
**Category:** Functional
**Title:** Delete a Slide (Open and Cancel Modal)
**Pre-conditions:**
- The slide grid is populated.
**Steps:**
1.  Click the "Delete" button on a slide card.
2.  Observe the confirmation modal.
3.  Click the "Cancel" button.
**Expected Result:**
1.  A modal appears with the title "Confirm Delete".
2.  The modal closes, and no action is taken.

---

**SLIDE-TABLE-M-06**
**Category:** Functional
**Title:** Confirm and Execute Deletion
**Pre-conditions:**
- The delete confirmation modal is open for a slide.
**Steps:**
1.  Click the final "Delete" button inside the modal.
**Expected Result:**
- A success alert appears: `Slide "<Slide Title>" deleted successfully!`.
- The slide card is removed from the grid.
- The modal closes.

---

**SLIDE-TABLE-M-07**
**Category:** UI/Visual
**Title:** Empty State (No Slides)
**Pre-conditions:**
- The API returns an empty list of slides.
**Steps:**
1.  Load the component.
**Expected Result:**
- A message is displayed indicating "No slides found" with an icon and a suggestion to create one.

---

**SLIDE-TABLE-M-08**
**Category:** UI/Visual
**Title:** Empty State (No Search Results)
**Pre-conditions:**
- The user enters a search term that returns no results.
**Steps:**
1.  Enter a search query that will not match any slides.
**Expected Result:**
- A message is displayed indicating "No slides found" and "No results for \"<search term>\"", along with a "Clear Search" button.

---

**SLIDE-TABLE-M-09**
**Category:** Error Handling
**Title:** Handle Image Loading Error
**Pre-conditions:**
- A slide has a broken or invalid `backgroundImage` URL.
**Steps:**
1.  Observe the card for the slide with the broken image link.
**Expected Result:**
- The `onError` handler triggers, and a placeholder image from `via.placeholder.com` is displayed, showing the slide's title as text.
