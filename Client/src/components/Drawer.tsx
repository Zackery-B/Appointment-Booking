import "../styles/Drawer.css";

type DrawerProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Drawer({ open, onClose, children }: DrawerProps) {
    if (!open) return null;

    return (
        <>
        <div className="overlay" onClick={onClose} />

        <div className="drawer">
            <button onClick={onClose}>Close</button>
            {children}
        </div>
        </>
    );
}


