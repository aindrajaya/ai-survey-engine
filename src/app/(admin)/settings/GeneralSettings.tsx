"use client"

import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const GeneralSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    // TODO: Implement saving general settings
    console.log('Saving general settings:', { emailNotifications, darkMode });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="email-notifications"
          checked={emailNotifications}
          onCheckedChange={setEmailNotifications}
        />
        <Label htmlFor="email-notifications">Enable email notifications</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="dark-mode"
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
        <Label htmlFor="dark-mode">Dark mode</Label>
      </div>
      
      <Button onClick={handleSave}>Save General Settings</Button>
    </div>
  );
};

export default GeneralSettings;
