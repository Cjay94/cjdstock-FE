"use client";

import React, { useState } from 'react'
import Header from '../(components)/Header'

type UserSetting = {
    label: string;
    value: string | boolean;
    type: "text" | "toggle";
}

const mockSettings: UserSetting[] = [
    { label: "User Name", value: "John Doe", type: "text" },
    { label: "Email", value: "sample@example.com", type: "text" },
    { label: "Notification", value: true, type: "toggle" },
    { label: "Dark Mode", value: false, type: "toggle" },
    { label: "Language", value: "English", type: "text" },
];

const Settings = () => {
    const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

    const handleToggleChange = (index: number) => {
        const settingsCopy = [...userSettings];
        settingsCopy[index].value = !settingsCopy[index].value as boolean;
        setUserSettings(settingsCopy);
    };

    return (
        <div className="w-full">
            <Header title="User Settings" />
            <div className="overflow-x-auto mt-5 shadow-md">
                <table className="min-w-full bg-white rounded-lg">

                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                Setting
                            </th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                Value
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {mockSettings.map((setting, idx) => (
                            <tr className="hover:bg-blue-50" key={idx}>
                                <td className="py-2 px-4">{setting.label}</td>
                                <td className="py-2 px-4">
                                    {setting.type === "toggle" ? (
                                        <label className="inline-flex relative items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={setting.value as boolean}
                                                onChange={() => handleToggleChange(idx)}
                                            />
                                            <div
                                                className="w-11 h-6 bg-grey-200 rounded-full peer peer-focus:ring-blue-400
                                                peer-focus:ring-4 transition peer-checked:after:translate-x-full
                                                peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5
                                                after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full
                                                after:size-5 after:transition-all peer-checked:bg-blue-600"
                                            />
                                        </label>
                                    ) : (
                                        <input
                                            type="text"
                                            className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                                            value={setting.value as string}
                                            onChange={(e) => {
                                                const settingsCopy = [...userSettings];
                                                settingsCopy[idx].value = e.target.value;
                                                setUserSettings(settingsCopy)
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Settings