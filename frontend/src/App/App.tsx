import { Outlet } from 'react-router'
import './App.css'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import RootStore, { RootStoreContext } from 'store/RootStore/RootStore'
import { observer } from 'mobx-react-lite'

const rootStore = new RootStore()

const App = observer(() => {
  const { themeStore } = rootStore
  const isDark = themeStore.theme === 'dark'

  const inputColors = {
    bg: isDark ? "rgba(45, 45, 48, 1)" : "rgba(247, 245, 248, 1)",
    text: isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(112, 113, 118, 1)",
    placeholder: isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(112, 113, 118, 1)",
  }

  return (
    <RootStoreContext.Provider value={rootStore}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,

          token: {
            colorPrimary: 'rgba(24, 144, 255, 1)',
            fontFamily: "Roboto"
          },

          components: {
            Input: {
              activeBg: inputColors.bg,
              hoverBg: inputColors.bg,
              colorBgContainer: inputColors.bg,
              colorText: inputColors.text,
              colorTextPlaceholder: inputColors.placeholder,
              colorBorder: "transparent"
            },
            Select: {
              colorBgContainer: inputColors.bg,
              colorBorder: "transparent",
            }
          }
        }}>
        <AntdApp>
          <Outlet />
        </AntdApp>
      </ConfigProvider>
    </RootStoreContext.Provider>
  )
})

export default App
