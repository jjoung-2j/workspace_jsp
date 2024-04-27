package my.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;

@WebFilter("/*")
public class EncodeFilter extends HttpFilter implements Filter {
       
	private static final long serialVersionUID = 1L;

	public EncodeFilter() {
        super();
    }

	public void destroy() {
		// 필터 인스턴스를 종료시키기 전에 호출하는 메소드
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// 필터의 로직을 작성하는 메소드
		// ==> doPost()에서 한글이 안 깨지려면 
		//     request.getParameter("name"); 을 하기전에
		//     request.setCharacterEncoding("UTF-8"); 을 
		//     먼저 해주어야 한다.
		chain.doFilter(request, response);
	}

	public void init(FilterConfig fConfig) throws ServletException {
		// 서블릿 컨테이너가 필터 인스턴스를 초기화하기 위해서 호출하는 메소드
	    // 여기는 기술할 필요가 없다.
	}

}
