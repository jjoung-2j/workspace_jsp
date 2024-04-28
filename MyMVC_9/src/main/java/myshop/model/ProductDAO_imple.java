package myshop.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import myshop.domain.ImageVO;

public class ProductDAO_imple implements ProductDAO {

	private DataSource ds;	// 아파치톰캣에서 제공하는 DB Connection Pool
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;

	// 기본생성자
	public ProductDAO_imple(){
		try{
	    	Context initContext = new InitialContext();
	        Context envContext = (Context)initContext.lookup("java:/comp/env");
	        ds = (DataSource)envContext.lookup("jdbc/myoracle");
	    } catch(NamingException e){
	    	e.printStackTrace();
	    }	// end of try~catch--------------
	}

	// === 자원 반납 close 메소드 === //
	private void close(){
		try{
	    	if(rs != null){
	        	rs.close();
	            rs=null;
	        }
	        if(pstmt != null){
	        	pstmt.close();
	            pstmt=null;
	        }
	        if(conn != null){
	        	conn.close();
	            conn=null;
	        }
	    } catch(SQLException e){
	    	e.printStackTrace();
	    }	// end of try~catch--------------------
	}	// end of private void close()-----------------
	
	// === 메인페이지 이미지(상품이미지 파일명 조회 메소드) === //
	@Override
	public List<ImageVO> imageSelectAll() throws SQLException {
		List<ImageVO> imgList = new ArrayList<>();
	    try{
	    	conn = ds.getConnection();	// DB 와 연결
	        String sql = " select imgno, imgfilename "
	        	+ " from tbl_main_image "
	            + " order by imgno asc ";
	        pstmt = conn.prepareStatement(sql);
	        rs = pstmt.executeQuery();
	        while(rs.next()){
	        	ImageVO imgvo = new ImageVO();
	            imgvo.setImageno(rs.getInt("imgno"));
	            imgvo.setImgfilename(rs.getString("imgfilename"));
	            
	            imgList.add(imgvo);
	        }	// end of while-----------
	    } finally{
	    	close();
	    }	// end of try~finally-----------
	    return imgList;
	}	// end of public List<ImageVO> imageSelectAll() throws SQLException--------------

}
