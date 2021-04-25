-- board table create sql
CREATE TABLE board
(
    `id`         INT              NOT NULL    AUTO_INCREMENT COMMENT 'id', 
    `writer`     VARCHAR(255)     NULL        COMMENT '작성자', 
    `password`   VARCHAR(255)     NULL        COMMENT '비밀번호', 
    `title`      VARCHAR(255)     NULL        COMMENT '제목', 
    `content`    VARCHAR(2000)    NULL        COMMENT '내용', 
    `createdAt`  DATETIME         NULL        COMMENT '작성일시', 
    `updatedAt`  DATETIME         NULL        COMMENT '수정일시', 
    `isDeleted`  TINYINT(1)       NULL        DEFAULT 0 COMMENT '삭제여부', 
    CONSTRAINT PRIMARY KEY (id),
    FULLTEXT IDX_board_fulltext (writer, title)
);

-- comment table create sql
CREATE TABLE comment
(
    `id`           INT             NOT NULL    AUTO_INCREMENT COMMENT 'id', 
    `boardId`      INT             NULL        COMMENT 'boardId', 
    `upCommentId`  INT             NULL        COMMENT '상위댓글ID',
    `writer`       VARCHAR(255)    NULL        COMMENT '작성자', 
    `content`      VARCHAR(255)    NULL        COMMENT '내용', 
    `createdAt`    DATETIME        NULL        COMMENT '작성일시', 
    CONSTRAINT  PRIMARY KEY (id),
    FOREIGN KEY (boardId) REFERENCES wanted.board(id) ON UPDATE CASCADE
);


-- sample data create sql
-- password => 1111: $2a$10$gqHz4lEA2hFMTPsBtkKXPuuWxZxjJjTFMVTmTsuLDbbIpG8869kRG

-- board insert
INSERT INTO wanted.board (writer, `password`, title, content, createAt, updateAt)) 
VALUES 
('writer1', '$2a$10$gqHz4lEA2hFMTPsBtkKXPuuWxZxjJjTFMVTmTsuLDbbIpG8869kRG', 'board title 1', 'constent 1', NOW(), NOW());

INSERT INTO wanted.board (writer, `password`, title, content, createAt, updateAt)) 
VALUES 
('writer2', '$2a$10$gqHz4lEA2hFMTPsBtkKXPuuWxZxjJjTFMVTmTsuLDbbIpG8869kRG', 'board title 2', 'constent 2', NOW(), NOW());

-- comment insert
INSERT INTO wanted.comment (writer, content, upCommentId, boardId, createdAt)
SELECT 'cmt_writer1', 'cmt_content1', null, id, NOW() FROM wanted.board ORDER BY id ASC LIMIT 1; 

INSERT INTO wanted.comment (writer, content, upCommentId, boardId, createdAt)
SELECT 'cmt_writer2', 'cmt_content2', null, id, NOW() FROM wanted.board ORDER BY id ASC LIMIT 1; 

INSERT INTO wanted.comment (writer, content, upCommentId, boardId, createdAt)
SELECT 'cmt_writer3', 'nested comment content', id, boardId, NOW() FROM wanted.comment ORDER BY id ASC LIMIT 1;