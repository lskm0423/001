# 독서 기록앱

읽은 책과 읽고 싶은 책을 등록하고, 독서 상태와 기록(메모/리뷰)을 관리하는 개인용 독서 기록 서비스.

- 문서: `docs/PRD_new.md`(제품 요구사항), `ROADMAP_new.md`(개발 로드맵)
- 프론트엔드: React + Vite + TypeScript (`src/`)
- 백엔드: Node.js + Express + SQLite (`server/`)

## 실행 방법

```bash
# 백엔드 (포트 4000)
npm install --prefix server
npm run dev:server

# 프론트엔드 (포트 5173, /api 요청은 백엔드로 프록시됨)
npm install
npm run dev
```

## 기타 명령어

```bash
npm run build   # 프론트엔드 타입체크 및 빌드
npm run lint     # 프론트엔드 린트
```
