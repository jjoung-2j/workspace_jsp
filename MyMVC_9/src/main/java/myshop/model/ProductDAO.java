package myshop.model;

import java.sql.SQLException;
import java.util.List;

import myshop.domain.ImageVO;

public interface ProductDAO {

	// === 메인페이지 이미지(상품이미지 파일명 조회 메소드) === //
	List<ImageVO> imageSelectAll() throws SQLException;
	
}
