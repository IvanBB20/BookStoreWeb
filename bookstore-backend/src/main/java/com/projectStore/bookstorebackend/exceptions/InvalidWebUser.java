package com.projectStore.bookstorebackend.exceptions;

public class InvalidWebUser extends Exception{
    public InvalidWebUser() {
        super();
    }

    public InvalidWebUser(String message) {
        super(message);
    }
}
