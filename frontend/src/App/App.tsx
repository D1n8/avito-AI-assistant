import { Outlet } from 'react-router'
import './App.css'
import { ConfigProvider, App as AntdApp } from 'antd'
import RootStore, { RootStoreContext } from 'store/RootStore/RootStore'

const rootStore = new RootStore()

function App() {

  return (
    <RootStoreContext.Provider value={rootStore}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'rgba(24, 144, 255, 1)',
            fontFamily: "Roboto"
          },
          components: {
            Input: {
              activeBg: "rgba(247, 245, 248, 1)",
              hoverBg: "rgba(247, 245, 248, 1)",
              colorBgContainer: "rgba(247, 245, 248, 1)",
              colorText: "rgba(112, 113, 118, 1)",
              colorTextPlaceholder: "rgba(112, 113, 118, 1)",
              colorBorder: "transparent"
            }
          }
        }}>
        <AntdApp>
          <Outlet />
        </AntdApp>
      </ConfigProvider>
    </RootStoreContext.Provider>
  )
}

export default App
