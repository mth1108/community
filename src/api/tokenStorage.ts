const KEY= 'token'

// KEY값 등록, 저장, 삭제를 여러번 사용할 예정이니, 게속 사용할 코드 메서드화
export const tokenStorage = {

  get: () => localStorage.getItem(KEY),
  set: (t: string) => localStorage.setItem(KEY, t),
  clear: () => localStorage.removeItem(KEY)

}

