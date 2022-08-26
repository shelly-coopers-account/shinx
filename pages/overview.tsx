import DashboardLayout from '@components/layouts'
import type { Page } from 'next/app'

const Overview: Page = () => {
  return <></>
}

Overview.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Overview
