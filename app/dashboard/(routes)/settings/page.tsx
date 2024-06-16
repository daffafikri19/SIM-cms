import { Tabs, TabsProps } from 'antd'
import React from 'react'
import { GeneralTabContent } from './(tabs)/general';
import { UserTabContent } from './(tabs)/user';

const SettingsPage = () => {

  const items: TabsProps['items'] = [
    { key: '1', label: 'General', children: <GeneralTabContent /> },
    { key: '2', label: 'Pengguna', children: <UserTabContent /> },
  ];

  return (
    <Tabs
      items={items}
      tabPosition='left'
      defaultActiveKey='2'
    />
  )
}

export default SettingsPage
