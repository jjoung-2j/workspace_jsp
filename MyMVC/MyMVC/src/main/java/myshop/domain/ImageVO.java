package myshop.domain;

// VO(Value Object) == DTO(Data Transfer Object)

public class ImageVO {

	private int imagno;
	private String imgfilename;
	
	// === Getter, Setter === //
	public int getImagno() {
		return imagno;
	}
	public void setImagno(int imagno) {
		this.imagno = imagno;
	}
	public String getImgfilename() {
		return imgfilename;
	}
	public void setImgfilename(String imgfilename) {
		this.imgfilename = imgfilename;
	}
	
	
}
