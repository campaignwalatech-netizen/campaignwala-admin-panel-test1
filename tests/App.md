
# Manual Test Cases for App Component

## Test Suite: App Component Functionality

**Objective:** To ensure the main App component functions as expected, managing layout, theme, and session.

---

### **Test Case 1: Verify Layout Renders Correctly**

-   **Test ID:** APP-01
-   **Description:** Ensure the main layout components are displayed correctly.
-   **Steps:**
    1.  Launch the application.
-   **Expected Result:**
    -   The Sidebar and Header components are visible.
    -   The main content area (rendered by `<Outlet />`) is visible.

---

### **Test Case 2: Theme Toggle**

-   **Test ID:** APP-02
-   **Description:** Verify that the theme can be toggled between light and dark mode.
-   **Steps:**
    1.  Click the theme toggle button in the Header.
-   **Expected Result:**
    -   The application should switch between light and dark themes.
    -   The `theme` item in local storage should be updated to `light` or `dark`.
    -   The `dark` class should be added to or removed from the `<html>` element.

---

### **Test Case 3: Session Management - Activity Tracking**

-   **Test ID:** APP-03
-   **Description:** Verify that user activity updates the session.
-   **Steps:**
    1.  Perform some user activity, such as moving the mouse, scrolling, or typing.
-   **Expected Result:**
    -   The `updateLastActivity` action in the Redux store should be dispatched.

---

### **Test Case 4: Session Management - Logout**

-   **Test ID:** APP-04
-   **Description:** Verify that the user can log out.
-   **Steps:**
    1.  Click the logout button (usually in the Header or Sidebar).
-   **Expected Result:**
    -   The `logoutUser` action in the Redux store should be dispatched.
    -   The user should be redirected to the login page.

---

### **Test Case 5: Responsive Layout**

-   **Test ID:** APP-05
-   **Description:** Verify that the layout adapts to different screen sizes.
-   **Steps:**
    1.  Resize the browser window to a mobile width.
-   **Expected Result:**
    -   The sidebar might be hidden, and a menu button should appear in the header to toggle it.
    -   The main content should adjust to the smaller screen size without breaking the layout.
