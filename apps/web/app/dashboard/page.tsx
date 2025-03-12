import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation';
import React from 'react'

async function Dashboard() {
  const session = await getSession();

  if(!session || !session.user) redirect('/auth/login');

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
