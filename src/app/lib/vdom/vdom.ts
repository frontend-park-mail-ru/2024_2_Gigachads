interface Props {
    [key: string]: string;
}

type Children = (VirtualElement | string)[];

export interface VirtualElement {
    type: string;
    props: Props;
}


export const createVDomElement = (type: string, props = {}): VirtualElement => {
    return {
        type,
        props
    };
};

function ChildrenToArray(children: Children | string | undefined | number): Children {
    if (children === undefined || children === null) {
        return [];
    }
    if (Array.isArray(children)) {
        return children;
    }
    if (typeof children === "number") {
        return [children.toString()];
    }
    return [children];
}

export function createDomElement(virtualElement: VirtualElement | string) : HTMLElement | Text {
    if (typeof virtualElement === "string") {
        return document.createTextNode(virtualElement);
    }

    const { type, props } = virtualElement;
    const { children } = props;

    const normalizedChildren: Children = ChildrenToArray(children);

    const domElement = document.createElement(type);

    Object.entries(props).forEach(([key, value]) => {
        setProp(domElement, key, value);
    });

    normalizedChildren.forEach((child: VirtualElement | string) => {
        domElement.appendChild(createDomElement(child));
    });

    return domElement;
}

export function Fragment(props: { children: Children }) {
    return props.children;
};

export const mount = (elementDom: HTMLElement, target: HTMLElement) => {
    elementDom.replaceWith(target);
    return target;
};

export const patchElement = (elementDom: HTMLElement, elementVDom: VirtualElement | string, nextElementVDom: VirtualElement | string | undefined) => {
    if (elementVDom !== undefined) {
        if (nextElementVDom === undefined) {
            elementDom.remove();
        }
        else if (((typeof elementVDom === "string" || typeof nextElementVDom === "string") && elementVDom !== nextElementVDom) ||
            (typeof elementVDom !== "string" && typeof nextElementVDom !== "string" && elementVDom.type !== nextElementVDom.type)) {
            const nextElementDom = createDomElement(nextElementVDom);
            elementDom.replaceWith(nextElementDom);
        }
        else if ((typeof elementVDom !== "string" && typeof nextElementVDom !== "string") && (typeof elementVDom !== "number" && typeof nextElementVDom !== "number")) {
            patchProps(elementDom, elementVDom.props, nextElementVDom.props);
            patchChildren(elementDom, ChildrenToArray(elementVDom.props.children), ChildrenToArray(nextElementVDom.props.children));
        }
    }
    return elementDom;
};

function patchChildren(parent: HTMLElement, oldChildren: Children, newChildren: Children) {

    const childElements = Array.from(parent.childNodes);
    childElements.forEach((childElement, i) => {
        patchElement(childElement as HTMLElement, oldChildren[i], newChildren[i]);
    });

    newChildren.slice(oldChildren.length).forEach(vChild => {
        parent.appendChild(createDomElement(vChild));
    });
    // Так же можно для виртуальных нод добавить поле key, чтобы использовать его в списках, как это сделано в React, 
    // и при добавлении элемента в начало списка не обновлять все следующие ноды.
}

function setProp(elementDom: HTMLElement, key: string, value: string) {
    if (key.startsWith("on")) {
        const eventName = key.slice(2);
        elementDom[eventName] = value;
        if (!value) {
          elementDom.removeEventListener(eventName, listener);
        } else {
          elementDom.addEventListener(eventName, listener);
        }
        return;
    }

    if (key !== "children") {
        if (key === "className") {
            elementDom.setAttribute("class", value);
        }
        else if (key === "style") {
            if (typeof value === "string") {
                elementDom.style.cssText = value;
            }
            else {
                Object.entries(value).forEach(([styleKey, styleValue]) => {
                    elementDom.style[styleKey as any] = styleValue as any;
                });
            }
        }
        else {
            elementDom.setAttribute(key, value);
        }
    }
}

function patchProps(elementDom: HTMLElement, oldProps: Props, newProps: Props) {
    const mergedProps = { ...oldProps, ...newProps };
    Object.entries(mergedProps).forEach(([key, value]) => {
        if (newProps[key] === undefined || newProps[key] == null) {
            elementDom.removeAttribute(key);
        }
        else if ((oldProps[key] !== newProps[key]) || oldProps[key] === undefined) {
            setProp(elementDom, key, value);
        }
    });
}


export const patch = (elementDom: HTMLElement, nextElementVDom: VirtualElement ) : HTMLElement => {
    const VDom = elementDom.vdom;
    if (VDom === undefined) {
        elementDom = mount(elementDom, createDomElement(nextElementVDom) as HTMLElement);
    }
    else {
        elementDom = patchElement(elementDom, VDom, nextElementVDom);
    }
    elementDom.vdom = nextElementVDom;


    return elementDom;
}

function listener(event: Event) {
    return this[event.type](event);
  }