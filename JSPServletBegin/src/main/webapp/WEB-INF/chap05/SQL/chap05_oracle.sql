---- **** JSPServletBegin/chap05.oracle 에서 작업한 것 **** ----

-- 오라클 계정 생성을 위해서는 SYS 또는 SYSTEM 으로 연결하여 작업을 해야 합니다. [SYS 시작] --
show user;
-- USER이(가) "SYS"입니다.

-- 오라클 계정 생성시 계정명 앞에 c## 붙이지 않고 생성하도록 하겠습니다.
alter session set "_ORACLE_SCRIPT"=true;
-- Session이(가) 변경되었습니다.

-- 오라클 계정명은 JSPBEGIN_USER 이고 암호는 gclass 인 사용자 계정을 생성합니다.
create user JSPBEGIN_USER identified by gclass default tablespace users; 
-- User JSPBEGIN_USER이(가) 생성되었습니다.

-- 위에서 생성되어진 JSPBEGIN_USER 이라는 오라클 일반사용자 계정에게 오라클 서버에 접속이 되어지고,
-- 테이블 생성 등등을 할 수 있도록 여러가지 권한을 부여해주겠습니다.
grant connect, resource, create view, unlimited tablespace to JSPBEGIN_USER;
-- Grant을(를) 성공했습니다.

-----------------------------------------------------------------------

show user;
-- USER이(가) "JSPBEGIN_USER"입니다.

create table tbl_person_interest
(seq          number
,name         Nvarchar2(20) not null
,school       Nvarchar2(10) not null
,color        varchar2(10)  not null
,food         Nvarchar2(30) 
,registerday  date default sysdate not null 
,updateday    date 
,constraint PK_tbl_person_interest primary key(seq)
);
-- Table TBL_PERSON_INTEREST이(가) 생성되었습니다.

create sequence person_seq
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle;
-- Sequence PERSON_SEQ이(가) 생성되었습니다.

select seq, name, school, color, food
     , to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS registerday
     , to_char(updateday, 'yyyy-mm-dd hh24:mi:ss') AS updateday
from tbl_person_interest
order by seq;

-- selectOne 메소드 확인용
select name, school, color, food 
, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS registerday 
, nvl(to_char(updateday, 'yyyy-mm-dd hh24:mi:ss'),' ') AS updateday 
from tbl_person_interest 
where seq = 1; 