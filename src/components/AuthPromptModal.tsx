import { Link } from 'react-router-dom';
import { X, LogIn, UserPlus, Ticket, Heart, MessageSquare, Users } from 'lucide-react';

type PromptReason =
  | 'purchase'
  | 'join_community'
  | 'comment'
  | 'add_friend'
  | 'save_event'
  | 'generic';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: PromptReason;
}

const reasonConfig: Record<PromptReason, { title: string; description: string; icon: typeof Ticket }> = {
  purchase: {
    title: 'Sign in to Purchase',
    description: 'Create an account or sign in to buy tickets and manage your orders.',
    icon: Ticket,
  },
  join_community: {
    title: 'Sign in to Join',
    description: 'Create an account or sign in to join communities and stay updated on events.',
    icon: Users,
  },
  comment: {
    title: 'Sign in to Comment',
    description: 'Create an account or sign in to participate in discussions.',
    icon: MessageSquare,
  },
  add_friend: {
    title: 'Sign in to Connect',
    description: 'Create an account or sign in to add friends and see who\'s going to events.',
    icon: Users,
  },
  save_event: {
    title: 'Sign in to Save',
    description: 'Create an account or sign in to save events and get reminders.',
    icon: Heart,
  },
  generic: {
    title: 'Sign in Required',
    description: 'Create an account or sign in to continue.',
    icon: LogIn,
  },
};

export default function AuthPromptModal({ isOpen, onClose, reason = 'generic' }: AuthPromptModalProps) {
  if (!isOpen) return null;

  const config = reasonConfig[reason];
  const Icon = config.icon;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-surface border border-white/10 w-full max-w-md rounded-sm shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Icon */}
            <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon className="w-8 h-8 text-lime" />
            </div>

            {/* Title & Description */}
            <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-white mb-3">
              {config.title}
            </h2>
            <p className="text-gray-400 mb-8">
              {config.description}
            </p>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                to="/auth/register"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full bg-lime text-dark font-semibold uppercase tracking-tight py-4 rounded-sm hover:bg-limehover transition-colors"
              >
                <UserPlus className="w-5 h-5" />
                Create Account
              </Link>
              <Link
                to="/auth/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full border border-white/20 text-white font-semibold uppercase tracking-tight py-4 rounded-sm hover:bg-white/5 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </Link>
            </div>

            {/* Continue Browsing */}
            <button
              onClick={onClose}
              className="mt-6 text-sm text-gray-500 hover:text-gray-400 transition-colors"
            >
              Continue browsing
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
