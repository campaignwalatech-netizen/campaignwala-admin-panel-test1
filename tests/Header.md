# Test Cases for Header Component

**Component Path:** `src/adminDashboard/components/Header.jsx`

**Objective:** To verify the UI, dynamic content, and functionality of the `Header` component.

---

### Manual Test Case Scenarios

**H-M-01**
- **Category:** UI/Visual
- **Title:** Verify Default Header Rendering
- **Pre-conditions:** The user is on the main admin page (e.g., `/admin` or `/admin/`).
- **Steps:**
  1. Observe the header.
- **Expected Result:** 
  1. The title "ALL Offers" should be displayed.
  2. The subtitle "18 active campaigns" should be visible below the title.
  3. The theme toggle button and the profile menu should be visible on the right.

---

**H-M-02**
- **Category:** UI/Visual
- **Title:** Verify Dynamic Page Title
- **Pre-conditions:** The application has multiple pages (e.g., Users, Settings).
- **Steps:**
  1. Navigate to the "Users" page (e.g., `/admin/users`).
  2. Observe the header title.
  3. Navigate to the "Settings" page (e.g., `/admin/settings`).
  4. Observe the header title.
- **Expected Result:**
  1. The header title should change to "USERS".
  2. The header title should change to "SETTINGS".

---

**H-M-03**
- **Category:** Functional
- **Title:** Verify Theme Toggle Functionality
- **Pre-conditions:** The application is in light mode.
- **Steps:**
  1. Click the theme toggle button (moon icon).
  2. Click the theme toggle button again (sun icon).
- **Expected Result:**
  1. The `onThemeToggle` function should be called, and the application's theme should switch to dark mode.
  2. The `onThemeToggle` function should be called again, and the theme should switch back to light mode.

---

**H-M-04**
- **Category:** UI/Visual
- **Title:** Verify Theme Icon Change
- **Pre-conditions:** None.
- **Steps:**
  1. Set the application to light mode and observe the theme button.
  2. Set the application to dark mode and observe the theme button.
- **Expected Result:**
  1. A moon icon should be displayed.
  2. A sun icon should be displayed.

---

**H-M-05**
- **Category:** Integration
- **Title:** Verify Profile Menu Rendering
- **Pre-conditions:** The `Header` component is rendered.
- **Steps:**
  1. Observe the right side of the header.
- **Expected Result:** The `ProfileMenu` component (which typically includes a user avatar and a dropdown menu) should be visible and functional.

---

**H-M-06**
- **Category:** Accessibility
- **Title:** Screen Reader Compatibility
- **Pre-conditions:** A screen reader is active.
- **Steps:**
  1. Navigate through the header elements using the screen reader.
- **Expected Result:** The screen reader should clearly announce the page title, the subtitle, the purpose of the theme toggle button ("Toggle theme"), and the elements within the profile menu.
