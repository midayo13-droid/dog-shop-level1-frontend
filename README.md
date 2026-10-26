# 몽실 미용실 관리 – 프론트엔드 (Level 1)

반려동물 미용실에서 **직원**과 **사장님**이 쓰는 화면이에요. Next.js로 만들었고 **Vercel**에 올리도록 준비했어요.

- 서버(백엔드) 저장소: `dog-shop-level1-backend`
- 기획서: [기획서.md](./기획서.md)

## 배포 주소

- 직원 화면: https://dog-shop-level1-frontend.vercel.app
- 사장님 관리 화면: https://dog-shop-level1-frontend.vercel.app/admin
- 서버(백엔드): https://dog-shop-level1-backend.onrender.com (확인: `/health`)

## 화면

| 화면 | 주소 | 하는 일 |
|---|---|---|
| 직원 화면 | `/` | 강아지·미용 기록·공지·이벤트 보기, **신규 등록**, 고객·강아지 정보 **수정(삭제는 없음)**, 주의사항 추가, 목록 검색 |
| 사장님 관리 화면 | `/admin` | 고객·미용 기록·관리사·공지·이벤트 등록·수정·삭제와 검색 |

Level 1은 로그인이 없어서 두 화면을 **주소로만** 나눠요. 위쪽의 "사장님 화면 >", "직원 화면 >" 버튼으로 오갈 수 있어요.
확인용 계정은 없어요. (로그인과 관리자·일반 구분은 Level 3 내용이에요.)

> ⏳ 서버(Render 무료)가 잠들어 있으면 **첫 화면이 열리는 데 1분 가까이** 걸릴 수 있어요. 기다리면 정상으로 열려요.

## 설정값 (환경 변수)

값은 **Vercel 설정 화면이나 `.env.local` 파일에만** 넣어요. `.env.local`은 GitHub에 올라가지 않아요. 예시는 [.env.example](./.env.example)에 있어요.

| 이름 | 뜻 | 예시 |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | 백엔드 서버 주소. 끝에 `/`는 붙이지 않아요 | `https://내-서버주소.onrender.com` |

> `NEXT_PUBLIC_`으로 시작하는 값은 브라우저에서 보일 수 있어요. 그래서 비밀번호 같은 값은 절대 넣지 않아요. (서버 주소만 넣어요.)

## 내 컴퓨터에서 실행

먼저 백엔드를 켜 주세요 (기본 http://localhost:4000).

```bash
npm install
cp .env.example .env.local   # 백엔드 주소를 확인해 주세요
npm run dev
```

직원 화면: http://localhost:3000 · 관리 화면: http://localhost:3000/admin

## Vercel에 올리기

1. Vercel에서 **Add New → Project**를 고르고 이 저장소를 가져와요.
2. Framework는 **Next.js**로 자동 선택돼요. Build/Output 설정은 바꾸지 않아도 돼요.
3. **Environment Variables**에 `NEXT_PUBLIC_API_URL`(Render 서버 주소)을 넣고 **Deploy**를 눌러요.
4. 배포 주소(`https://….vercel.app`)가 나오면, 백엔드 Render의 `CORS_ORIGIN`에 그 주소를 넣고 백엔드를 다시 배포해요.
   (이 값이 맞지 않으면 화면에 "서버에 연결할 수 없어요"가 나와요.)
