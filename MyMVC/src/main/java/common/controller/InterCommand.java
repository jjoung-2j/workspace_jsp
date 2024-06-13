package common.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface InterCommand {
	
	void execute(HttpServletRequest request, HttpServletResponse response) throws Exception;
	// 미완성 메소드, 추상메소드
}
