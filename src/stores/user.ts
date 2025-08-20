import { create } from 'zustand'
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const initialUser = {
  user: {
    name: 'bo',
    age: 22,
    address: {
      city: 'Gumi',
      emails: ['bo0.jeong@samsung.com', 'jbyqwert@gmail.com'],
    },
  },
  birthYear: 0,
}

export const useUserStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine(initialUser, set => {
            return {
              setFirstEmail: (email: string) => {
                set(state => {
                  state.user.address.emails[0] = email
                })
              },
            }
          })
        )
      ),
      {
        name: 'user',
        // default localstorage
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
)

useUserStore.subscribe(
  // 선택자 함수, 구독
  state => state.user.age,
  // 실행할 함수
  age => {
    useUserStore.setState({
      birthYear: new Date().getFullYear() - age,
    })
  }
)

// export const useUserStore = create(
//   immer(
//     combine(
//       {
//         user: {
//           name: 'bo',
//           age: 22,
//           address: {
//             city: 'Gumi',
//             emails: ['bo0.jeong@samsung.com', 'jbyqwert@gmail.com'],
//           },
//         },
//       },
//       (set, get) => {
//         return {
//           setFirstEmail: (email: string) => {
//             const { user } = get()
//             set({
//               user: {
//                 ...user,
//                 address: {
//                   ...user.address,
//                   emails: [email, ...user.address.emails[1]],
//                 },
//               },
//             })
//           },
//         }
//       }
//     )
//   )
// )

// export const useUserStore = create(
//   subscribeWithSelector(
//     persist(
//       combine({}, () => {
//         return {}
//       })
//     )
//   )
// )
