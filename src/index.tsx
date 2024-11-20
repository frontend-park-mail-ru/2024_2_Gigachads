import {patch} from './app/lib';
import type { VirtualElement } from './app/lib';


declare global {
    interface HTMLElement {
        vdom?: VirtualElement;
    }
}

class App {
    private appElement: HTMLElement;
    constructor(appElement: HTMLElement) {
        this.appElement = appElement;
    }
    render(jsx: VirtualElement) {
        this.appElement = patch(this.appElement as HTMLElement, jsx);
    }
}



const store = {
    state: { count: 0 },
    onStateChanged: () => {},
    setState(nextState: { count: number }) {
      this.state = nextState;
      this.onStateChanged();
    }
  };

  const createVButton = (props: { text: string, onclick: () => void }) => {
    const { text, onclick } = props;
  
    return (
        <button onclick={onclick}>{text}</button>
    )
};


const vApp = (count: number) => (
    <div id="app">
        <h1>Hello, Virtual DOM</h1>
        Text node without tags
        <div data-count={count}>{count}</div>
        <img src="https://i.ibb.co/M6LdN5m/2.png" width="200"></img>
        {createVButton({ text: 'Click me', onclick: () => {
            store.setState({ count: count + 1 });
        }})}
        {createVButton({ text: 'Click me', onclick: () => {
            store.setState({ count: count - 1 });
        }})}
    </div>
)
  
const app = new App(document.getElementById('app') as HTMLElement);
app.render( 
    vApp(store.state.count) as VirtualElement
);




store.onStateChanged = () => {
    app.render(
        vApp(store.state.count) as VirtualElement
    );
};


