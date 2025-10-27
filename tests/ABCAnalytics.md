# Test Cases for AnalyticsDashboard Component

**Component Path:** `src/adminDashboard/forms/ABCAnalytics.jsx`

**Objective:** To verify the functionality, UI, and data visualization of the `AnalyticsDashboard` component.

---

## Manual Test Case Scenarios

**ANALYTICS-M-01**
**Category:** Functional
**Title:** Initial Component Render
**Pre-conditions:**
- User navigates to the analytics dashboard page.
**Steps:**
1.  Load the page containing the `AnalyticsDashboard` component.
2.  Observe the entire dashboard layout.
**Expected Result:**
- The title "Analytics Dashboard" is visible.
- The date range filter shows the default dates.
- "All HR" and "All TL" are selected in their respective dropdowns.
- All five metric cards (DateWise Count, Total Count, etc.) are displayed with default values.
- The "Date Wise Account Created" line chart and the three pie charts are rendered with data.
- The color legend for accounts is visible at the bottom.

---

**ANALYTICS-M-02**
**Category:** Functional
**Title:** Date Range Filter - Quick Filters
**Pre-conditions:**
- The dashboard is loaded.
**Steps:**
1.  Click on the date range filter button to open the calendar view.
2.  Click on "Today". Observe the date range.
3.  Repeat for "Yesterday", "Last 7 days", "Last 30 days", "This month", and "Last month".
**Expected Result:**
- For each quick filter clicked, the date range text updates accordingly, and the calendar view closes.
- The data on the dashboard should refresh to reflect the new date range (Note: In the current static component, this will not change the data, but in a live app, it should).

---

**ANALYTICS-M-03**
**Category:** Functional
**Title:** Date Range Filter - Manual Date Selection
**Pre-conditions:**
- The dashboard is loaded.
**Steps:**
1.  Open the calendar view.
2.  In the "Manual Date Input" section, select a new "start" date.
3.  Select a new "end" date.
4.  Observe the main date range filter button.
**Expected Result:**
- The date range text on the button updates to reflect the manually selected dates.

---

**ANALYTICS-M-04**
**Category:** Functional
**Title:** Date Range Filter - Calendar Date Picking
**Pre-conditions:**
- The dashboard is loaded.
**Steps:**
1.  Open the calendar view.
2.  Click on a day to select it as the start date.
3.  Click on a subsequent day to select it as the end date.
4.  Observe the selected range in the calendar and the main filter button.
**Expected Result:**
- The days between the start and end dates are highlighted in the calendar.
- The date range text on the button updates to the selected range.

---

**ANALYTICS-M-05**
**Category:** Functional
**Title:** Filter by Team Lead (TL)
**Pre-conditions:**
- The dashboard is loaded.
**Steps:**
1.  Click the "All TL" dropdown.
2.  Select a specific Team Lead from the list (e.g., "Abhinandan Shukla").
3.  Observe the five metric cards at the top.
**Expected Result:**
- The values in the metric cards update to reflect the data for the selected Team Lead. For "Abhinandan Shukla", the "DateWise Count" should be "45", "Total Count" should be "3200", etc.

---

**ANALYTICS-M-06**
**Category:** UI/Visual
**Title:** Chart Tooltip Verification
**Pre-conditions:**
- The dashboard is loaded.
**Steps:**
1.  Hover the mouse over a data point on the "Date Wise Account Created" line chart.
2.  Hover the mouse over a segment of the "Pending Account" pie chart.
**Expected Result:**
1.  A custom tooltip appears, showing the date and the "count" for that point, with correct styling for the current theme (light/dark).
2.  A custom tooltip appears, showing the account name and its value, with correct styling.

---

**ANALYTICS-M-07**
**Category:** UI/Visual
**Title:** Dark Mode Rendering
**Pre-conditions:**
- The application theme can be toggled between light and dark.
**Steps:**
1.  Load the dashboard in light mode.
2.  Switch the application theme to dark mode.
3.  Observe all components on the dashboard.
**Expected Result:**
- All text, backgrounds, cards, and chart elements (axis text, tooltips) should adapt to the dark theme colors, ensuring readability and good contrast. There should be no visual glitches.