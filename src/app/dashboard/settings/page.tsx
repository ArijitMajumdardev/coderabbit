import ProfileForm from '@/components/settings/ProfileForm'
import React from 'react'

const SettingsPage = () => {
  return (
     <div className="space-y-4 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and repositories
        </p>
          </div>
          <ProfileForm/>
      </div>
  )
}

export default SettingsPage