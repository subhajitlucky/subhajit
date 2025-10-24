import { renderHook, act, waitFor } from '@testing-library/react';
import useSpaceTheme from '../hooks/useSpaceTheme';

const originalMutationObserver = global.MutationObserver;
const observers = new Set();

class MockMutationObserver {
  constructor(callback) {
    this.callback = callback;
    this.target = null;
    observers.add(this);
  }

  observe(target) {
    this.target = target;
  }

  disconnect() {
    observers.delete(this);
  }
}

function triggerMutation() {
  observers.forEach((observer) => {
    observer.callback([
      {
        type: 'attributes',
        attributeName: 'data-theme',
        target: observer.target
      }
    ]);
  });
}

function setBodyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  triggerMutation();
}

describe('useSpaceTheme', () => {
  beforeAll(() => {
    global.MutationObserver = MockMutationObserver;
  });

  afterAll(() => {
    observers.clear();
    global.MutationObserver = originalMutationObserver;
  });

  beforeEach(() => {
    setBodyTheme('day');
  });

  afterEach(() => {
    document.body.removeAttribute('data-theme');
  });

  it('returns false when theme is not space', () => {
    const { result } = renderHook(() => useSpaceTheme());
    expect(result.current).toBe(false);
  });

  it('returns true when theme is space', async () => {
    await act(async () => {
      setBodyTheme('space');
    });
    const { result } = renderHook(() => useSpaceTheme());
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('updates when the data-theme attribute changes', async () => {
    const { result } = renderHook(() => useSpaceTheme());

    expect(result.current).toBe(false);

    await act(async () => {
      setBodyTheme('space');
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    await act(async () => {
      setBodyTheme('day');
    });

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});
