import { useState, useEffect, useRef, useCallback } from "react";

interface UseUnsavedChangesOptions<T> {
  initialData: T | null;
  formData: T;
  autosaveEnabled?: boolean;
  autosaveDelay?: number;
  onAutoSave?: () => Promise<void>;
}

export function useUnsavedChanges<T extends Record<string, unknown>>({
  initialData,
  formData,
  autosaveEnabled = false,
  autosaveDelay = 30000, // 30 seconds default
  onAutoSave,
}: UseUnsavedChangesOptions<T>) {
  const [hasChanges, setHasChanges] = useState(false);
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>("");

  // Deep compare function for objects and arrays
  const deepCompare = useCallback((a: unknown, b: unknown): boolean => {
    if (a === b) return true;
    if (a == null || b == null) return a === b;
    if (typeof a !== typeof b) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, idx) => deepCompare(item, b[idx]));
    }

    if (typeof a === "object" && typeof b === "object") {
      const aKeys = Object.keys(a as object);
      const bKeys = Object.keys(b as object);
      if (aKeys.length !== bKeys.length) return false;
      return aKeys.every((key) =>
        deepCompare(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key]
        )
      );
    }

    return false;
  }, []);

  // Check for changes
  useEffect(() => {
    if (!initialData) {
      setHasChanges(false);
      return;
    }

    const currentDataString = JSON.stringify(formData);
    const initialDataString = JSON.stringify(initialData);
    
    const changed = currentDataString !== initialDataString;
    setHasChanges(changed);

    // Autosave logic
    if (autosaveEnabled && changed && onAutoSave && currentDataString !== lastSavedRef.current) {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
      
      autosaveTimerRef.current = setTimeout(async () => {
        await onAutoSave();
        lastSavedRef.current = JSON.stringify(formData);
      }, autosaveDelay);
    }

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [formData, initialData, autosaveEnabled, autosaveDelay, onAutoSave]);

  const resetChanges = useCallback(() => {
    setHasChanges(false);
    lastSavedRef.current = JSON.stringify(formData);
  }, [formData]);

  return { hasChanges, resetChanges };
}
