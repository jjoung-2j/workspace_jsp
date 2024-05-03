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