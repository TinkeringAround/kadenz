type PrototypeType = 'HTML' | 'MouseEvent';

let original: {
  [key: string]: Array<{ property: string; value: any }>;
} = {};

const getPrototypeByType = (type: PrototypeType): any => {
  switch (type) {
    case 'HTML':
      return HTMLElement.prototype;
    case 'MouseEvent':
      return MouseEvent.prototype;
    default:
      HTMLElement.prototype;
  }
};

export const mockProperties = (type: PrototypeType, properties: string[], mockValues: any[]) => {
  if (properties.length !== mockValues.length)
    throw Error('Property Array and Mock Values array must have same length.');

  const prototype = getPrototypeByType(type);

  // save original Properties
  original[type] = properties.map(property => ({
    property,
    value: Object.getOwnPropertyDescriptor(prototype, property)
  }));

  // overwrite properties
  properties.forEach((property, index) =>
    Object.defineProperty(prototype, property, {
      configurable: true,
      value: mockValues[index]
    })
  );
};

export const unMockProperties = (type: PrototypeType) => {
  if (!!original[type]) throw Error('Type has to be mocked first in order to be unmocked.');

  const prototype = getPrototypeByType(type);

  original[type] &&
    original[type].forEach(({ property, value }) => {
      value && Object.defineProperty(prototype, property, value);
    });
};

export const mockResizeObserver = () => {
  const observe = jest.fn(),
    unobserve = jest.fn(),
    disconnect = jest.fn();

  class ResizeObserver {
    observe() {
      observe();
    }

    unobserve() {
      unobserve();
    }

    disconnect() {
      disconnect();
    }
  }

  window.ResizeObserver = ResizeObserver;

  return { observe, unobserve, disconnect };
};
