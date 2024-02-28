package com.projectStore.bookstorebackend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.projectStore.bookstorebackend.entities.WebUser;
import com.projectStore.bookstorebackend.roles.Role;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtService {

    @Value("${jwt.algorithm.key}")
    private String key;
    @Value("${jwt.issuer}")
    private  String issuer;

    @Value("${jwt.expiryInSeconds}")
    private int exiryInSeconds;

    private Algorithm algorithm;

    private final static String USERNAME_KEY="USERNAME";
    private final static String ROLE_KEY="ROLE";

    @PostConstruct
    public void makeAlgoritm(){
        algorithm=Algorithm.HMAC256(key);
    }
    public String generateJwt(WebUser webUser){
        return JWT.create().withClaim(USERNAME_KEY,webUser.getUsername())
                .withClaim(ROLE_KEY,webUser.getRole().stream().map(Role::toString).collect(Collectors.toList()))
                .withExpiresAt(new Date(System.currentTimeMillis() + (1000L *exiryInSeconds)))
                .withIssuer(issuer)
                .sign(algorithm);
    }
    public String getUsername(String token){
       return JWT.decode(token).getClaim(USERNAME_KEY).asString();
    }

    public List<Role> getRole(String token){
        return JWT.decode(token).getClaim(ROLE_KEY).asList(Role.class);
    }

    public boolean isExpired(String token){
        return JWT.decode(token).getExpiresAt().before(new Date());
    }

}
