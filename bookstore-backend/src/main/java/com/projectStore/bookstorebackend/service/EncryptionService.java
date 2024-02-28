package com.projectStore.bookstorebackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class EncryptionService {

    @Value("${encryption.salt.round}")
    private int saltRounds;

    private String salt;

    public String encryptPassword(String password){
          salt = BCrypt.gensalt(saltRounds);
          return BCrypt.hashpw(password,salt);
    }

    public boolean verifyPassword(String password,String hashedPassword){
        return BCrypt.checkpw(password,hashedPassword);
    }


}
