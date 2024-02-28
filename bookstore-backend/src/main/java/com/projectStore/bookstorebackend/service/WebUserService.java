package com.projectStore.bookstorebackend.service;

import com.projectStore.bookstorebackend.api.models.LoginBody;
import com.projectStore.bookstorebackend.entities.WebUser;
import com.projectStore.bookstorebackend.exceptions.InvalidWebUser;
import com.projectStore.bookstorebackend.repository.WebUserRepository;
import com.projectStore.bookstorebackend.roles.Role;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WebUserService {
    private  WebUserRepository webUserRepository;
    private JwtService jwtService;


    public WebUserService(WebUserRepository webUserRepository, JwtService jwtService) {
        this.webUserRepository = webUserRepository;

        this.jwtService = jwtService;
    }

    public WebUser registerUser(WebUser registerBody) throws InvalidWebUser {
        if(webUserRepository.findByUsername(registerBody.getUsername()).isPresent() || webUserRepository.findByEmail(registerBody.getEmail()).isPresent() ){
            throw new InvalidWebUser();
        }

        return webUserRepository.save(registerBody);
    }

    public String logInUser(LoginBody loginBody){
        Optional<WebUser> currentUser = webUserRepository.findByUsername(loginBody.getUsername());
        if (currentUser.isEmpty()){
            return null;
        }

        WebUser webUser = currentUser.get();

            return jwtService.generateJwt(webUser);
    }

    public boolean doesUserExist(String userId){
        return webUserRepository.findById(userId).isPresent();//|| webUserRepository.findByEmail(webUser.getEmail()).isPresent();
    }

    public List<Role> returnRoles(String username){
        return webUserRepository.findByUsername(username).get().getRole();
    }

}
