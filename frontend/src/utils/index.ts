import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export const formatDate = (dateString: string) => {
    return dayjs(dateString).format('D MMMM HH:mm')
}