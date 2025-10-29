
# Manual Test Cases for Navigation Hooks

## Test Suite: useNavigation Hook

**Objective:** To ensure the useNavigation hook provides correct navigation and routing information.

---

### **Test Case 1: Verify Initial State**

-   **Test ID:** NAV-01
-   **Description:** Ensure the hook returns the correct initial state.
-   **Steps:**
    1.  Render a component that uses the `useNavigation` hook on a specific route (e.g., `/dashboard`).
-   **Expected Result:**
    -   `currentPath` should be `/dashboard`.
    -   `breadcrumb` should be an array representing the breadcrumb for the current path.
    -   `navigationHistory` should contain the initial path.

---

### **Test Case 2: navigateTo Function**

-   **Test ID:** NAV-02
-   **Description:** Verify the `navigateTo` function navigates to the specified path.
-   **Steps:**
    1.  Call `navigateTo('/some-page')`.
-   **Expected Result:**
    -   The user should be navigated to `/some-page`.
    -   The `navigationHistory` should be updated with the new path.

---

### **Test Case 3: goBack Function**

-   **Test ID:** NAV-03
-   **Description:** Verify the `goBack` function navigates to the previous page.
-   **Steps:**
    1.  Navigate to a few pages.
    2.  Call the `goBack()` function.
-   **Expected Result:**
    -   The user should be navigated to the previously visited page.

---

## Test Suite: useRouteParams Hook

**Objective:** To ensure the useRouteParams hook correctly parses and manipulates URL query parameters.

---

### **Test Case 1: Get Parameter**

-   **Test ID:** RP-01
-   **Description:** Verify the `getParam` function retrieves a query parameter from the URL.
-   **Steps:**
    1.  Navigate to a URL with a query parameter (e.g., `/search?q=testing`).
    2.  Call `getParam('q')`.
-   **Expected Result:**
    -   The function should return `testing`.

---

### **Test Case 2: Set Parameter**

-   **Test ID:** RP-02
-   **Description:** Verify the `setParam` function adds or updates a query parameter.
-   **Steps:**
    1.  Call `setParam('sort', 'asc')`.
-   **Expected Result:**
    -   The function should return a new URL string with `?sort=asc` appended.

---

## Test Suite: usePageMeta Hook

**Objective:** To ensure the usePageMeta hook correctly updates the page title and meta description.

---

### **Test Case 1: Set Title and Description**

-   **Test ID:** PM-01
-   **Description:** Verify the hook sets the document title and meta description.
-   **Steps:**
    1.  Render a component that uses the `usePageMeta` hook with a title and description.
-   **Expected Result:**
    -   The document's title should be updated.
    -   The `content` of the meta description tag should be updated.
