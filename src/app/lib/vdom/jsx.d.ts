declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }

    type Element = import('./vdom').VirtualElement | string;
    type ElementChildrenAttribute = { children: {} };
} 