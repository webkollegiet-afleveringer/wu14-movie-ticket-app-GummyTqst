import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Popup({ 
        isOpen, 
        onClose, 
        title, 
        message, 
        children, 
        buttonText, 
        icon, 
        navigateTo = "/" }) {
    const dialogRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    const handleAction = () => {
        onClose();
        navigate(navigateTo);
    };

    if (!isOpen) return null;

    return (
        <dialog 
            ref={dialogRef}
            className="relative mt-auto mb-0 bg-[#63ace5] rounded-t-[40px] rounded-b-none p-8 pt-16 w-full max-w-sm text-center backdrop:bg-black/50 overflow-visible border-none"
            onClose={onClose}
        >
            {/* Floating Icon Container */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-accent rounded-full p-2 border-3 border-white">
                <div className="w-full h-full rounded-full flex items-center justify-center">
                    {icon || (
                        <svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.1651 0.232316L36.6524 5.42854C38.386 6.00742 39.5582 7.59993 39.5676 9.38463L39.6663 24.8795C39.6968 29.5769 37.9843 34.1325 34.8484 37.7019C33.406 39.3401 31.5573 40.7473 29.1965 42.0057L20.8715 46.4561C20.6107 46.5933 20.3241 46.6643 20.0352 46.6666C19.7463 46.6688 19.4573 46.6002 19.1989 46.4652L10.7964 42.1179C8.40973 40.88 6.54458 39.4934 5.08817 37.8781C1.9005 34.3453 0.129312 29.8103 0.0987739 25.106L5.64118e-05 9.62259C-0.00928271 7.8356 1.14175 6.23166 2.86596 5.62989L18.2946 0.248333C19.2107 -0.076574 20.2325 -0.0834382 21.1651 0.232316ZM28.5712 16.8435C27.8782 16.1777 26.7624 16.1823 26.0789 16.8573L18.2189 24.6047L15.0007 21.5112C14.3077 20.8454 13.1943 20.8522 12.5084 21.5272C11.8248 22.2022 11.8318 23.2868 12.5248 23.9526L16.9951 28.2542C17.3427 28.5882 17.7937 28.753 18.2448 28.7485C18.6958 28.7461 19.1444 28.5768 19.4874 28.2382L28.5853 19.2689C29.2689 18.5939 29.2618 17.5094 28.5712 16.8435Z" fill="white"/>
                        </svg>
                    )}
                </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                {title}
            </h3>
            
            <p className="text-text mb-8 px-4 text-md">
                {message}
            </p>

            {children}

            <button 
                onClick={handleAction}
                className="w-full py-4 bg-[#1e2129] text-white rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-transform"
            >
                {buttonText}
            </button>
        </dialog>
    );
}