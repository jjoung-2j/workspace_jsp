<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원삭제 성공시 메시지 보여주기</title>
<script type="text/javascript">
	window.onload = function(){
		alert("회원번호 ${requestScope.psdto.seq}번 ${requestScope.psdto.name}님을 삭제했습니다.");
		<%-- ★★★ 벡틱의 변수는 앞에 \ 를 적어준다. ★★★ --%>
		location.href='personSelect.do';
		// 자바스크립트에서 URL주소를 이동시키는 명령어는 location.href='이동시킬URL주소'; 이다.
	}
</script>
</head>
<body>

</body>
</html>