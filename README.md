# wantedBoard

### spec
* node, express
* typescript
* mysql
* 모두 최신 버전

### db table create sql
* /src/db/wantedBoard.sql

### server start
1. npm i
2. npm run build
3. npm run start


### api
1. board list api
* GET localhost:3000/boardList?offset=0&limit=30&searchText=searchText
  - params
    + offset(optional, default: 0): page 단위
    + limit(optional, default: 30): page에 row수
    + searchTest(optional): writer(작성자), title(제목) 검색
2. board create api
* POST localhost:3000/board
  - request body
    + writer: 작성자
    + password: 비밀번호
    + title: 제목
    + content: 내용
3. board update api
* PUT localhost:3000/board/:id
  - request body
    + writer: 작성자
    + password: 비밀번호 (저장했던 글의 비밀번호 확인용)
    + title: 제목
    + content: 내용
4. board delete api
* PUT localhost:3000/board/:id/delete
  - PUT을 사용한 이유: delete 메소드를 사용하게 되면 password를 전송할때 url에 남기 때문에 body를 사용하기 위해 put 사용
  - request body
    + password: 비밀번호 (저장했던 글의 비밀번호 확인용)
5. commnet list api
* GET localhost:3000/comment/:boardId?offset=0&limit=30
  - params
    + offset(optional, default: 0): page 단위
    + limit(optional, default: 30): page에 row수
6. comment create api
* POST localhost:3000/comment/
  - request body
    + boardId: 게시글 id
    + writer: 작성자
    + content: 내용
    + upCommentId(optional): 상위 댓글 id (댓댓글 까지만 사용가능)