import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-2xl">

        <h2 className="text-xl font-semibold">Admin Settings</h2>

        {/* General Settings */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">
                Enable eco dark theme
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                darkMode ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  darkMode ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          {/* Notification Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Receive alerts for critical devices
              </p>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                notifications ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  notifications ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

        </div>

        {/* Save Button */}
        <div>
          <button className="eco-gradient px-6 py-3 rounded-xl text-primary-foreground font-medium">
            Save Changes
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
