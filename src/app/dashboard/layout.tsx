import React, { ReactNode } from 'react'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar  from "@/components/sidebar/app-sidebar"
import { Separator } from '@/components/ui/separator'
import { requireAuth } from '@/modules/auth/utils/auth-utils'
const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    await requireAuth()
  return (
      <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
              <header className='h-16 flex shrink-0 items-center gap-2 border-b px-4'>
                  <SidebarTrigger className='-ml-1' />
                  <Separator orientation='vertical' className='mx-2 h-4' />
                  <h1>Dashboard</h1>
              </header>
              <main className='p-4 flex overflow-auto md:p-6'>
                  
            {children}
              </main>
          </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout