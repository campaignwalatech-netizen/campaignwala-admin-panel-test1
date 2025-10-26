# Test Cases for ActivityFeed Component

**Component Path:** `src/adminDashboard/components/ActivityFeed.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `ActivityFeed` component, ensuring it provides a seamless experience for all users.

---

Manual Test Case Scenarios
**AF-M-01**
Category: Functional
Title: Render with Standard Activity Data
Pre-conditions:
The application's theme is set to "light mode".
The `activities` prop is passed a valid array of 2 or more activity objects. 
Steps:
1. Navigate to the page rendering the component with standard data.
2. Observe the output.
Expected Result:
1. The title "Recent Activity" is visible.
2. A list with the correct number of items is displayed.
3. Each item correctly shows the user's initial, name, action, and time.

---

**AF-M-02** 
Category:Functional   
Title: Render with an Empty Activity List   
Pre-conditions:   
The application's theme is set to "light mode".   
The `activities` prop is an empty array `[]`.  
Steps:                          
1. Navigate to the page rendering the component with an empty array.
2. Observe the output.    
Expected Result:                               
1. The title "Recent Activity" is visible.
2. The area below the title is empty, with no activity items or errors shown. 

---

**AF-M-03** 
Category:UI/Visual   
Title: Verify Dark Mode Styling   
Pre-conditions:   
The application's theme is set to "dark mode".  
Steps:                          
1. Render the component.
2. Switch the application to dark mode.
3. Observe the component's styling.
Expected Result:
The component's background, text, and border colors change to the specified dark mode styles (`dark:bg-gray-800`, `dark:text-white`, etc.).

---

**AF-M-04** 
Category:UI/Visual   
Title: Handle Long Text Content   
Pre-conditions:
An activity object contains very long strings for the `user` or `action` fields.
Steps:
1. Render the component with data containing long text.
2. Observe the layout.                                                
Expected Result:
Text should wrap correctly or be truncated. 

---

**AF-M-05** 
Category:Edge Case   
Title: Handle `null` or `undefined` props   
Pre-conditions:
The `activities` prop is `null` or `undefined`.
Steps:
1. Attempt to render the component under this condition.
2. Observe the output.
Expected Result:    
The application must not crash. The component should render a graceful empty state (e.g., just the title) or nothing at all.             |

---

**AF-M-06**
Category:Edge Case
Title: Handle Activity Object with Missing `user` Key
Pre-conditions:
An activity object in the array is missing the `user` key.
Steps:
1. Render the component with the malformed data.
2. Observe the output.
Expected Result:
The application must not crash.
This is a critical failure point, as `.charAt(0)` will be called on `undefined`. 
The component should handle this by not rendering the user initial/name.

---

**AF-M-07**
Category:Edge Case
Title: Handle Activity Object with Other Missing Keys
Pre-conditions:
An activity object in the array is missing `action` or `time`.
Steps:
1. Render the component with the malformed data.
2. Observe the output.
Expected Result:                                                                                
The component should not crash. 
It should render the parts of the activity it can, leaving the missing data's area blank.   

---

**AF-M-08** 
Category: Accessibility 
Title:Screen Reader Compatibility   
Pre-conditions:        
A screen reader (e.g., NVDA, VoiceOver, Narrator) is active. 
Steps:
1. Navigate to the component using the screen reader. 
2. Observe the output.
Expected Result:                                                                          
The screen reader should announce the "Recent Activity" title and then read out the content of each activity item in a logical order (e.g., "John Doe, updated a product, 2 hours ago").
