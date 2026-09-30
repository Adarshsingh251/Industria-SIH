import React from 'react';
import { X, Check, Bell, AlertTriangle, Clock, ArrowRight, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from './Button';

export function NotificationDrawer({ isOpen, onClose }) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    onClose();
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#D1D9D0] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E3E8E2] bg-[#FAFBF9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#245C3A]" />
              <h3 className="font-semibold text-[#18201B] text-base">Notifications & Action Items</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllNotificationsRead}
                title="Mark all as read"
                className="text-xs text-[#58655C] hover:text-[#245C3A] font-medium flex items-center gap-1 p-1 hover:bg-[#F1F4EE] rounded transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
              <button onClick={onClose} className="p-1 text-[#839187] hover:text-[#18201B] rounded-md hover:bg-[#F1F4EE]">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E3E8E2]">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-sm text-[#839187]">
                No notifications right now.
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-4 transition-colors cursor-pointer hover:bg-[#FAFBF9] flex items-start gap-3.5 ${
                    !notif.read ? 'bg-[#F9FAF8]' : ''
                  }`}
                >
                  <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!notif.read ? 'bg-[#245C3A]' : 'bg-transparent'}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-[#245C3A] uppercase tracking-wider">
                        {notif.category}
                      </span>
                      <span className="text-[11px] text-[#839187]">{notif.timestamp}</span>
                    </div>

                    <h4 className={`text-sm font-semibold leading-snug ${!notif.read ? 'text-[#18201B]' : 'text-[#58655C]'}`}>
                      {notif.title}
                    </h4>

                    <p className="text-xs text-[#58655C] mt-1 leading-relaxed">
                      {notif.description}
                    </p>

                    <div className="flex items-center gap-1 text-xs font-semibold text-[#245C3A] mt-2.5">
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#E3E8E2] bg-[#FAFBF9] flex items-center justify-between">
            <span className="text-xs text-[#839187]">
              {notifications.filter(n => !n.read).length} unread action items
            </span>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
