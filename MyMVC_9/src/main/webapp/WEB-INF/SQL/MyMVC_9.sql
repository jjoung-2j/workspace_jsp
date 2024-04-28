---- **** MyMVC_9 다이내믹웹프로젝트 에서 작업한 것 **** ----

-- 오라클 계정 생성을 위해서는 SYS 또는 SYSTEM 으로 연결하여 작업을 해야 합니다. [SYS 시작] --
show user;
-- USER이(가) "SYS"입니다.

-- 오라클 계정 생성시 계정명 앞에 c## 붙이지 않고 생성하도록 하겠습니다.
alter session set "_ORACLE_SCRIPT"=true;
-- Session이(가) 변경되었습니다.

-- 오라클 계정명은 MYMVC9_USER 이고 암호는 gclass 인 사용자 계정을 생성합니다.
create user MYMVC9_USER identified by gclass default tablespace users; 
-- User MYMVC9_USER이(가) 생성되었습니다.

-- 위에서 생성되어진 MYMVC9_USER 이라는 오라클 일반사용자 계정에게 오라클 서버에 접속이 되어지고,
-- 테이블 생성 등등을 할 수 있도록 여러가지 권한을 부여해주겠습니다.
grant connect, resource, create view, unlimited tablespace to MYMVC9_USER;
-- Grant을(를) 성공했습니다.

-----------------------------------------------------------------------

show user;
-- USER이(가) "MYMVC9_USER"입니다.

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

select *
from tbl_member
order by registerday desc;
