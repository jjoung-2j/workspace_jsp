---- **** MyMVC 다이내믹웹프로젝트 에서 작업한 것 **** ----

-- 오라클 계정 생성을 위해서는 SYS 또는 SYSTEM 으로 연결하여 작업을 해야 합니다. [SYS 시작] --
show user;
-- USER이(가) "SYS"입니다.

-- 오라클 계정 생성시 계정명 앞에 c## 붙이지 않고 생성하도록 하겠습니다.
alter session set "_ORACLE_SCRIPT"=true;
-- Session이(가) 변경되었습니다.

-- 오라클 계정명은 MYMBC_USER 이고 암호는 gclass 인 사용자 계정을 생성합니다.
create user MYMVC_USER identified by gclass default tablespace users; 
-- User MYMVC_USER이(가) 생성되었습니다.

-- 위에서 생성되어진 MYMBC_USER 이라는 오라클 일반사용자 계정에게 오라클 서버에 접속이 되어지고,
-- 테이블 생성 등등을 할 수 있도록 여러가지 권한을 부여해주겠습니다.
grant connect, resource, create view, unlimited tablespace to MYMVC_USER;
-- Grant을(를) 성공했습니다.

-----------------------------------------------------------------------

show user;
-- USER이(가) "MYMVC_USER"입니다.

create table tbl_main_image
(imgno           number not null
,imgfilename     varchar2(100) not null
,constraint PK_tbl_main_image primary key(imgno)
);
-- Table TBL_MAIN_IMAGE이(가) 생성되었습니다.

create sequence seq_main_image
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_MAIN_IMAGE이(가) 생성되었습니다.

insert into tbl_main_image(imgno, imgfilename) values(seq_main_image.nextval, '미샤.png');  
insert into tbl_main_image(imgno, imgfilename) values(seq_main_image.nextval, '원더플레이스.png'); 
insert into tbl_main_image(imgno, imgfilename) values(seq_main_image.nextval, '레노보.png'); 
insert into tbl_main_image(imgno, imgfilename) values(seq_main_image.nextval, '동원.png'); 

commit;

-- 시퀀스 삭제
-- DROP SEQUENCE seq_main_image;

-- 테이블 삭제
-- delete from tbl_main_image;

select imgno, imgfilename
from tbl_main_image
order by imgno asc;

---------------------------------------------------------------

---- **** 회원 테이블 생성 **** ----
-- 패스워드, 이메일, 휴대폰번호는 암호화할 것
/*
    평문(plain text) ==> 암호화가 안된 문장(순수한 것)
    I am a boy
    
    암호화된 문장(encrypted text)
    평문(plain text) + 암호화키(key)
    I am a boy + 1 ==> J bn b cpz   // char 번호로 변환된 수 + 1 한 후 다시 영문으로 변경
    
    복호화된 문장(decrypted text) ==> 해독된 문장
    암호화된 문장(encrypted text) + 암호화키(key)
    J bn b cpz - 1 ==>  I am a boy

    AES256 방식 ==> 양방향 암호화 (암호화 및 복호화가 가능함) , 암호화키(key) 반드시 필요함.
    SHA256 방식 ==> 단방향 암호화 (암호화만 되어지고 복호화가 불가능함) , 암호화키(key)가 없음.
        -> 국가기밀(ex.전쟁교류)
     
    입력값 : qwer1234$
    실제 db에 들어오는 암호 : sanhfklasdmnlmjipowaejans~~~ (암호화 / 규칙모름)
    암호화된 값들의 입력은 최대가 정해져있지만 실제 저장된 값은 암호화되기 때문에 길이가 길다.

*/

create table tbl_member    
(userid             varchar2(40)   not null  -- 회원아이디
,pwd                varchar2(200)  not null  -- 비밀번호 (SHA-256 암호화 대상)
,name               varchar2(30)   not null  -- 회원명
,email              varchar2(200)  not null  -- 이메일 (AES-256 암호화/복호화 대상)
,mobile             varchar2(200)            -- 연락처 (AES-256 암호화/복호화 대상) 
,postcode           varchar2(5)              -- 우편번호
,address            varchar2(200)            -- 주소
,detailaddress      varchar2(200)            -- 상세주소
,extraaddress       varchar2(200)            -- 참고항목
,gender             varchar2(1)              -- 성별   남자:1  / 여자:2
,birthday           varchar2(10)             -- 생년월일   
,coin               number default 0         -- 코인액
,point              number default 0         -- 포인트 
,registerday        date default sysdate     -- 가입일자 
,lastpwdchangedate  date default sysdate     -- 마지막으로 암호를 변경한 날짜  
,status             number(1) default 1 not null     -- 회원탈퇴유무   1: 사용가능(가입중) / 0:사용불능(탈퇴) 
,idle               number(1) default 0 not null     -- 휴면유무      0 : 활동중  /  1 : 휴면중 
,constraint PK_tbl_member_userid primary key(userid)
,constraint UQ_tbl_member_email  unique(email)
,constraint CK_tbl_member_gender check( gender in('1','2') )
,constraint CK_tbl_member_status check( status in(0,1) )
,constraint CK_tbl_member_idle check( idle in(0,1) )
);
-- Table TBL_MEMBER이(가) 생성되었습니다.

-- === 회원 정보 === --
select *
from tbl_member
order by registerday desc;

--------------------------------------------------------
create table tbl_loginhistory
(historyno   number
,fk_userid   varchar2(40) not null  -- 회원아이디
,logindate   date default sysdate not null -- 로그인되어진 접속날짜및시간
,clientip    varchar2(20) not null
,constraint  PK_tbl_loginhistory primary key(historyno)
,constraint  FK_tbl_loginhistory_fk_userid foreign key(fk_userid) references tbl_member(userid)
);
-- Table TBL_LOGINHISTORY이(가) 생성되었습니다.

create sequence seq_historyno
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_HISTORYNO이(가) 생성되었습니다.

-- === 로그인 기록 보기 === --
select historyno
    , fk_userid
    , to_char(logindate,'yyyy-mm-dd hh24:mi:ss') as logindate
    , clientip
from tbl_loginhistory
order by historyno desc;

-- === 로그인 처리 === --
select userid, name, coin, point
from tbl_member
where status = 1 and userid = 'leess' and pwd = '9695b88a59a1610320897fa84cb7e144cc51f2984520efb77111d94b402a8382';

-- 로그인 기록 1년 1개월 전으로 변경하기 --
update tbl_loginhistory set logindate = add_months(logindate, -13)
where historyno < 7;

commit;
-- 커밋 완료.

/*
    9	leess	    2024-04-29 15:37:31	127.0.0.1       ==> leess 이 마지막으로 로그인 한 날짜
    8	kudi01	    2024-04-29 15:33:02	192.168.0.197
    7	yerinjung	2024-03-29 15:28:30	192.168.0.200
    6	leess	    2023-03-29 15:26:51	192.168.0.200
    5	eomjh	    2023-03-29 15:22:47	192.168.0.197   ==> eomjh 가 마지막으로 로그인 한 날짜
                    == (현재일이 2024-04-29 이므로 마지막으로 로그인 한지가 1년이 초과되었으므로 휴면처리 한다.) ==
    4	eomjh	    2023-03-29 15:20:46	127.0.0.1
    3	leess	    2023-03-29 15:20:25	127.0.0.1
    2	eomjh	    2023-03-29 15:20:11	127.0.0.1
    1	leess	    2023-03-29 15:18:18	127.0.0.1
*/

-- == 이순신 로그인 기록 == --
SELECT *
FROM
(
    select userid, name, coin, point
    from tbl_member
    where status = 1 and userid = 'leess' and pwd = '9695b88a59a1610320897fa84cb7e144cc51f2984520efb77111d94b402a8382'
)M
CROSS JOIN
(
    -- === 제일 마지막에 로그인한 기록 === --
    select max(to_char(logindate,'yyyy-mm-dd hh24:mi:ss')) as logindate
    from tbl_loginhistory
    where fk_userid = 'leess'
)H;

-- == 엄정화 1년전 로그인 하여 휴면처리 할 예정 == --
SELECT userid, name, coin, point, logindate
FROM
(
    select userid, name, coin, point
    from tbl_member
    where status = 1 and userid = 'eomjh' and pwd = '9695b88a59a1610320897fa84cb7e144cc51f2984520efb77111d94b402a8382'
)M
CROSS JOIN
(
    -- === 제일 마지막에 로그인한 기록 === --
    select max(to_char(logindate,'yyyy-mm-dd hh24:mi:ss')) as logindate
    from tbl_loginhistory
    where fk_userid = 'eomjh'
)H;

------------------------------------------------------------------------------
-- ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ --

-- === 오늘과 몇개월 차이인지 구하기 === --
SELECT userid, name, coin, point, lastlogingap
FROM
(
    select userid, name, coin, point
    from tbl_member
    where status = 1 and userid = 'eomjh' and pwd = '9695b88a59a1610320897fa84cb7e144cc51f2984520efb77111d94b402a8382'
)M
CROSS JOIN
(
    -- === 제일 마지막에 로그인한 기록 === --
    select trunc(months_between(sysdate, max(logindate)),0) as lastlogingap     -- 개월 수 차이 확인
    from tbl_loginhistory
    where fk_userid = 'eomjh'
)H
WHERE lastlogingap > 12;


-- === 오늘과 몇개월 차이인지 구하기 === --
SELECT userid, name, coin, point, lastlogingap
FROM
(
    select userid, name, coin, point
    from tbl_member
    where status = 1 and userid = 'leess' and pwd = '9695b88a59a1610320897fa84cb7e144cc51f2984520efb77111d94b402a8382'
)M
CROSS JOIN
(
    -- === 제일 마지막에 로그인한 기록 === --
    select trunc(months_between(sysdate, max(logindate)),0) as lastlogingap     -- 개월 수 차이 확인
    from tbl_loginhistory
    where fk_userid = 'leess'
)H;

-- === 휴면처리 해제하기 === --
-- update tbl_member set idle = 0;

-- 휴면이 아닌 이순신 회원 --
update tbl_member set registerday = add_months(registerday, -5)
                    , lastpwdchangedate = add_months(lastpwdchangedate, -4)
where userid = 'leess';
-- 1 행 이(가) 업데이트되었습니다.

commit;
-- 커밋 완료.

-- === 회원 테이블 확인 === --
select userid, registerday, lastpwdchangedate, idle
from tbl_member;

-- === 로그인 기록 보기 === --
select historyno
    , fk_userid
    , to_char(logindate,'yyyy-mm-dd hh24:mi:ss') as logindate
    , clientip
from tbl_loginhistory
order by historyno desc;

--------------------------------------------------------------------------------------------------
-- ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ --
-- === 자동 로그인이 없는 경우 === --
select trunc(months_between(sysdate, max(logindate)),0) as lastlogingap     -- 개월 수 차이 확인
    from tbl_loginhistory
    where fk_userid = 'asdflkdasf';
-- 회원가입이후 로그인을 1년넘게 안한경우 휴면처리를 해야하는데 로그기록이 없다.(NULL)

-- === 확인방법(Commit X / rollback 할 예정) === --
delete from tbl_loginhistory where fk_userid = 'chaew';

-- === lastlogingap 값이 NULL 값이 나오는 것을 확인 === --
SELECT userid, name, coin, point, lastlogingap
FROM
(
    select userid, name, coin, point
    from tbl_member
    where status = 1 and userid = 'chaew' and pwd = '9695b88a59a1610320897fa84cb7e144cc51f2984520efb77111d94b402a8382'
)M
CROSS JOIN
(
    -- === 제일 마지막에 로그인한 기록 === --
    select trunc(months_between(sysdate, max(logindate)),0) as lastlogingap     -- 개월 수 차이 확인
    from tbl_loginhistory
    where fk_userid = 'chaew'
)H;

-- === 대체 방법 (가입한 날짜와 현재날짜 비교) === --
SELECT userid, name, coin, point, , pwdchangegap
    , nvl(lastlogingap, registerday) as lastlogingap
FROM
(
    select userid, name, coin, point, trunc(months_between(sysdate, registerday),0) as registerday
    from tbl_member
    where status = 1 and userid = 'chaew' and pwd = '9695b88a59a1610320897fa84cb7e144cc51f2984520efb77111d94b402a8382'
)M
CROSS JOIN
(
    -- === 제일 마지막에 로그인한 기록 === --
    select trunc(months_between(sysdate, max(logindate)),0) as lastlogingap     -- 개월 수 차이 확인
    from tbl_loginhistory
    where fk_userid = 'chaew'
)H;

rollback;

-- ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ --
--------------------------------------------------------------------------------------------------

-- === 아이디 찾기 === --
select userid
from tbl_member
where status = 1 and name = '양혜정' and email = 'Si7+V7mpL7xeaAxJvSspEqGgD26M0NSs5XbxyUYF4As=';

-- === 비밀번호 찾기(비밀번호 변경) === --
update tbl_member set pwd = ?, lastpwdchangedate = sysdate
where userid = ? ;

-- === 회원테이블 === --
select *
from tbl_member
order by registerday desc;

-- === 회원의 코인 및 포인트 증가하기 === --
update tbl_member set coin = coint + ?, point = point + ? 
where userid = ? ;

-- === 정보 수정에서의 이메일 중복 체크 === --
select email
from tbl_member
where userid != 'jjoung' and email = 'Si7+V7mpL7xeaAxJvSspEqGgD26M0NSs5XbxyUYF4As=';

-- === 회원 정보 수정 === --
update tbl_member set coin = coin + ?, point = point + ? 
where userid = ? 

--------------------------------------------------------------------------------------------
-- === 회원목록을 위한 회원추가 === -- 
------------------------------------------------------------------------------
-- 오라클에서 프로시저를 사용하여 회원을 대량으로 입력(insert)하겠습니다. --
select * 
from user_constraints
where table_name = 'TBL_MEMBER';

-- 이메일을 대량으로 넣기 위해서 어쩔수 없이 email 에 대한 unique 제약을 없애도록 한다.
alter table tbl_member
drop constraint UQ_TBL_MEMBER_EMAIL;
-- Table TBL_MEMBER이(가) 변경되었습니다.

select * 
from user_constraints
where table_name = 'TBL_MEMBER';

create or replace procedure pcd_member_insert
(p_userid   IN  varchar2
,p_name     IN  varchar2
,p_gender   IN  char)
is
begin
   for i in 1..100 loop
      insert into tbl_member(userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) 
      values(p_userid||i, '9695b88a59a1610320897fa84cb7e144cc51f2984520efb77111d94b402a8382', p_name||i, 'Si7+V7mpL7xeaAxJvSspEqGgD26M0NSs5XbxyUYF4As=', 'L9ppbLda1gsfCgOga9GfAg==', 
            '15864', '경기 군포시 오금로 15-17', '101동 102호', ' (금정동)', p_gender, '1997-10-12'); 
   end loop;
end pcd_member_insert; 
-- Procedure PCD_MEMBER_INSERT이(가) 컴파일되었습니다.

exec pcd_member_insert('byeonwooseok', '변우석', 1);
-- PL/SQL 프로시저가 성공적으로 완료되었습니다.
commit;

exec pcd_member_insert('iyou', '아이유', 2);
-- PL/SQL 프로시저가 성공적으로 완료되었습니다.
commit;

select *
from tbl_member
order by userid asc;

-- === 총 회원 수 === --
select count(*)
from tbl_member
order by userid asc;

insert into tbl_member(userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) 
values('kimyousin', '9695b88a59a1610320897fa84cb7e144cc51f2984520efb77111d94b402a8382', '김유신', 'Si7+V7mpL7xeaAxJvSspEqGgD26M0NSs5XbxyUYF4As=', 'L9ppbLda1gsfCgOga9GfAg==', 
       '15864', '경기 군포시 오금로 15-17', '101동 102호', ' (금정동)', '1', '1984-10-11'); 

insert into tbl_member(userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) 
values('youinna', '9695b88a59a1610320897fa84cb7e144cc51f2984520efb77111d94b402a8382', '유인나', 'Si7+V7mpL7xeaAxJvSspEqGgD26M0NSs5XbxyUYF4As=', 'L9ppbLda1gsfCgOga9GfAg==', 
       '15864', '경기 군포시 오금로 15-17', '101동 102호', ' (금정동)', '2', '2001-10-11');   

commit;       

select count(*)
from tbl_member
order by userid asc;
-- 210

/* 프로시저 잘못 작성함(이메일 수정) 
drop procedure pcd_member_insert;

update tbl_member set email = 'Si7+V7mpL7xeaAxJvSspEqGgD26M0NSs5XbxyUYF4As='
where userid like 'byeonwooseok%';

update tbl_member set email = 'Si7+V7mpL7xeaAxJvSspEqGgD26M0NSs5XbxyUYF4As='
where userid like 'iyou%';

commit;
*/

select userid, name, email, gender, to_char(registerday,'yyyy-mm-dd hh24:mi:ss')
from tbl_member
where userid != 'admin'
order by registerday desc;

-- === 목록 검색 === --
select userid, name, email, gender, registerday
from tbl_member
where userid != 'admin' and name like '%유%'
order by registerday desc;

select userid, name, email, gender, registerday
from tbl_member
where userid != 'admin' and name like '%'||'유'||'%'
order by registerday desc;

select userid, name, email, gender, registerday
from tbl_member
where userid != 'admin' and ? like '%?%'
order by registerday desc;

-- === 목록 검색(암호화된 이메일) === --
select userid, name, email, gender, registerday
from tbl_member
where userid != 'admin' and email = 'Si7+V7mpL7xeaAxJvSspEqGgD26M0NSs5XbxyUYF4As='
order by registerday desc;

select userid, name, email, gender, registerday
from tbl_member
where userid != 'admin' and ? = ?
order by registerday desc;

-- === like 를 사용해도 결과값이 추출된다. === --
select userid, name, email, gender, registerday
from tbl_member
where userid != 'admin' and email like '%Si7+V7mpL7xeaAxJvSspEqGgD26M0NSs5XbxyUYF4As=%'
order by registerday desc;

-- === 페이징 처리 공식 === --
-- where RNO between (조회하고자하는페이지번호 * 한페이지당보여줄행의개수) - (한페이지당보여줄행의개수 - 1) and (조회하고자하는페이지번호 * 한페이지당보여줄행의개수);

-- === 전체 회원 페이징 처리(검색이 없는 경우) === --
/*
    한페이지에 10명
    where RNO between ( 1 * 10 ) - ( 10 - 1 ) and ( 1 * 10 )
    where RNO between 1 and 10
*/
SELECT rno, userid, name, email, gender
FROM
(
    select rownum as rno
        , userid, name, email, gender
    from
    (
        select userid, name, email, gender
        from tbl_member
        order by registerday desc
    ) V
) T
WHERE rno between 1 and 10;  -- 1페이지
--------------------------------------------
SELECT rno, userid, name, email, gender
FROM
(
    select rownum as rno
        , userid, name, email, gender
    from
    (
        select userid, name, email, gender
        from tbl_member
        order by registerday desc
    ) V
) T
WHERE rno between 11 and 20;  -- 2페이지
---------------------------------------------
SELECT rno, userid, name, email, gender
FROM
(
    select rownum as rno
        , userid, name, email, gender
    from
    (
        select userid, name, email, gender
        from tbl_member
        order by registerday desc
    ) V
) T
WHERE rno between 201 and 210;  -- 21페이지
-- 1 2 3 4 5 ...... 20 21
------------------------------------------------------------------
-- === 관리자를 제외한 모든 회원 === --
SELECT rno, userid, name, email, gender
FROM
(
    select rownum as rno
        , userid, name, email, gender
    from
    (
        select userid, name, email, gender
        from tbl_member
        where userid!= 'admin'
        order by registerday desc
    ) V
) T;
----------------------------------------------
SELECT rno, userid, name, email, gender
FROM
(
    select rownum as rno
        , userid, name, email, gender
    from
    (
        select userid, name, email, gender
        from tbl_member
        where userid != 'admin' and name like '%유%'
        order by registerday desc
    ) V
) T
WHERE rno between 101 and 110;  -- 1페이지
-- 1 2 3 4 5 ...... 10 11

-- === 관리자 제외한 회원의 총개수 알아오기 === --
select count(*)
from tbl_member 
where userid != 'admin' 

// === 페이징 처리를 위한 검색이 있는 또는 검색이 없는 회원에 대한 총 페이지 수 알아오기 === //
// === 총 회원수 === //
select count(*)
from tbl_member
where userid != 'admin';

// === 10명 기준 '유' 검색했을 때 총 페이지 === //
select ceil(count(*)/10)
from tbl_member
where userid != 'admin' and name like '%' || '유' || '%';

select *
from tbl_member
where userid = 'iyou71';

// === 회원목록(게시글) 삭제한 경우 === //
delete from tbl_member
where userid = 'iyou71';

commit;

// === 회원목록(게시글) 삭제한 경우 === //
delete from tbl_member
where userid = 'iyou72';

commit;

// === 회원목록(게시글) 삭제한 경우 === //
delete from tbl_member
where userid = 'iyou73';

commit;




--------------------------------------------------------------------




/*
   카테고리 테이블명 : tbl_category 

   컬럼정의 
     -- 카테고리 대분류 번호  : 시퀀스(seq_category_cnum)로 증가함.(Primary Key)
     -- 카테고리 코드(unique) : ex) 전자제품  '100000'
                                  의류     '200000'
                                  도서     '300000' 
     -- 카테고리명(not null)  : 전자제품, 의류, 도서           
  
*/ 
-- drop table tbl_category purge; 
create table tbl_category
(cnum    number(8)     not null  -- 카테고리 대분류 번호
,code    varchar2(20)  not null  -- 카테고리 코드
,cname   varchar2(100) not null  -- 카테고리명
,constraint PK_tbl_category_cnum primary key(cnum)
,constraint UQ_tbl_category_code unique(code)
);

-- drop sequence seq_category_cnum;
create sequence seq_category_cnum 
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;

insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '100000', '전자제품');
insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '200000', '의류');
insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '300000', '도서');
commit;

-- 나중에 넣습니다.
insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '400000', '식품');
commit;

insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '500000', '신발');
commit;

-- === 신발 카테고리 제품등록에 추가된 것과 적용확인 후 제거 === --
delete from tbl_category
where code = '500000';

commit;


select cnum, code, cname
from tbl_category
order by cnum asc;


-- drop table tbl_spec purge;
create table tbl_spec
(snum    number(8)     not null  -- 스펙번호       
,sname   varchar2(100) not null  -- 스펙명         
,constraint PK_tbl_spec_snum primary key(snum)
,constraint UQ_tbl_spec_sname unique(sname)
);

-- drop sequence seq_spec_snum;
create sequence seq_spec_snum
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;

insert into tbl_spec(snum, sname) values(seq_spec_snum.nextval, 'HIT');
insert into tbl_spec(snum, sname) values(seq_spec_snum.nextval, 'NEW');
insert into tbl_spec(snum, sname) values(seq_spec_snum.nextval, 'BEST');

commit;

select snum, sname
from tbl_spec
order by snum asc;


----------------------------------------------------------------------------------------


---- *** 제품 테이블 : tbl_product *** ----
-- drop table tbl_product purge; 
create table tbl_product
(pnum           number(8) not null       -- 제품번호(Primary Key)
,pname          varchar2(100) not null   -- 제품명
,fk_cnum        number(8)                -- 카테고리코드(Foreign Key)의 시퀀스번호 참조
,pcompany       varchar2(50)             -- 제조회사명
,pimage1        varchar2(100) default 'noimage.png' -- 제품이미지1   이미지파일명
,pimage2        varchar2(100) default 'noimage.png' -- 제품이미지2   이미지파일명 
,prdmanual_systemFileName varchar2(200)            -- 파일서버에 업로드되어지는 실제 제품설명서 파일명 ( 중복된 파일명을 방지하기 위해 파일명 뒤에 날짜시간나노초를 붙여서 만든다 )
,prdmanual_orginFileName  varchar2(200)            -- 웹클라이언트의 웹브라우저에서 파일을 업로드 할때 올리는 제품설명서 파일명 
,pqty           number(8) default 0      -- 제품 재고량
,price          number(8) default 0      -- 제품 정가
,saleprice      number(8) default 0      -- 제품 판매가(할인해서 팔 것이므로)
,fk_snum        number(8)                -- 'HIT', 'NEW', 'BEST' 에 대한 스펙번호인 시퀀스번호를 참조
,pcontent       varchar2(4000)           -- 제품설명  varchar2는 varchar2(4000) 최대값이므로
                                         --          4000 byte 를 초과하는 경우 clob 를 사용한다.
                                         --          clob 는 최대 4GB 까지 지원한다.
                                         
,point          number(8) default 0      -- 포인트 점수                                         
,pinputdate     date default sysdate     -- 제품입고일자
,constraint  PK_tbl_product_pnum primary key(pnum)
,constraint  FK_tbl_product_fk_cnum foreign key(fk_cnum) references tbl_category(cnum)
,constraint  FK_tbl_product_fk_snum foreign key(fk_snum) references tbl_spec(snum)
);

-- drop sequence seq_tbl_product_pnum;
create sequence seq_tbl_product_pnum
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;

-- 아래는 fk_snum 컬럼의 값이 1 인 'HIT' 상품만 입력한 것임. 
insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '스마트TV', 1, '삼성', 'tv_samsung_h450_1.png','tv_samsung_h450_2.png', 100,1200000,800000, 1,'42인치 스마트 TV. 기능 짱!!', 50);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북', 1, '엘지', 'notebook_lg_gt50k_1.png','notebook_lg_gt50k_2.png', 150,900000,750000, 1,'노트북. 기능 짱!!', 30);  

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '바지', 2, 'S사', 'cloth_canmart_1.png','cloth_canmart_2.png', 20,12000,10000, 1,'예뻐요!!', 5);       

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '남방', 2, '버카루', 'cloth_buckaroo_1.png','cloth_buckaroo_2.png', 50,15000,13000, 1,'멋져요!!', 10);       
       
insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '보물찾기시리즈', 3, '아이세움', 'book_bomul_1.png','book_bomul_2.png', 100,35000,33000, 1,'만화로 보는 세계여행', 20);       
       
insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '만화한국사', 3, '녹색지팡이', 'book_koreahistory_1.png','book_koreahistory_2.png', 80,130000,120000, 1,'만화로 보는 이야기 한국사 전집', 60);
       
commit;


-- 아래는 fk_cnum 컬럼의 값이 1 인 '전자제품' 중 fk_snum 컬럼의 값이 1 인 'HIT' 상품만 입력한 것임. 
insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북1', 1, 'DELL', '1.jpg','2.jpg', 100,1200000,1000000,1,'1번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북2', 1, '에이서','3.jpg','4.jpg',100,1200000,1000000,1,'2번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북3', 1, 'LG전자','5.jpg','6.jpg',100,1200000,1000000,1,'3번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북4', 1, '레노버','7.jpg','8.jpg',100,1200000,1000000,1,'4번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북5', 1, '삼성전자','9.jpg','10.jpg',100,1200000,1000000,1,'5번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북6', 1, 'HP','11.jpg','12.jpg',100,1200000,1000000,1,'6번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북7', 1, '레노버','13.jpg','14.jpg',100,1200000,1000000,1,'7번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북8', 1, 'LG전자','15.jpg','16.jpg',100,1200000,1000000,1,'8번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북9', 1, '한성컴퓨터','17.jpg','18.jpg',100,1200000,1000000,1,'9번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북10', 1, 'MSI','19.jpg','20.jpg',100,1200000,1000000,1,'10번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북11', 1, 'LG전자','21.jpg','22.jpg',100,1200000,1000000,1,'11번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북12', 1, 'HP','23.jpg','24.jpg',100,1200000,1000000,1,'12번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북13', 1, '레노버','25.jpg','26.jpg',100,1200000,1000000,1,'13번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북14', 1, '레노버','27.jpg','28.jpg',100,1200000,1000000,1,'14번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북15', 1, '한성컴퓨터','29.jpg','30.jpg',100,1200000,1000000,1,'15번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북16', 1, '한성컴퓨터','31.jpg','32.jpg',100,1200000,1000000,1,'16번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북17', 1, '레노버','33.jpg','34.jpg',100,1200000,1000000,1,'17번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북18', 1, '레노버','35.jpg','36.jpg',100,1200000,1000000,1,'18번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북19', 1, 'LG전자','37.jpg','38.jpg',100,1200000,1000000,1,'19번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북20', 1, 'LG전자','39.jpg','40.jpg',100,1200000,1000000,1,'20번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북21', 1, '한성컴퓨터','41.jpg','42.jpg',100,1200000,1000000,1,'21번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북22', 1, '에이서','43.jpg','44.jpg',100,1200000,1000000,1,'22번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북23', 1, 'DELL','45.jpg','46.jpg',100,1200000,1000000,1,'23번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북24', 1, '한성컴퓨터','47.jpg','48.jpg',100,1200000,1000000,1,'24번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북25', 1, '삼성전자','49.jpg','50.jpg',100,1200000,1000000,1,'25번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북26', 1, 'MSI','51.jpg','52.jpg',100,1200000,1000000,1,'26번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북27', 1, '애플','53.jpg','54.jpg',100,1200000,1000000,1,'27번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북28', 1, '아수스','55.jpg','56.jpg',100,1200000,1000000,1,'28번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북29', 1, '레노버','57.jpg','58.jpg',100,1200000,1000000,1,'29번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북30', 1, '삼성전자','59.jpg','60.jpg',100,1200000,1000000,1,'30번 노트북', 60);

commit;

-- 아래는 fk_cnum 컬럼의 값이 1 인 '전자제품' 중 fk_snum 컬럼의 값이 2 인 'NEW' 상품만 입력한 것임. 
insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북31', 1, 'MSI','61.jpg','62.jpg',100,1200000,1000000,2,'31번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북32', 1, '삼성전자','63.jpg','64.jpg',100,1200000,1000000,2,'32번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북33', 1, '한성컴퓨터','65.jpg','66.jpg',100,1200000,1000000,2,'33번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북34', 1, 'HP','67.jpg','68.jpg',100,1200000,1000000,2,'34번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북35', 1, 'LG전자','69.jpg','70.jpg',100,1200000,1000000,2,'35번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북36', 1, '한성컴퓨터','71.jpg','72.jpg',100,1200000,1000000,2,'36번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북37', 1, '삼성전자','73.jpg','74.jpg',100,1200000,1000000,2,'37번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북38', 1, '레노버','75.jpg','76.jpg',100,1200000,1000000,2,'38번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북39', 1, 'MSI','77.jpg','78.jpg',100,1200000,1000000,2,'39번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북40', 1, '레노버','79.jpg','80.jpg',100,1200000,1000000,2,'40번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북41', 1, '레노버','81.jpg','82.jpg',100,1200000,1000000,2,'41번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북42', 1, '레노버','83.jpg','84.jpg',100,1200000,1000000,2,'42번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북43', 1, 'MSI','85.jpg','86.jpg',100,1200000,1000000,2,'43번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북44', 1, '한성컴퓨터','87.jpg','88.jpg',100,1200000,1000000,2,'44번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북45', 1, '애플','89.jpg','90.jpg',100,1200000,1000000,2,'45번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북46', 1, '아수스','91.jpg','92.jpg',100,1200000,1000000,2,'46번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북47', 1, '삼성전자','93.jpg','94.jpg',100,1200000,1000000,2,'47번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북48', 1, 'LG전자','95.jpg','96.jpg',100,1200000,1000000,2,'48번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북49', 1, '한성컴퓨터','97.jpg','98.jpg',100,1200000,1000000,2,'49번 노트북', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '노트북50', 1, '레노버','99.jpg','100.jpg',100,1200000,1000000,2,'50번 노트북', 60);

commit;        

---------------------------------------------------------------------------------------------------------------

-- === 최신 상품 기준으로 나열 === --
select *
from tbl_product
order by pnum desc;

-- === 상품 테이블 === --
select *
from tbl_product;

-- === 카테고리 테이블 === --
select cnum, code, cname
from tbl_category;

-- === 스펙(HIT, NEW, BEST) 테이블 === --
select snum, sname
from tbl_spec;

-- === 히트의 개수 확인 === --
select count(*)
from tbl_product
where fk_snum = '1';    -- HIT (36)

-- === 새로들어온 상품의 개수 확인 === --
select count(*)
from tbl_product
where fk_snum = '2';    -- NEW (20)

-- === BEST 상품의 개수 확인 === --
select count(*)
from tbl_product
where fk_snum = '3';    -- BEST (0)

-- === HIT 상품 나열 === --
select row_number() over(order by pnum desc) as rno
    , pnum, pname, C.cname, pcompany, pimage1, pimage2, pqty, price, saleprice, S.sname, pcontent, point 
    , to_char(pinputdate, 'yyyy-mm-dd') AS pinputdate
from tbl_product P
JOIN tbl_category C
ON P.fk_cnum = C.cnum
JOIN tbl_spec S
ON P.fk_snum = S.snum
WHERE S.sname = 'HIT';

-- === row_number() over(order by pnum desc) 을 where 절에 사용할 수 없기 때문에 inline view 해주기 === --
SELECT pnum, pname, cname, pcompany, pimage1, pimage2, pqty, price, saleprice, sname, pcontent, point, pinputdate
FROM
(
    select row_number() over(order by pnum desc) as rno
        , pnum, pname, C.cname, pcompany, pimage1, pimage2, pqty, price, saleprice, S.sname, pcontent, point 
        , to_char(pinputdate, 'yyyy-mm-dd') AS pinputdate
    from tbl_product P
    JOIN tbl_category C
    ON P.fk_cnum = C.cnum
    JOIN tbl_spec S
    ON P.fk_snum = S.snum
    where S.sname = 'HIT'
)
WHERE rno between 1 and 8;  -- 첫번째 더보기

SELECT pnum, pname, cname, pcompany, pimage1, pimage2, pqty, price, saleprice, sname, pcontent, point, pinputdate
FROM
(
    select row_number() over(order by pnum desc) as rno
        , pnum, pname, C.cname, pcompany, pimage1, pimage2, pqty, price, saleprice, S.sname, pcontent, point 
        , to_char(pinputdate, 'yyyy-mm-dd') AS pinputdate
    from tbl_product P
    JOIN tbl_category C
    ON P.fk_cnum = C.cnum
    JOIN tbl_spec S
    ON P.fk_snum = S.snum
    where S.sname = 'HIT'
)
WHERE rno between 9 and 16;  -- 두번째 더보기

SELECT pnum, pname, cname, pcompany, pimage1, pimage2, pqty, price, saleprice, sname, pcontent, point, pinputdate
FROM
(
    select row_number() over(order by pnum desc) as rno
        , pnum, pname, C.cname, pcompany, pimage1, pimage2, pqty, price, saleprice, S.sname, pcontent, point 
        , to_char(pinputdate, 'yyyy-mm-dd') AS pinputdate
    from tbl_product P
    JOIN tbl_category C
    ON P.fk_cnum = C.cnum
    JOIN tbl_spec S
    ON P.fk_snum = S.snum
    where S.sname = 'HIT'
)
WHERE rno between 17 and 24;  -- 세번째 더보기

-- === 제품번호 채번해오기 === --
select seq_tbl_product_pnum.nextval AS PNUM
from dual;

---------------------------------------------------------------------

----- >>> 하나의 제품속에 여러개의 이미지 파일 넣어주기 <<< ------ 
create table tbl_product_imagefile
(imgfileno     number         not null   -- 시퀀스로 입력받음.
,fk_pnum       number(8)      not null   -- 제품번호(foreign key)
,imgfilename   varchar2(100)  not null   -- 제품이미지파일명
,constraint PK_tbl_product_imagefile primary key(imgfileno)
,constraint FK_tbl_product_imagefile foreign key(fk_pnum) references tbl_product(pnum) on delete cascade 
);
-- Table TBL_PRODUCT_IMAGEFILE이(가) 생성되었습니다.

create sequence seqImgfileno
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQIMGFILENO이(가) 생성되었습니다.

select imgfileno, fk_pnum, imgfilename
from tbl_product_imagefile
order by imgfileno desc;

-- >>> tbl_product_imagefile 테이블에 제품의 추가이미지 파일명 insert 하기 <<< --
insert into tbl_product_imagefile(imgfileno, fk_pnum, imgfilename)
values(seqImgfileno.nextval, ?, ?);

-- === 제품등록 잘됬는지 확인 === --
select imgfileno, fk_pnum, imgfilename
from tbl_product_imagefile
order by imgfileno desc;

select *
from tbl_product
order by pnum desc;

delete from tbl_product_imagefile;

commit;

select *
from user_constraints;

delete from tbl_product where pnum > 58;

commit;

------------------------------------------------------------
-- === 추가 이미지 존재하는 71번 === --
select *
from tbl_product
where pnum = 71;

select imgfileno, fk_pnum, imgfilename
from tbl_product_imagefile
where fk_pnum = 71;

-- === 추가 이미지 존재하지않는 36번 === --
select *
from tbl_product
where pnum = 36;

select imgfileno, fk_pnum, imgfilename
from tbl_product_imagefile
where fk_pnum = 36;

-- === 해당 제품 정보 조회 === --
SELECT sname, pnum, pname, pcompany, price, saleprice, point, pqty, pcontent, pimage1, pimage2, prdmanual_systemFileName, NVL(prdmanual_orginFileName, '없음') AS prdmanual_orginFileName
FROM
(
    select fk_snum, pnum, pname, pcompany, price, saleprice, point, pqty, pcontent, pimage1, pimage2, prdmanual_systemFileName, prdmanual_orginFileName
    from tbl_product
    where pnum = '71'
) P
JOIN tbl_spec S
ON P.fk_snum = S.snum;

update tbl_product set pname = '단가라상의하복3(script 장난막음)'
where pnum = 73;

update tbl_product set pname = '단가라상의하복2(script 장난중)'
where pnum = 72;

update tbl_product set pname = '단가라상의하복1(엔터키 설정X)'
where pnum = 71;

commit;

-----------------------------------------------------------------

-- === 장바구니 테이블 생성 === --
-------- **** 장바구니 테이블 생성하기 **** ----------
 desc tbl_member;
 desc tbl_product;

 create table tbl_cart
 (cartno        number               not null   --  장바구니 번호             
 ,fk_userid     varchar2(20)         not null   --  사용자ID            
 ,fk_pnum       number(8)            not null   --  제품번호                
 ,oqty          number(8) default 0  not null   --  주문량                   
 ,registerday   date default sysdate            --  장바구니 입력날짜
 ,constraint PK_shopping_cart_cartno primary key(cartno)
 ,constraint FK_shopping_cart_fk_userid foreign key(fk_userid) references tbl_member(userid) 
 ,constraint FK_shopping_cart_fk_pnum foreign key(fk_pnum) references tbl_product(pnum)
 );
 -- Table TBL_CART이(가) 생성되었습니다.

 create sequence seq_tbl_cart_cartno
 start with 1
 increment by 1
 nomaxvalue
 nominvalue
 nocycle
 nocache;
 -- Sequence SEQ_TBL_CART_CARTNO이(가) 생성되었습니다.
 
 comment on table tbl_cart
 is '장바구니 테이블';

 comment on column tbl_cart.cartno
 is '장바구니번호(시퀀스명 : seq_tbl_cart_cartno)';

 comment on column tbl_cart.fk_userid
 is '회원ID  tbl_member 테이블의 userid 컬럼을 참조한다.';

 comment on column tbl_cart.fk_pnum
 is '제품번호 tbl_product 테이블의 pnum 컬럼을 참조한다.';

 comment on column tbl_cart.oqty
 is '장바구니에 담을 제품의 주문량';

 comment on column tbl_cart.registerday
 is '장바구니에 담은 날짜. 기본값 sysdate';
 
 select *
 from user_tab_comments;

 select column_name, comments
 from user_col_comments
 where table_name = 'TBL_CART';
 
 select *
 from tbl_cart;
 
 select cartno, fk_userid, fk_pnum, oqty, registerday 
 from tbl_cart
 order by cartno asc;
 
 ------------------------------------------------------
 select cartno
 from tbl_cart
 where fk_userid = 'jjoung' and fk_pnum = '?';
 
 -- === 장바구니리스트 뽑기 === --
 SELECT C.cartno, C.fk_userid, C.fk_pnum, C.oqty, P.pname, P.pimage1, P.saleprice, P.point, P.pqty
 FROM
 (
     select cartno, fk_userid, fk_pnum, oqty, registerday 
     from tbl_cart
 ) C
 JOIN tbl_product P
 ON C.fk_pnum = P.pnum
 where fk_userid = 'jjoung'
 order by C.cartno desc;
 
-- === 주문총액과 포인트합계(장바구니에 담지 않은 경우) === --
SELECT NVL(SUM(C.oqty * P.saleprice),0) as SUMTOTALPRICE
    , NVL(SUM(C.oqty * P.point),0) as SUMTOTALPOINT
FROM
(
    select fk_pnum, oqty
    from tbl_cart
    where fk_userid = 'eomjh'
) C
JOIN tbl_product P
ON C.fk_pnum = P.pnum;

-- === 주문총액과 포인트합계(장바구니에 담은 경우) === --
SELECT NVL(SUM(C.oqty * P.saleprice),0) as SUMTOTALPRICE
    , NVL(SUM(C.oqty * P.point),0) as SUMTOTALPOINT
FROM
(
    select fk_pnum, oqty
    from tbl_cart
    where fk_userid = 'jjoung'
) C
JOIN tbl_product P
ON C.fk_pnum = P.pnum;

-- === 장바구니 수량 수정 === --
update tbl_cart set oqty = ? 
where cartno = ? 
 
-- === 변경 확인 === --
select cartno, fk_userid, fk_pnum, oqty, registerday 
from tbl_cart
order by cartno asc;

------------------ >>> 주문관련 테이블 <<< -----------------------------
-- [1] 주문 테이블    : tbl_order
-- [2] 주문상세 테이블 : tbl_orderdetail


-- *** "주문" 테이블 *** --
create table tbl_order
(odrcode        varchar2(20) not null          -- 주문코드(명세서번호)  주문코드 형식 : s+날짜+sequence ==> s20231101-1 , s20231101-2 , s20231101-3
                                               --                                                     s20231102-4 , s20231102-5 , s20231102-6
,fk_userid      varchar2(20) not null          -- 사용자ID
,odrtotalPrice  number       not null          -- 주문총액
,odrtotalPoint  number       not null          -- 주문총포인트
,odrdate        date default sysdate not null  -- 주문일자
,constraint PK_tbl_order_odrcode primary key(odrcode)
,constraint FK_tbl_order_fk_userid foreign key(fk_userid) references tbl_member(userid)
);
-- Table TBL_ORDER이(가) 생성되었습니다.

-- "주문코드(명세서번호) 시퀀스" 생성
create sequence seq_tbl_order
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_TBL_ORDER이(가) 생성되었습니다.

select 's'||to_char(sysdate,'yyyymmdd')||'-'||seq_tbl_order.nextval AS odrcode
from dual;
-- s20231101-1

select odrcode, fk_userid, 
       odrtotalPrice, odrtotalPoint,
       to_char(odrdate, 'yyyy-mm-dd hh24:mi:ss') as odrdate
from tbl_order
order by odrcode desc;


-- *** "주문상세" 테이블 *** --
create table tbl_orderdetail
(odrseqnum      number               not null   -- 주문상세 일련번호
,fk_odrcode     varchar2(20)         not null   -- 주문코드(명세서번호)
,fk_pnum        number(8)            not null   -- 제품번호
,oqty           number               not null   -- 주문량
,odrprice       number               not null   -- "주문할 그때 그당시의 실제 판매가격" ==> insert 시 tbl_product 테이블에서 해당제품의 saleprice 컬럼값을 읽어다가 넣어주어야 한다.
,deliverStatus  number(1) default 1  not null   -- 배송상태( 1 : 주문만 받음,  2 : 배송중,  3 : 배송완료)
,deliverDate    date                            -- 배송완료일자  default 는 null 로 함.
,constraint PK_tbl_orderdetail_odrseqnum  primary key(odrseqnum)
,constraint FK_tbl_orderdetail_fk_odrcode foreign key(fk_odrcode) references tbl_order(odrcode) on delete cascade
,constraint FK_tbl_orderdetail_fk_pnum foreign key(fk_pnum) references tbl_product(pnum)
,constraint CK_tbl_orderdetail check( deliverStatus in(1, 2, 3) )
);
-- Table TBL_ORDERDETAIL이(가) 생성되었습니다.


-- "주문상세 일련번호 시퀀스" 생성
create sequence seq_tbl_orderdetail
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_TBL_ORDERDETAIL이(가) 생성되었습니다.

-----------------------------------------------------------------
select *
from tbl_order

update tbl_member set coin = coin + 500000
where userid = 'leess';

commit;

select *
from tbl_product;

update tbl_product set pqty = 1000
where pnum = 76;

commit;

select A.odrcode, A.fk_userid, to_char(A.odrdate, 'yyyy-mm-dd hh24:mi:ss') AS odrdate
     , B.odrseqnum, B.fk_pnum, B.oqty, B.odrprice
     , case B.deliverstatus
        when 1 then '주문완료'
        when 2 then '배송중'
        when 3 then '배송완료'
        end as deliverstatus
     , C.pname, C.pimage1, C.price, C.saleprice, C.point
from tbl_order A JOIN tbl_orderdetail B
ON A.odrcode = B.fk_odrcode
JOIN tbl_product C
ON B.fk_pnum = C.pnum
where A.fk_userid = 'leess';

update tbl_member set coin = coin + 5000000
where userid = 'jjoung';

commit;

----------------------------------------------------

-- === 나의 카테고리별주문 통계정보 알아오기 === --
WITH
O AS
(
    select odrcode
    from tbl_order
    where fk_userid = 'jjoung'
)
,
OD AS
(
    select fk_odrcode, fk_pnum, oqty, odrprice
    from tbl_orderdetail
)
SELECT C.cname
    , COUNT(C.cname) AS CNT
    , SUM(OD.oqty * OD.odrprice) AS SUMPAY
    , ROUND(SUM(OD.oqty * OD.odrprice)/(SELECT SUM(OD.oqty * OD.odrprice)
                                    FROM O JOIN OD
                                    ON O.odrcode = OD.fk_odrcode) * 100,2) AS SUMPAY_PCT
FROM O JOIN OD
ON O.odrcode = OD.fk_odrcode
JOIN tbl_product P
ON OD.fk_pnum = P.pnum
JOIN tbl_category C
ON P.fk_cnum = C.cnum
GROUP BY C.cname;

--------------------------------------------------------------------------------------------------

----- *** 좋아요, 싫어요 (투표) 테이블 생성하기 *** ----- 
create table tbl_product_like
(fk_userid   varchar2(40) not null 
,fk_pnum     number(8) not null
,constraint  PK_tbl_product_like primary key(fk_userid,fk_pnum)
,constraint  FK_tbl_product_like_userid foreign key(fk_userid) references tbl_member(userid)
,constraint  FK_tbl_product_like_pnum foreign key(fk_pnum) references tbl_product(pnum) on delete cascade
);
-- Table TBL_PRODUCT_LIKE이(가) 생성되었습니다.

create table tbl_product_dislike
(fk_userid   varchar2(40) not null 
,fk_pnum     number(8) not null
,constraint  PK_tbl_product_dislike primary key(fk_userid,fk_pnum)
,constraint  FK_tbl_product_dislike_userid foreign key(fk_userid) references tbl_member(userid)
,constraint  FK_tbl_product_dislike_pnum foreign key(fk_pnum) references tbl_product(pnum) on delete cascade
);
-- Table TBL_PRODUCT_DISLIKE이(가) 생성되었습니다.
----------------------------------------------------------------------------------------------

select *
from tbl_product_like;

select *
from tbl_product_dislike;

-- === 좋아요와 싫어요 개수 파악 === --
select
(
    select count(*)
    from tbl_product_like
    where fk_pnum = 62) as likecnt
,
(
    select count(*)
    from tbl_product_dislike
    where fk_pnum = 62) as likecnt
from dual;

-----------------------------------------------------

-------- **** 상품구매 후기 테이블 생성하기 **** ----------
create table tbl_purchase_reviews
(review_seq          number 
,fk_userid           varchar2(20)   not null   -- 사용자ID       
,fk_pnum             number(8)      not null   -- 제품번호(foreign key)
,contents            varchar2(4000) not null
,writeDate           date default sysdate
,constraint PK_purchase_reviews primary key(review_seq)
,constraint UQ_purchase_reviews unique(fk_userid, fk_pnum)
,constraint FK_purchase_reviews_userid foreign key(fk_userid) references tbl_member(userid) on delete cascade 
,constraint FK_purchase_reviews_pnum foreign key(fk_pnum) references tbl_product(pnum) on delete cascade
);
-- 로그인하여 실제 해당 제품을 구매했을 때만 딱 1번만 작성할 수 있는 것. 제품후기를 삭제했을 경우에는 다시 작성할 수 있는 것임. 
-- Table TBL_PURCHASE_REVIEWS이(가) 생성되었습니다.

create sequence seq_purchase_reviews
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_PURCHASE_REVIEWS이(가) 생성되었습니다.

select *
from tbl_purchase_reviews
order by review_seq desc;

--------------------------------------------------------------------------------------------------
select *
from tbl_orderdetail
order by odrseqnum desc;

---------------------------------------------------------------
-- === 배송상태 변환 방법 [일괄처리 방법 X] === --
select odrseqnum
from tbl_orderdetail
where fk_odrcode = 's20240529-33' and fk_pnum = '76';

update tbl_orderdetail set deliverstatus = 2
where odrseqnum = '35';

------------------------------------------------------------------
-- === 배송상태 변환 방법[일괄처리(in) -> 컬럼병합] === --
select odrseqnum, fk_odrcode || '/' || fk_pnum, oqty, odrprice, deliverstatus, deliverdate
from tbl_orderdetail
order by odrseqnum desc;

update tbl_orderdetail set deliverstatus = 2
where fk_odrcode || '/' || fk_pnum in('s20240529-33/76','s20240529-31/76', 's20240529-29/76');
-- 3개 행 이(가) 업데이트되었습니다.

rollback;
-- 롤백 완료.

-------------------------------------------------------------------------------------------------




-- === 마지막 쯤 해야하는 것 === --
-------- **** 매장찾기(카카오지도) 테이블 생성하기 **** ----------
create table tbl_map 
(storeID       varchar2(20) not null   --  매장id
,storeName     varchar2(100) not null  --  매장명
,storeUrl      varchar2(200)            -- 매장 홈페이지(URL)주소
,storeImg      varchar2(200) not null   -- 매장소개 이미지파일명  
,storeAddress  varchar2(200) not null   -- 매장주소 및 매장전화번호
,lat           number not null          -- 위도
,lng           number not null          -- 경도 
,zindex        number not null          -- zindex 
,constraint PK_tbl_map primary key(storeID)
,constraint UQ_tbl_map_zindex unique(zindex)
);
-- Table TBL_MAP이(가) 생성되었습니다.

create sequence seq_tbl_map_zindex
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_TBL_MAP_ZINDEX이(가) 생성되었습니다.

insert into tbl_map(storeID, storeName, storeUrl, storeImg, storeAddress, lat, lng, zindex)
values('store1','롯데백화점 본점','https://place.map.kakao.com/7858517','lotte02.png','서울 중구 을지로 30 (T)02-771-2500',37.56511284953554,126.98187860455485,1);

insert into tbl_map(storeID, storeName, storeUrl, storeImg, storeAddress, lat, lng, zindex)
values('store2','신세계백화점 본점','https://place.map.kakao.com/7969138','shinsegae.png','서울 중구 소공로 63 (T)1588-1234',37.56091181255155,126.98098265772731,2);

insert into tbl_map(storeID, storeName, storeUrl, storeImg, storeAddress, lat, lng, zindex)
values('store3','미래에셋센터원빌딩','https://place.map.kakao.com/13057692','miraeeset.png','서울 중구 을지로5길 26 (T)02-6030-0100',37.567386065415086,126.98512381778167,3);

insert into tbl_map(storeID, storeName, storeUrl, storeImg, storeAddress, lat, lng, zindex)
values('store4','현대백화점신촌점','https://place.map.kakao.com/21695719','hyundai01.png','서울 서대문구 신촌로 83 현대백화점신촌점 (T)02-3145-2233',37.556005,126.935699,4);

insert into tbl_map(storeID, storeName, storeUrl, storeImg, storeAddress, lat, lng, zindex)
values('store5','쌍용강북교육센터','https://place.map.kakao.com/16530319','sist01.jpg','서울 마포구 월드컵북로 21 풍성빌딩 2~4층 (T)02-336-8546',37.556583,126.919557,5);

commit; 

select storeID, storeName, storeUrl, storeImg, storeAddress, lat, lng, zindex
from tbl_map
order by zindex asc;


