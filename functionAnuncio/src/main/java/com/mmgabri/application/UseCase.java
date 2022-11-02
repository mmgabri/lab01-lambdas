package com.mmgabri.application;

public interface UseCase<Request, Response> {
    Response execute(Request event);
}
