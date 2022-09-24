# SolidJS TypeWriter

A simple SolidJS component for adding a nice typewriter effect to your project.

## Install

```sh
npm i solidjs-typewriter
```

### Example

```jsx
import { Typewriter } from "solidjs-typewriter";

const MyComponent = () => {
  return (
    <div class="App">
      <Typewriter words={["Hey", "There"]} />
    </div>
  );
};
```

### Example With Hook

```jsx
import { createTypeWriter, Cursor } from "solidjs-typewriter";

const MyComponent = () => {
  const typeWriter = createTypeWriter({
    words: ["Hello", "From", "Typewriter", "Hook!"],
    loop: 3, // use loop: true for infinite loop
    onLoopDone: () => console.log(`loop completed.`),
  });
  return (
    <div class="App">
      <span>{typeWriter().text}</span>
      <Cursor />
    </div>
  );
};
```
