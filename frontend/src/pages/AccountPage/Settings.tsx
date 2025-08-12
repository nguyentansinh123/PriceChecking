import React, { act } from "react";
import SettingsMenu from "@/comps/SettingCMTS/SettingsMenu";
import Navbar from "@/comps/HomeCMTS/Navbar";
import Footer from "@/comps/HomeCMTS/Footer";
import { useState } from "react";


const languages = ["English", "Vietnamese", "French"];
const dateFormats = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];
const timeFormats = ["12-hour", "24-hour"];
const countries = ["United States", "Vietnam", "France"];
const timeZones = [
    "UTC-08:00 Pacific Time (US & Canada)",
    "UTC+07:00 Indochina Time",
    "UTC+01:00 Central European Time",
];

const settingsMenuItems = [
    { label: "Profile", key: "profile", active: false },
    { label: "Branding", key: "branding", active: false },
    { label: "My Link", key: "my-link", active: false },
    { label: "Phone Number", key: "phone-number", active: false },
    { label: "Login", key: "login", active: false },
    { label: "Cookie Settings", key: "cookie-settings", active: false },
];

export default function Settings() {
    const [avatar, setAvatar] = React.useState<string | null>(null);
    const [name, setName] = React.useState("");
    const [welcomeMsg, setWelcomeMsg] = React.useState("");
    const [language, setLanguage] = React.useState(languages[0]);
    const [dateFormat, setDateFormat] = React.useState(dateFormats[0]);
    const [timeFormat, setTimeFormat] = React.useState(timeFormats[0]);
    const [country, setCountry] = React.useState(countries[0]);
    const [timeZone, setTimeZone] = React.useState(timeZones[0]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleRemoveAvatar = () => setAvatar(null);

    const handleSave = () => {
        // Save logic here
    };

    const handleCancel = () => {
        // Cancel logic here
    };

    const handleDeleteAccount = () => {
        // Delete account logic here
    };

    return (

    <>
        <div className="min-h-screen bg-gray-100 py-10 overflow-hidden">
            <div className="w-4/5 mx-auto space-y-15">
                <Navbar />

                


        <div className="flex min-h-screen bg-gray-50">
            <SettingsMenu items={settingsMenuItems}/>
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                <div className="bg-white rounded-lg shadow p-6 max-w-xl">
                    <div className="flex items-center mb-6">
                        <div className="relative w-20 h-20 mr-6">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-400">
                                    ?
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleAvatarChange}
                                title="Change avatar"
                            />
                        </div>
                        <button
                            className="ml-2 text-sm text-red-500 hover:underline"
                            onClick={handleRemoveAvatar}
                            disabled={!avatar}
                        >
                            Remove
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Welcome Message</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                            value={welcomeMsg}
                            onChange={e => setWelcomeMsg(e.target.value)}
                            placeholder="Welcome message"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Language</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                        >
                            {languages.map(l => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Date Format</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={dateFormat}
                            onChange={e => setDateFormat(e.target.value)}
                        >
                            {dateFormats.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Time Format</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={timeFormat}
                            onChange={e => setTimeFormat(e.target.value)}
                        >
                            {timeFormats.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Country</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        >
                            {countries.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">Time Zone</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={timeZone}
                            onChange={e => setTimeZone(e.target.value)}
                        >
                            {timeZones.map(tz => (
                                <option key={tz} value={tz}>{tz}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                        <button
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>

        </div>
        </div>

        <Footer />
    </>
    );
}