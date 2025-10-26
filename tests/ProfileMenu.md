# Test Cases for ProfileMenu Component

**Component Path:** `src/adminDashboard/components/ProfileMenu.jsx`

**Objective:** To verify the functionality, UI, and state management of the user profile dropdown menu.

---

### Manual Test Case Scenarios

**PM-M-01**
- **Category:** Functional
- **Title:** Verify Menu Toggle on Icon Click
- **Pre-conditions:** The `ProfileMenu` component is rendered.
- **Steps:**
  1. Click the user profile icon.
  2. Observe the result.
  3. Click the user profile icon again.
- **Expected Result:**
  1. The profile dropdown menu should appear.
  2. The profile dropdown menu should disappear.

---

**PM-M-02**
- **Category:** Functional
- **Title:** Verify Click Outside to Close
- **Pre-conditions:** The profile dropdown menu is open.
- **Steps:**
  1. Click anywhere on the page outside of the dropdown menu.
- **Expected Result:** The dropdown menu should close.

---

**PM-M-03**
- **Category:** UI/Visual
- **Title:** Verify Dropdown Menu Content
- **Pre-conditions:** The profile dropdown menu is open.
- **Steps:**
  1. Observe the content of the menu.
- **Expected Result:**
  1. The user's name ("Admin User") and email ("admin@freelancer.com") should be displayed at the top.
  2. A "Settings" menu item with an icon should be present.
  3. A "Logout" menu item with an icon should be present.

---

**PM-M-04**
- **Category:** Functional
- **Title:** Verify Settings Button
- **Pre-conditions:** The profile dropdown menu is open.
- **Steps:**
  1. Click the "Settings" menu item.
- **Expected Result:** The button should be clickable. (No further navigation or action is expected as none is implemented).

---

**PM-M-05**
- **Category:** Functional
- **Title:** Verify Logout Button Functionality
- **Pre-conditions:** 
  - The profile dropdown menu is open.
  - The user is considered "logged in" (i.e., `localStorage` may contain `isLoggedIn`).
- **Steps:**
  1. Click the "Logout" menu item.
- **Expected Result:**
  1. The `isLoggedIn` and `userPhone` items should be removed from `localStorage`.
  2. The application should navigate to the `/login` page.
  3. The dropdown menu should close.

---

**PM-M-06**
- **Category:** Accessibility
- **Title:** Verify Keyboard Navigation
- **Pre-conditions:** The component is rendered.
- **Steps:**
  1. Use the `Tab` key to focus on the profile icon and press `Enter`.
  2. Use the `Tab` or arrow keys to navigate between the "Settings" and "Logout" buttons.
  3. Press `Enter` on a menu item.
  4. With the menu open, press the `Escape` key.
- **Expected Result:**
  1. The dropdown menu should open.
  2. Focus should move correctly between the menu items.
  3. The corresponding action for the menu item should be triggered.
  4. The dropdown menu should close.
