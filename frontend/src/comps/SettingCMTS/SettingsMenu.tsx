import React from 'react';

type MenuItem = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
};

type SettingsMenuProps = {
    items: MenuItem[];
    className?: string;
};

const SettingsMenu: React.FC<SettingsMenuProps> = ({ items, className }) => {
    return (
        <aside className={`settings-menu-sidebar ${className ?? ''}`}>
            <ul>
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className={item.active ? 'active' : ''}
                        onClick={item.onClick}
                        style={{ cursor: item.onClick ? 'pointer' : 'default' }}
                    >
                        {item.icon && <span className="icon">{item.icon}</span>}
                        <span className="label">{item.label}</span>
                    </li>
                ))}
            </ul>
            <style>{`
                .settings-menu-sidebar {
                    width: 220px;
                    background: #f8f9fa;
                    border-right: 1px solid #e0e0e0;
                    padding: 16px 0;
                    height: 100vh;
                }
                .settings-menu-sidebar ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                .settings-menu-sidebar li {
                    display: flex;
                    align-items: center;
                    padding: 12px 24px;
                    transition: background 0.2s;
                }
                .settings-menu-sidebar li.active,
                .settings-menu-sidebar li:hover {
                    background: #e3e7ed;
                }
                .settings-menu-sidebar .icon {
                    margin-right: 12px;
                }
            `}</style>
        </aside>
    );
};

export default SettingsMenu;