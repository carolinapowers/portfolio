import { useCallback, useRef, useEffect } from 'react';
import { trackEditorEvent } from '../utils/eventHelpers';
import type { EditorEvent } from '../events';

interface UseEditorTrackingOptions {
  characterCountMilestones?: number[];
  enableFormatting?: boolean;
  enableInput?: boolean;
  enableSave?: boolean;
}

export const useEditorTracking = ({
  characterCountMilestones = [100, 500, 1000, 2000],
  enableFormatting = true,
  enableInput = true,
  enableSave = true,
}: UseEditorTrackingOptions = {}) => {
  const sessionStartTime = useRef<number>(Date.now());
  const lastInputTime = useRef<number>(Date.now());
  const trackedMilestones = useRef<Set<number>>(new Set());
  const totalKeystrokes = useRef<number>(0);
  const formattingUsage = useRef<Map<string, number>>(new Map());

  // Reset session tracking
  const resetSession = useCallback(() => {
    sessionStartTime.current = Date.now();
    lastInputTime.current = Date.now();
    trackedMilestones.current.clear();
    totalKeystrokes.current = 0;
    formattingUsage.current.clear();
  }, []);

  // Track text input events
  const trackInput = useCallback((characterCount: number) => {
    if (!enableInput) return;

    lastInputTime.current = Date.now();
    totalKeystrokes.current += 1;

    // Track character count milestones
    characterCountMilestones.forEach(milestone => {
      if (
        characterCount >= milestone && 
        !trackedMilestones.current.has(milestone)
      ) {
        trackedMilestones.current.add(milestone);
        
        const eventData: EditorEvent = {
          action: 'input',
          characterCount,
          sessionDuration: Date.now() - sessionStartTime.current,
        };

        trackEditorEvent(eventData);
      }
    });

    // Track general input every 50 characters (throttled)
    if (characterCount > 0 && characterCount % 50 === 0) {
      const eventData: EditorEvent = {
        action: 'input',
        characterCount,
        sessionDuration: Date.now() - sessionStartTime.current,
      };

      trackEditorEvent(eventData);
    }
  }, [characterCountMilestones, enableInput]);

  // Track formatting events
  const trackFormatting = useCallback((formatType: 'bold' | 'italic' | 'underline' | 'link', characterCount: number) => {
    if (!enableFormatting) return;

    // Update formatting usage statistics
    const currentUsage = formattingUsage.current.get(formatType) || 0;
    formattingUsage.current.set(formatType, currentUsage + 1);

    const eventData: EditorEvent = {
      action: 'format',
      formatType,
      characterCount,
      sessionDuration: Date.now() - sessionStartTime.current,
    };

    trackEditorEvent(eventData);
  }, [enableFormatting]);

  // Track save events
  const trackSave = useCallback((characterCount: number, isAutoSave: boolean = false) => {
    if (!enableSave) return;

    const eventData: EditorEvent = {
      action: 'save',
      characterCount,
      sessionDuration: Date.now() - sessionStartTime.current,
    };

    trackEditorEvent({
      ...eventData,
      // Add additional properties for save events
      isAutoSave,
      totalKeystrokes: totalKeystrokes.current,
      formattingUsage: Object.fromEntries(formattingUsage.current),
    } as EditorEvent & { isAutoSave: boolean; totalKeystrokes: number; formattingUsage: Record<string, number> });
  }, [enableSave]);

  // Track clear events
  const trackClear = useCallback((previousCharacterCount: number) => {
    const eventData: EditorEvent = {
      action: 'clear',
      characterCount: 0,
      sessionDuration: Date.now() - sessionStartTime.current,
    };

    trackEditorEvent({
      ...eventData,
      previousCharacterCount,
      totalKeystrokes: totalKeystrokes.current,
      formattingUsage: Object.fromEntries(formattingUsage.current),
    } as EditorEvent & { previousCharacterCount: number; totalKeystrokes: number; formattingUsage: Record<string, number> });

    // Reset tracking state after clear
    resetSession();
  }, [resetSession]);

  // Track session end when component unmounts
  useEffect(() => {
    const startTime = sessionStartTime.current;
    const keystrokes = totalKeystrokes;
    const formatting = formattingUsage;
    
    return () => {
      const sessionDuration = Date.now() - startTime;
      
      // Only track if session was longer than 10 seconds
      if (sessionDuration > 10000) {
        const formattingUsageSnapshot = Object.fromEntries(formatting.current);
        trackEditorEvent({
          action: 'input',
          characterCount: 0,
          sessionDuration,
          sessionEnded: true,
          totalKeystrokes: keystrokes.current,
          formattingUsage: formattingUsageSnapshot,
        } as EditorEvent & { sessionEnded: boolean; totalKeystrokes: number; formattingUsage: Record<string, number> });
      }
    };
  }, []);

  return {
    trackInput,
    trackFormatting,
    trackSave,
    trackClear,
    resetSession,
    getSessionStats: () => ({
      sessionDuration: Date.now() - sessionStartTime.current,
      totalKeystrokes: totalKeystrokes.current,
      formattingUsage: Object.fromEntries(formattingUsage.current),
      trackedMilestones: Array.from(trackedMilestones.current),
    }),
  };
};