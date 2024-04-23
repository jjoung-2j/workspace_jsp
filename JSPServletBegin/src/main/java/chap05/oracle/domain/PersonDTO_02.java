package chap05.oracle.domain;

public class PersonDTO_02 {

	private int seq;
	private String name;
	private String school;
	private String color;
	private String[] food;
	private String registerday;
	private String updateday;
	
	// === 기본생성자는 생략되어있는 상태 === //
	
	// === Getter Setter === //
	
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSchool() {
		return school;
	}
	public void setSchool(String school) {
		this.school = school;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String[] getFood() {
		return food;
	}
	public void setFood(String[] food) {
		this.food = food;
	}
	public String getRegisterday() {
		return registerday;
	}
	public void setRegisterday(String registerday) {
		this.registerday = registerday;
	}
	public String getUpdateday() {
		return updateday;
	}
	public void setUpdateday(String updateday) {
		this.updateday = updateday;
	}
	
///////////////////////////////////////////////////////////////////
	
	public String getStrFood() {
		
		if(food != null) {
			return String.join(",", food);
		}
		else {
			return "없음";
		}
		
	}	// end of public String getStrFood()----------
	
	/*
	public String getStrFood_imgFileName() {
		
		if(food != null) {
			String filename = "";
			
			for(int i=0; i<food.length; i++) {
			
				if("짜장면".equals(food[i])) {
					filename += "jjm.png,";
				}
				else if("짬뽕".equals(food[i])) {
					filename += "jjbong.png,";
				}
				else if("탕수육".equals(food[i])) {
					filename += "tangsy.png,";
				}
				else if("팔보채".equals(food[i])) {
					filename += "palbc.png,";
				}
				else {
					filename += "yang.png,";
				}
			}	// end of for--------------
			
			// return filename.substring(0, filename.length()-2);
			
			return String.join(", ", filename.split(","));
		}
		else {
			return " ";
		}
		
		
	}
	*/
	public String getStrFood_imgFileName() {
		String result = null;
		
		if(food != null) {
			StringBuilder sb = new StringBuilder();
			
			for(int i=0; i<food.length; i++) {
				
				switch (food[i]) {
				case "짜장면":
					sb.append("jjm.png");
					break;
				case "짬뽕":
					sb.append("jjbong.png");
					break;	
				case "탕수육":
					sb.append("tangsy.png");
					break;
				case "양장피":
					sb.append("yang.png");
					break;
				case "팔보채":
					sb.append("palbc.png");
					break;
				}	// end of switch----------
				
				if(i < food.length - 1) {
					sb.append(",");
				}
			}	// end of for-----------------------
			
			result = sb.toString();
		}
		return result;
	}
}
