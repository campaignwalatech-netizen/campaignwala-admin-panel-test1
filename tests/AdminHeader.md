# Test Cases for AdminHeader Component

**Component Path:** `src/adminDashboard/components/AdminHeader.jsx`

**Objective:** To verify the functionality, UI, and responsiveness of the `AdminHeader` component.

---

### Manual Test Case Scenarios

**AH-M-01**
- **Category:** Functional
- **Title:** Render with Correct Title
- **Pre-conditions:** The component is rendered.
- **Steps:**
  1. Navigate to the page where the `AdminHeader` is displayed.
  2. Observe the header.
- **Expected Result:** The title "Admin Dashboard" should be visible and prominently displayed.

---

**AH-M-02**
- **Category:** Functional
- **Title:** Menu Button Functionality
- **Pre-conditions:** 
  - The application is viewed on a small screen (e.g., mobile or tablet).
  - The sidebar is initially closed.
- **Steps:**
  1. Click on the menu icon (hamburger icon) in the header.
- **Expected Result:** The sidebar should become visible.

---

**AH-M-03**
- **Category:** Functional
- **Title:** Theme Toggle Functionality
- **Pre-conditions:** The application is in "light mode" by default.
- **Steps:**
  1. Click on the moon icon in the header.
  2. Observe the UI.
  3. Click on the sun icon.
  4. Observe the UI.
- **Expected Result:**
  1. After the first click, the application should switch to "dark mode," and the icon should change to a sun.
  2. After the second click, the application should switch back to "light mode," and the icon should change to a moon.

---

**AH-M-04**
- **Category:** UI/Visual
- **Title:** Verify Light Mode Styling
- **Pre-conditions:** The application's theme is set to "light mode".
- **Steps:**
  1. Render the component.
  2. Observe the component's styling.
- **Expected Result:** The header should have a white background, and the text should be dark gray, as per the component's styling.

---

**AH-M-05**
- **Category:** UI/Visual
- **Title:** Verify Dark Mode Styling
- **Pre-conditions:** The application's theme is set to "dark mode".
- **Steps:**
  1. Render the component in dark mode.
  2. Observe the component's styling.
- **Expected Result:** The header's background should be dark gray, and the text should be white, as per the dark mode styles.

---

**AH-M-06**
- **Category:** UI/Visual
- **Title:** Menu Button Visibility on Large Screens
- **Pre-conditions:** The application is viewed on a large screen (desktop).
- **Steps:**
  1. Observe the header.
- **Expected Result:** The menu icon (hamburger icon) should not be visible.

---

**AH-M-07**
- **Category:** UI/Visual
- **Title:** Menu Button Visibility on Small Screens
- **Pre-conditions:** The application is viewed on a small screen (mobile or tablet).
- **Steps:**
  1. Observe the header.
- **Expected Result:** The menu icon (hamburger icon) should be visible on the left side of the header.

---

**AH-M-08**
- **Category:** Accessibility
- **Title:** Screen Reader Compatibility
- **Pre-conditions:** A screen reader (e.g., NVDA, VoiceOver) is active.
- **Steps:**
  1. Navigate to the header using the screen reader.
- **Expected Result:** The screen reader should announce the title "Admin Dashboard," and the buttons for the menu and theme toggle should be clearly announced with their purpose (e.g., "Open navigation menu," "Toggle dark mode").
