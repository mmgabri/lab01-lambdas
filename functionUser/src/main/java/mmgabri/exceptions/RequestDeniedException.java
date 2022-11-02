package mmgabri.exceptions;

public class RequestDeniedException extends RuntimeException {
    public RequestDeniedException(String msg){
        super(msg);
    }
}
