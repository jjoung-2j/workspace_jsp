package common.controller;

public abstract class AbstractController implements InterCommand {

	private boolean isRedirect = false;
    // false -> forward
    // true -> sendRedirect
    
    private String viewPage;
    // false -> ~.jsp
    // true -> URL 주소

    // === Getter, Setter === //
	public boolean isRedirect() {
		return isRedirect;
	}

	public void setRedirect(boolean isRedirect) {
		this.isRedirect = isRedirect;
	}

	public String getViewPage() {
		return viewPage;
	}

	public void setViewPage(String viewPage) {
		this.viewPage = viewPage;
	}
 
}
