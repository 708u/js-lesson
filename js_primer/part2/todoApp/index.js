import { App } from "./src/App.js";

const app = new App();

addEventListener('load', () => {
    app.mount();
})

addEventListener('unload', () => {
    app.unmount();
})
