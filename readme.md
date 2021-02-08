## Ionic Master/Detail Layout

**Glossary**

Large = a screen wider or equal to 735px (I only picked that for convenience)
Small = a screen narrower than 735px
Master Panel = The (ltr) left hand panel that contains our cards
Detail Panel = The (ltr) right hand panel that contains the details of a selected card
Cards = The content we place typically in the Master panel
Information = The content we place typically in the Detail panel or second screen

### Common

All of these usecases require the following:

1. Content is not reloaded as we want to hold on to scroll position and inner state of any of the components (say a form in Information)
2. All states must be deep-linked. In this example we have `/` and `/detail`
3. Animations should use the built in Ionic animations when applicable

### Usecase 1

1. User is viewing on a Small screen and sees the Cards in Master
2. User taps a Card in Master and the typical IonRouterOutlet animation happens to show the respective Information in the same screen (full screen animation).
3. User then widens their screen to 740px
4. Expect the Information to be presented in the Detail panel on the right while Cards are presented in the Summary on the left.

Example without animations:
![Example Without Animations]()

### Usecase 2

1. User is viewing on a Large screen and sees just the Cards in Master
2. User taps a Card in the Master panel and sees the Information in the Detail panel to the right
3. User then shrinks the size of the screen to 730px
4. Expect the Information to be presented full screen Detail
5. User then taps the resulting "Back" button which would dynamically appear based on screen size.
6. Expect the IonRouterOutlet animation to hide this Detail panel and show the Master panel with the Cards
