import React from 'react';
import { IconX, IconAlertTriangle, IconCheck, IconInfoCircle } from '@tabler/icons-react';

export default function Modal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type = 'danger', // danger, success, info
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDark
}) {
    if (!isOpen) return null;

    const typeConfig = {
        danger: {
            icon: <IconAlertTriangle className="text-rose-500" size={32} />,
            btn: "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20",
            lightBg: "bg-rose-50",
            darkBg: "bg-rose-500/10"
        },
        success: {
            icon: <IconCheck className="text-emerald-500" size={32} />,
            btn: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20",
            lightBg: "bg-emerald-50",
            darkBg: "bg-emerald-500/10"
        },
        info: {
            icon: <IconInfoCircle className="text-blue-500" size={32} />,
            btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20",
            lightBg: "bg-blue-50",
            darkBg: "bg-blue-500/10"
        }
    };

    const config = typeConfig[type] || typeConfig.danger;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className={`w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl scale-in-center transition-all ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white"
                    }`}
            >
                <div className="p-8 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${isDark ? config.darkBg : config.lightBg}`}>
                        {config.icon}
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {title}
                    </h3>

                    <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-[240px]">
                        {message}
                    </p>

                    <div className="flex gap-3 w-full mt-10">
                        <button
                            onClick={onClose}
                            className={`flex-1 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${isDark
                                    ? "border-gray-800 text-gray-400 hover:bg-gray-800"
                                    : "border-gray-100 text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 ${config.btn}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
