# EventSphere

This is a platform to find, join or create events. 

## Live Link
[EventSphere](https://eventsphere-mysterio.netlify.app)

## Server Side Repo
[Server](https://github.com/Mysterio-O/EventSphere-server)

## Key Features

### Navbar
- **Responsive Design**: Fully responsive across all device.
- **Navigation Options**:
  - **Home Button**: Redirects to homepage.
  - **Events**
   - Navigate to all events page.
   - Search between events with title
   - sort based on date
   - Join button to join the event.
  - **Add Event**: Navigate to add event page
  - **My Event**: Displays user's added events with search bar

### Banner
 - A responsive banner with animation with a explore events button. Clicking the button navigates user to all events page.

### Top 5 Events
 - This section displays real time top 5 events based on their attendeeCount with a view details button.
 - Clicking on the view details button opens a modal with detailed information.

### Upcoming events
 - This section displays top 3 upcoming events based on todays date.
 - In every card there is a join now button(if not logged in:- sign in to join).
 - Clicking on that button instantly joins the user in that event and a user can join an event only once

 ### Footer
  - Footer part is simple as the whole website containing multiple links.
  - Clicking those links smoothly scroll to those sections.


#### Developer experience

 - This was the very first project of mine where I tried to create my own email/pass based authentication system. Yeah, it was a bit challenging, handling login and register was quite easy. The thing auth state change observing was the real hard part. I am happy, i did this. This was a nice experience.
