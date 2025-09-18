import { useEffect, useRef, useCallback } from 'react';
import { safeTrack } from '../client';

export const useGlobalButtonTracking = () => {
  const lastClickTime = useRef<number>(0);
  const debounceDelay = 100; // Prevent excessive events within 100ms

  const handleGlobalClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    // Debouncing: prevent rapid successive clicks
    const now = Date.now();
    if (now - lastClickTime.current < debounceDelay) {
      return;
    }
    lastClickTime.current = now;
      
      // Check if the clicked element is a button or link
      const isButton = target.tagName === 'BUTTON' || 
                      target.tagName === 'A' ||
                      target.role === 'button' ||
                      target.classList.contains('button') ||
                      target.classList.contains('btn');

      if (!isButton) return;

      // Extract button information
      const buttonText = target.textContent?.trim() || 
                        target.getAttribute('aria-label') || 
                        target.getAttribute('title') || 
                        'Unknown Button';

      // Find the section this button belongs to
      const section = target.closest('section')?.querySelector('h1, h2, h3')?.textContent ||
                     target.closest('[data-section]')?.getAttribute('data-section') ||
                     'unknown';

      // Determine button type and action
      let buttonType = 'button';
      let action = 'click';
      let url: string | undefined;
      let external = false;

      if (target.tagName === 'A') {
        const link = target as HTMLAnchorElement;
        buttonType = 'link';
        action = 'navigate';
        url = link.href;
        external = link.target === '_blank' || !link.href.includes(window.location.origin);
      } else if ((target as HTMLButtonElement).type === 'submit') {
        buttonType = 'submit';
        action = 'submit';
      }

      // Detect specific button types based on classes or content
      if (target.classList.contains('ai-button') || buttonText.toLowerCase().includes('ai')) {
        buttonType = 'ai';
        action = 'ai_interact';
      } else if (target.classList.contains('toolbar-button') || target.closest('.toolbar')) {
        buttonType = 'toolbar';
        action = 'format';
      } else if (target.classList.contains('action-button') || target.classList.contains('actionButton')) {
        buttonType = 'action';
        action = 'primary_action';
      } else if (target.classList.contains('github') || buttonText.toLowerCase().includes('github')) {
        buttonType = 'social';
        action = 'view_code';
      } else if (buttonText.toLowerCase().includes('storybook') || buttonText.toLowerCase().includes('demo')) {
        buttonType = 'demo';
        action = 'view_demo';
      }

      // Track the button click
      safeTrack('button_clicked', {
        buttonText,
        buttonType,
        section,
        action,
        url,
        external,
        timestamp: Date.now(),
        currentPage: window.location.pathname,
        elementId: target.id || undefined,
        elementClass: target.className || undefined,
      });
    }, []);

  useEffect(() => {
    // Add the global click listener
    document.addEventListener('click', handleGlobalClick, { passive: true });

    // Cleanup
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [handleGlobalClick]);
};