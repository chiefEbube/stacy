import { createContext, RefObject, useContext } from 'react';
import { View } from 'react-native';

export const BlurTargetContext = createContext<RefObject<View | null> | null>(null);

export const useBlurTarget = () => useContext(BlurTargetContext);
