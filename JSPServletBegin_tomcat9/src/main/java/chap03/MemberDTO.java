package chap03;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MemberDTO {
	
	private String name;	// 성명
	private String jubun;	// 주민번호
	
	/////////////////////////////////////////////////////////////////
	
	public MemberDTO() {}	// 기본생성자
	// 파라미터가 있는 생성자가 있으면 무조건 기본생성자를 작성해야 한다.
	
	// 파라미터가 있는 생성자가 없으면 기본생성자는 없는 것이 아니라 생략이다.
	public MemberDTO(String name, String jubun) {
		this.name = name;
		this.jubun = jubun;
	}
	
	//////////////////////////////////////////////////////////////////
	
	public String getName() {
		return name;
	}

	public void setIrum(String name) {
		this.name = name;
	}

	public String getJubun() {
		return jubun;
	}

	public void setJubun(String jubun) {
		this.jubun = jubun;
	}
	
	///////////////////////////////////////////////////
	
	// 1. 성별을 알아오는 메소드 생성하기
	public String getGender() {
		
		if(jubun != null && jubun.length() == 13 
			&& (jubun.substring(6 , 7).equals("1") || 
	            jubun.substring(6 , 7).equals("2") ||
	            jubun.substring(6 , 7).equals("3") ||
	            jubun.substring(6 , 7).equals("4"))) {
		         
			if(jubun.substring(6 , 7).equals("1") || jubun.substring(6 , 7).equals("3") ) {
				return "남자";
		    }
		    else {
		    	return "여자";
		    }
		}
		else {
		     	return "";   
		}
	}	// end of public String getGender()---------------------------
	
	// 2. 나이를 알아오는 메소드 생성하기 == //
	   public int getAge() {
	      
	      if(!"".equals(getGender()) ) {	// jubun 필드가 올바른 경우 
	      
	         int age = 0;
	         // 올해생일이 현재날짜 보다 이전이라면 
	         // 나이 = 현재년도 - 태어난년도 
	         
	         // 올해생일이 현재날짜 보다 이후이라면
	         // 나이 = 현재년도 - 태어난년도 - 1
	         
	         Date now = new Date(); // 현재시각
	         SimpleDateFormat sdfmt = new SimpleDateFormat("yyyyMMdd");
	         String str_now = sdfmt.format(now); // "20230918"   
	         
	         // 올해생일
	         String str_now_birthday = str_now.substring(0, 4) + jubun.substring(2, 6); 
	         
	         // 태어난년도
	         int centry = 0;
	         switch (jubun.substring(6,7)) {
	            case "1":
	            case "2":   
	               centry = 1900;
	               break;
	      
	            default:
	               centry = 2000;
	               break;
	         }
	         
	         int birth_year = centry + Integer.parseInt(jubun.substring(0, 2));
	         
	         // 현재년도
	         int now_year = Integer.parseInt(str_now.substring(0, 4)); 
	         
	         try {
	            Date now_birthday = sdfmt.parse(str_now_birthday);
	            now = sdfmt.parse(str_now);
	            
	            if(now_birthday.before(now)) {	// 올해생일이 현재날짜 보다 이전이라면
	               
	               age = now_year - birth_year;		// 나이 = 현재년도 - 태어난년도
	            }
	            else {
	               age = now_year - birth_year - 1;		// 나이 = 현재년도 - 태어난년도 - 1
	            }
	         } catch (ParseException e) {
	        	 
	         }
	         return age;
	      }
	      else {	// jubun 필드가 올바르지 않은 경우
	         return 0;
	      }
	      
	   }// end of int getAge()-----------------------   
	   
}
