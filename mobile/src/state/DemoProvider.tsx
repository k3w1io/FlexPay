import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react';
import {
  initialState,
  reducer,
  restoreState,
  type Action,
  type DemoState,
} from '../domain/demo';

const KEY = 'flexpay.customer-demo.v1';
type Context = {
  state: DemoState;
  dispatch: Dispatch<Action>;
  ready: boolean;
  storageError: boolean;
};
const DemoContext = createContext<Context | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatchInternal] = useReducer(
    (s: DemoState, a: Action | { type: 'hydrate'; value: DemoState }) =>
      a.type === 'hydrate' ? a.value : reducer(s, a),
    undefined,
    initialState,
  );
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const writeQueue = useRef<Promise<void>>(Promise.resolve());
  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (mounted)
          dispatchInternal({ type: 'hydrate', value: restoreState(raw) });
      })
      .catch(() => {
        if (mounted) setStorageError(true);
      })
      .finally(() => {
        if (mounted) setReady(true);
      });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    // Serialize writes so rapid actions cannot leave older progress on disk.
    if (ready)
      writeQueue.current = writeQueue.current
        .then(() => AsyncStorage.setItem(KEY, JSON.stringify(state)))
        .catch(() => setStorageError(true));
  }, [ready, state]);
  return (
    <DemoContext.Provider
      value={{ state, dispatch: dispatchInternal, ready, storageError }}
    >
      {children}
    </DemoContext.Provider>
  );
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error('DemoProvider is required');
  return value;
}
