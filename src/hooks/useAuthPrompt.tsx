import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

type PromptReason =
  | 'purchase'
  | 'join_community'
  | 'comment'
  | 'add_friend'
  | 'save_event'
  | 'generic';

interface UseAuthPromptReturn {
  showPrompt: boolean;
  promptReason: PromptReason;
  openPrompt: (reason?: PromptReason) => void;
  closePrompt: () => void;
  requireAuth: (action: () => void, reason?: PromptReason) => void;
}

/**
 * Hook to handle auth prompts for protected actions
 *
 * Usage:
 * const { requireAuth, showPrompt, promptReason, closePrompt } = useAuthPrompt();
 *
 * // In a click handler:
 * onClick={() => requireAuth(() => doSomething(), 'purchase')}
 *
 * // In JSX:
 * <AuthPromptModal isOpen={showPrompt} onClose={closePrompt} reason={promptReason} />
 */
export function useAuthPrompt(): UseAuthPromptReturn {
  const { isAuthenticated } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptReason, setPromptReason] = useState<PromptReason>('generic');

  const openPrompt = useCallback((reason: PromptReason = 'generic') => {
    setPromptReason(reason);
    setShowPrompt(true);
  }, []);

  const closePrompt = useCallback(() => {
    setShowPrompt(false);
  }, []);

  const requireAuth = useCallback(
    (action: () => void, reason: PromptReason = 'generic') => {
      if (isAuthenticated) {
        action();
      } else {
        openPrompt(reason);
      }
    },
    [isAuthenticated, openPrompt]
  );

  return {
    showPrompt,
    promptReason,
    openPrompt,
    closePrompt,
    requireAuth,
  };
}

export default useAuthPrompt;
